import { v4 as uuidv4 } from "uuid";
import { convertRelativeTimeToDate } from "../utils/TimeUtils";
import generateEmailTemplate, {
	EmailProcess,
} from "../service/emailTemplateGenerator";
import VerificationTokenRepository from "../repository/VerificationTokenRepository";
import env from "../env";
import EmailService from "../service/EmailService";
import TokenService from "../service/TokenService";

interface SendVerificationEmailProps {
	email: string;
	userId: string;
}

class SendVerificationEmailUseCase {
	constructor(
		private readonly tokenRepository: VerificationTokenRepository,
		private readonly emailService: EmailService
	) {}

	async execute({ email, userId }: SendVerificationEmailProps): Promise<void> {
		// TODO: check if the user already has verified the email

		// Generate a verification token
		const token = TokenService.generateToken({ userId, email });
		const expirationDate = convertRelativeTimeToDate(
			env.EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME
		);
		await this.tokenRepository.createToken({
			email,
			token,
			expiresAt: expirationDate,
			userId,
		});

		// Construct the verification link with the token as a query parameter
		const verificationLink = `${env.HOST_URL}/api/verify/email?token=${token}&email=${email}`;

		// Send verification email
		await this.emailService.sendVerificationEmail({
			to: email,
			subject: "Please verify your email address",
			html: generateEmailTemplate({
				process: EmailProcess.SIGNUP_VERIFICATION,
				props: { name: email, verificationLink },
			}),
		});
	}
}

export default SendVerificationEmailUseCase;
