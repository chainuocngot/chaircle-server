import { ConflictException } from '@nestjs/common';

export const EmailAlreadyInUsedException = new ConflictException('Error.EmailAlreadyInUsed');

export const UsernameAlreadyTakenException = new ConflictException('Error.UsernameAlreadyTaken');
