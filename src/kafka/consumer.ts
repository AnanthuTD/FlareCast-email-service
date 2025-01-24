import z from "zod";
import { logger } from "../logger/logger";
import VerificationTokenRepository from "../repository/VerificationTokenRepository";
import EmailService from "../service/EmailService";
import SendVerificationEmailUseCase from "../usecase/SendVerificationEmailUseCase";
import kafka from "./kafka";
import { TOPICS } from "../config/topics";

const consumer = kafka.consumer({
	groupId: "email-service",
});

interface UserCreateMessage {
	userId: string;
	email: string;
}

export async function consumeMessages() {
	const topics = [TOPICS.USER_CREATED_EVENT];
	logger.info("⌛ Consuming messages from topic(s):", topics);

	try {
		await consumer.connect();
		await consumer.subscribe({ topics });

		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				logger.info({
					topic,
					partition,
					message: message.value?.toString(),
				});

				logger.debug(JSON.stringify(message, null, 2));

				const { value } = message;

				// send verification email
				if (value)
					sendVerificationEmail(
						JSON.parse(value.toString()) as unknown as UserCreateMessage
					);
			},
		});
	} catch (error) {
		logger.error("🔴 Error consuming Kafka message", {
			message: error.message,
			stack: error.stack,
			name: error.name,
			code: error.code || "UNKNOWN_ERROR",
		});
	}
}

export const emailVerificationSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
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
