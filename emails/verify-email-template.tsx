import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from 'tailwind.config';

interface VerifyEmailProps {
  verificationCode?: string;
}

export default function VerifyEmailTemplate({ verificationCode }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-aws text-[#212121]">
          <Preview>Email Verification</Preview>
          <Container className="p-5 mx-auto bg-[#eee]">
            <Section className="bg-white">
              <Section className="py-[25px] px-[35px]">
                <Heading className="text-[#333] text-[20px] font-bold mb-[15px]">
                  Verify your email address
                </Heading>
                <Text className="text-[#333] text-[14px] leading-[24px] mt-6 mb-[14px] mx-0">
                  Thanks for starting the new Chaircle account creation process. We want to make
                  sure it's really you. Please enter the following verification code when prompted.
                  If you don&apos;t want to create an account, you can ignore this message.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                    Verification code
                  </Text>

                  <Text className="text-[#333] text-[36px] my-[10px] mx-0 font-bold text-center">
                    {verificationCode}
                  </Text>
                  <Text className="text-[#333] text-[14px] m-0 text-center">
                    (This code is valid for 15 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="py-[25px] px-[35px]">
                <Text className="text-[#333] text-[14px] m-0">
                  Chaircle will never email you and ask you to disclose or verify your password,
                  credit card, or banking account number.
                </Text>
              </Section>
            </Section>
            <Text className="text-[#333] text-[12px] my-[24px] mx-0 px-5 py-0">
              This message was produced and distributed by Chaircle, Inc., Vinh Hung, Ha Noi, Viet
              Nam. © 2026, Chaircle, Inc.. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
