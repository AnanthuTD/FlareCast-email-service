import dayjs from "dayjs";
import { ITokenVerifier } from "../entities/ITokenVerifier";
import VerificationTokenRepository from "../repository/VerificationTokenRepository";

class TokenVerifier implements ITokenVerifier {
	private verificationTokenRepo = new VerificationTokenRepository();

	public verifyToken = async (
		token: string,
		email: string
	): Promise<{ valid: boolean; email?: string; message: string }> => {
		const tokenInstance = await this.verificationTokenRepo.findToken(
			token,
			email
		);

		if (!tokenInstance) {
			return { valid: false, message: "Token not found" };
		}

		const { expiresAt } = tokenInstance;

		if (dayjs(expiresAt).isAfter(dayjs())) {
			return { valid: true, email, message: "Token is valid" };
		} else {
			return { valid: false, message: "Token has expired" };
		}
	};
}

export default TokenVerifier;
