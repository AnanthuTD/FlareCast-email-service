import { logger } from "../../logger/logger";
import EmailService from "../../service/EmailService";
import { getEmailTemplate } from "../../service/notificationTemplates";

export interface NotificationEvent {
  eventType: string;
  userId: string;
  videoName: string;
  videoId: string;
  viewerName: string;
  email: string;
  template: string;
}

export const handleNotifications = async (value: NotificationEvent) => {
  try {
    const { subject, html } = getEmailTemplate(value);
    await new EmailService().sendEmail({ to: value.email, subject, html });
    logger.info(`Email sent for ${value.template} event to ${value.email}`);
  } catch (error) {
    logger.error(`Failed to send email for ${value.template}:`, error);
  }
}