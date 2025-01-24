import jwt from 'jsonwebtoken';
import env from '../env';

export class TokenService {
  public static generateToken(
    data = {},
    secret = env.EMAIL_VERIFICATION_TOKEN_SECRET,
  ): string {
    return jwt.sign(data, secret, {
      expiresIn: '1d',
    });
  }

  public static verifyToken = async (
    token: string,
    secret: string = env.EMAIL_VERIFICATION_TOKEN_SECRET
  ): Promise<{ valid: boolean; data?: object; message: string }> => {
    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      return {
        valid: true,
        data: decoded,
        message: 'Token is valid',
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          valid: false,
          message: 'Token has expired',
        };
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return {
          valid: false,
          message: 'Token is invalid',
        };
      }

      return {
        valid: false,
        message: 'Token verification failed',
      };
    }
  };
}

export default TokenService;
