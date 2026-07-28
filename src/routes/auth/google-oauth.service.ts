import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { GoogleOAuthException } from 'src/routes/auth/auth.error';
import {
  GoogleOAuthCallbackQueryType,
  GoogleOAuthCallbackResType,
  GoogleOAuthStateType,
} from 'src/routes/auth/auth.model';
import envConfig from 'src/shared/config';
import { SharedAuthRepository } from 'src/shared/repositories/shared-auth.repository';
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { EmailAlreadyInUsedException } from 'src/shared/shared.error';
import { generateRandomUsername } from 'src/shared/utils/common.util';
import { isUniqueConstraintPrismaError } from 'src/shared/utils/prisma.util';

@Injectable()
export class GoogleOAuthService {
  private oAuth2Client: OAuth2Client;
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly sharedAuthRepository: SharedAuthRepository,
    private readonly sharedUserRepository: SharedUserRepository,
  ) {
    this.oAuth2Client = new OAuth2Client({
      client_id: envConfig.OAUTH_GOOGLE_CLIENT_ID,
      client_secret: envConfig.OAUTH_GOOGLE_CLIENT_SECRET,
      redirectUri: envConfig.OAUTH_GOOGLE_REDIRECT_URI,
    });
  }

  getAuthorizeUrl(ip: string, userAgent: string): string {
    const stateString = Buffer.from(
      JSON.stringify({
        userAgent,
        ip,
      }),
    ).toString('base64');
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
      include_granted_scopes: true,
      state: stateString,
    });

    return authorizeUrl;
  }

  async callback(query: GoogleOAuthCallbackQueryType): Promise<GoogleOAuthCallbackResType> {
    try {
      const { code, state } = query;
      let ip = 'UNKNOWN';
      let userAgent = 'UNKNOWN';

      // 1. Lấy IP và userAgent để tạo device đăng nhập
      try {
        const parsedState = JSON.parse(
          Buffer.from(state, 'base64').toString(),
        ) as GoogleOAuthStateType;

        ip = parsedState.ip;
        userAgent = parsedState.userAgent;
      } catch (error) {
        console.error('Error.ParsingState', error);
      }

      // 2. Lấy thông tin user từ Google OAuth
      const { tokens } = await this.oAuth2Client.getToken(code);
      this.oAuth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: this.oAuth2Client,
        version: 'v2',
      });
      const { data: userInfo } = await oauth2.userinfo.get();

      const { accessToken, refreshToken } = await this.prismaService.$transaction(async (tx) => {
        // 3. Tạo random username và password
        const randomUsername = generateRandomUsername();
        const hashedRandomPassword = await this.hashingService.hash(randomUsername);

        // 4. Tạo User
        if (!userInfo.email) {
          throw GoogleOAuthException;
        }
        console.log('>> Check | userInfo.email:', userInfo.email);
        const user = await this.sharedUserRepository.createUser(
          {
            email: userInfo.email,
            username: randomUsername,
            password: hashedRandomPassword,
          },
          tx,
        );

        // 5. Tạo login session
        const tokens = await this.sharedAuthRepository.createLoginSession(
          {
            ip,
            userAgent,
            userId: user.id,
          },
          tx,
        );

        return tokens;
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw EmailAlreadyInUsedException;
      }

      throw error;
    }
  }
}
