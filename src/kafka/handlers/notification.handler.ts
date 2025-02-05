import { logger } from "../../logger/logger";
import EmailService from "../../service/EmailService";
import { getEmailTemplate } from "../../service/notificationTemplates";
import {
	EMAIL_NOTIFICATION_TYPE,
	EmailNotificationEvent,
	WorkspaceInvitationNotificationEvent,
} from "../../types/types";

// Generic function to handle email notifications
const sendNotificationEmail = async (event: EmailNotificationEvent) => {
	try {
		const { subject, html } = getEmailTemplate(event);
		await new EmailService().sendEmail({ to: event.email, subject, html });
		logger.info(`Email sent for ${event.eventType} to ${event.email}`);
	} catch (error) {
		logger.error(`Failed to send email for ${event.eventType}:`, error);
	}
};

const sendWorkspaceInvitations = async (
	event: WorkspaceInvitationNotificationEvent
) => {
	for (const { receiverEmail, url } of event.invites) {
		try {
			const { subject, html } = getEmailTemplate({
				eventType: EMAIL_NOTIFICATION_TYPE.WORKSPACE_INVITATION,
				email: receiverEmail,
				workspaceName: event.workspaceName,
				url,
			});
			await new EmailService().sendEmail({ to: receiverEmail, subject, html });
			logger.info(`Email sent for ${event.eventType} to ${receiverEmail}`);
		} catch (error) {
			logger.error(`Failed to send email for ${event.eventType}:`, error);
		}
	}
};

// Notification event handlers mapped dynamically
const notificationHandlers: Record<
	string,
	(event: EmailNotificationEvent) => Promise<void>
> = {
	[EMAIL_NOTIFICATION_TYPE.FIRST_VIEW]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.COMMENT]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_SUCCESS]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_FAILURE]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.WORKSPACE_REMOVE]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.WORKSPACE_DELETE]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.VIDEO_SHARE]: sendNotificationEmail,
	[EMAIL_NOTIFICATION_TYPE.WORKSPACE_INVITATION]: sendWorkspaceInvitations,
};

// Centralized notification handler
export const handleNotifications = async (event: EmailNotificationEvent) => {
	if (!event.eventType || !notificationHandlers[event.eventType]) {
		logger.warn(`No handler found for event type: ${event.eventType}`);
		return;
	}

	await notificationHandlers[event.eventType](event);
};
