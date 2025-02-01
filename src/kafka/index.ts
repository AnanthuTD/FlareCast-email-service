import z from "zod";
import { TOPICS } from "../config/topics";
import { logger } from "../logger/logger";
import { createTopic } from "./admin";
import { consumeMessages } from "./consumer";
import VerificationTokenRepository from "../repository/VerificationTokenRepository";
import EmailService from "../service/EmailService";
import SendVerificationEmailUseCase from "../usecase/SendVerificationEmailUseCase";
import { getEmailTemplate } from "../service/notificationTemplates";

interface UserCreateMessage {
	userId: string;
	email: string;
}

export interface NotificationEvent {
	eventType: string;
	userId: string;
	videoName: string;
	videoId: string;
	viewerName: string;
	email: string;
	template: string;
}

export const emailVerificationSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
});

createTopic([]).then(() => {
	logger.info("✅ Topic created successfully");

	consumeMessages(
		[TOPICS.EMAIL_NOTIFICATION],
		async (value: NotificationEvent) => {
			try {
				const { subject, html } = getEmailTemplate(value);
				await new EmailService().sendEmail({ to: value.email, subject, html });
				logger.info(`Email sent for ${value.template} event to ${value.email}`);
			} catch (error) {
				logger.error(`Failed to send email for ${value.template}:`, error);
			}
		}
	);

	consumeMessages([TOPICS.USER_CREATED_EVENT], (value: NotificationEvent) => {
		sendVerificationEmail(value);
	});
});

async function sendVerificationEmail({ userId, email }: UserCreateMessage) {
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
