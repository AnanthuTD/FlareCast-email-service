export interface ITokenVerifier {
  verifyToken(
    token: string,
    email: string
  ): Promise<{ valid: boolean; email?: string; message: string }>;
}
