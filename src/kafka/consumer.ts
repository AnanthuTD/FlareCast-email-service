import { logger } from "../logger/logger";
import kafka from "./kafka";
import { TOPICS } from "../config/topics";
import { KafkaMessage } from "kafkajs";

const consumer = kafka.consumer({
	groupId: "email-service",
});

export async function consumeMessages(
	topics: TOPICS[],
	cb: (
		value: any,
		topic: string,
		partition: number,
		message: KafkaMessage
	) => void
) {
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

				const { value } = message;

				// send verification email
				if (value)
					cb(JSON.parse(value.toString()) as any, topic, partition, message);
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

