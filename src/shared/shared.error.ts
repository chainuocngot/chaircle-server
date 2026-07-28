import { ConflictException, NotFoundException } from '@nestjs/common';

export const UserNotFoundException = new NotFoundException('Error.UserNotFound');

export const UsernameAlreadyTakenException = new ConflictException('Error.UsernameAlreadyTaken');

export const EmailAlreadyInUsedException = new ConflictException('Error.EmailAlreadyInUsed');
