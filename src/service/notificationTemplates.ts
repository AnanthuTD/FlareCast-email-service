import { NotificationEvent } from "../kafka";

interface EmailTemplate {
	subject: string;
	html: string;
}

export function getEmailTemplate(event: NotificationEvent): EmailTemplate {
	switch (event.template) {
		case "FIRST_VIEW":
			return {
				subject: `🚀 ${event.viewerName} Viewed Your Video: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Video View!</h2>
            <p>Hello there,</p>
            <p>
              ${event.viewerName} has viewed your video 
              <strong>"${event.videoName}"</strong> for the first time.
            </p>
            <a href="${getVideoUrl(event.videoId)}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Video Analytics
            </a>
          </div>
        `,
			};

		case "commentNotifications":
			return {
				subject: `💬 New Comment on Your Video: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Comment Received</h2>
            <p>Hi there,</p>
            <p>
              You've received a new comment on your video 
              <strong>"${event.videoName}"</strong> from ${event.viewerName}.
            </p>
            <a href="${getCommentUrl(event.videoId)}" 
               style="background-color: #059669; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Comment
            </a>
          </div>
        `,
			};

		case "transcriptSuccessNotifications":
			return {
				subject: `✅ Transcript Ready for ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Transcript Generation Complete</h2>
            <p>Great news!</p>
            <p>
              Your transcript for <strong>"${
								event.videoName
							}"</strong> is now ready.
            </p>
            <a href="${getTranscriptUrl(event.videoId)}" 
               style="background-color: #10b981; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Access Transcript
            </a>
          </div>
        `,
			};

		case "transcriptFailureNotifications":
			return {
				subject: `⚠️ Transcript Failed for ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Transcript Generation Issue</h2>
            <p>We encountered an issue processing your video:</p>
            <p><strong>"${event.videoName}"</strong></p>
            <p>Our team has been notified and we're working on a fix.</p>
            <a href="${getRetryUrl(event.videoId)}" 
               style="background-color: #dc2626; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Try Again
            </a>
          </div>
        `,
			};

		case "shareNotifications":
			return {
				subject: `📤 Your Video Was Shared: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Video Shared!</h2>
            <p>Exciting news!</p>
            <p>
              Your video <strong>"${event.videoName}"</strong> was shared by 
              ${event.viewerName}.
            </p>
            <a href="${getShareAnalyticsUrl(event.videoId)}" 
               style="background-color: #7c3aed; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Shares
            </a>
          </div>
        `,
			};

		case "removeFromWorkspaceNotifications":
			return {
				subject: `🗑️ Video Removed from Workspace: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6b7280;">Video Removed</h2>
            <p>This is to confirm that:</p>
            <p>
              <strong>"${event.videoName}"</strong> was removed from the workspace by 
              ${event.viewerName}.
            </p>
            <p style="color: #6b7280; font-size: 0.9em;">
              Note: This action can be reversed within 30 days from your trash folder.
            </p>
          </div>
        `,
			};

		default:
			throw new Error(`Unknown email template: ${event.template}`);
	}
}

function getVideoUrl(videoId: string): string {
  return `https://yourapp.com/videos/${videoId}`;
}

function getCommentUrl(videoId: string): string {
  return `https://yourapp.com/videos/${videoId}/comments`;
}

function getTranscriptUrl(videoId: string): string {
  return `https://yourapp.com/transcripts/${videoId}`;
}

function getRetryUrl(videoId: string): string {
  return `https://yourapp.com/retry/${videoId}`;
}

function getShareAnalyticsUrl(videoId: string): string {
  return `https://yourapp.com/analytics/shares/${videoId}`;
}