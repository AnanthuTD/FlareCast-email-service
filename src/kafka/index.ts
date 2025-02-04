import { sendVerificationEmail } from "./handlers/sendVerificationEmail";
import { handleNotifications } from "./handlers/notification.handler";
import { createTopic } from "./admin";
import { logger } from "../logger/logger";
import { TOPICS } from "../config/topics";
import { consumeMessages } from "./consumer";

// Create topics and start consuming messages
createTopic([]).then(() => {
	logger.info("✅ Topic created successfully");

	// Define topic handlers
	const topicHandlers = {
		[TOPICS.USER_CREATED_EVENT]: sendVerificationEmail,
		[TOPICS.EMAIL_NOTIFICATION]: handleNotifications,
	};

	// Start consuming messages
	consumeMessages(topicHandlers).catch((error) => {
		logger.error("Failed to start consumer:", error);
	});
});
