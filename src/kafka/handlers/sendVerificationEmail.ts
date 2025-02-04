import { logger } from "../../logger/logger";
import VerificationTokenRepository from "../../repository/VerificationTokenRepository";
import { emailVerificationSchema } from "../../schema";
import EmailService from "../../service/EmailService";
import SendVerificationEmailUseCase from "../../usecase/SendVerificationEmailUseCase";

interface UserCreateMessage {
	userId: string;
	email: string;
}

export async function sendVerificationEmail({
	userId,
	email,
}: UserCreateMessage) {
	try {
		console.log(email, userId);
		emailVerificationSchema.parse({ email });

		const tokenRepository = new VerificationTokenRepository();
		const emailService = new EmailService();

		const sendVerificationEmailUsecase = new SendVerificationEmailUseCase(
			tokenRepository,
			emailService
		);

		await sendVerificationEmailUsecase.execute({ email, userId });
	} catch (error) {
		logger.error("Failed to send verification email!", error);
	}
}
