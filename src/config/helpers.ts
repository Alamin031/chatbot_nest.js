import * as bcrypt from 'bcryptjs';
import { UnprocessableEntityException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Role } from 'src/auth/enums/auth.role';
import { getConfigVar } from 'src/utils/config';

export const createAccessToken = async (userId: number, role: Role) => {
  const accessToken = sign({ userId, role }, getConfigVar('JWT_SECRET'), {
    expiresIn: getConfigVar('JWT_EXPIRATION'),
  });
  return accessToken;
};
export const customResponseHandler = (message: string, response?: any) => {
  return { data: response, message };
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match)
    throw new UnprocessableEntityException('Wrong email or password.');
  return match;
};
