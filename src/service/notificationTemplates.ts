import {
	EMAIL_NOTIFICATION_TYPE,
	EmailNotificationEvent,
} from "../types/types";

interface EmailTemplate {
	subject: string;
	html: string;
}

export function getEmailTemplate(event: EmailNotificationEvent): EmailTemplate {
	switch (event.template) {
		case EMAIL_NOTIFICATION_TYPE.FIRST_VIEW:
			return {
				subject: `🚀 ${event.viewerName} viewed your video: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Your First Viewer Has Arrived!</h2>
            <p>Hello,</p>
            <p>${event.viewerName} has just watched your video <strong>"${
					event.videoName
				}"</strong>.</p>
            <a href="${getVideoUrl(event.videoId)}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Video Analytics
            </a>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.COMMENT:
			return {
				subject: `💬 New comment on your video: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Comment Received</h2>
            <p>Hey there,</p>
            <p><strong>${
							event.commenterName
						}</strong> commented on your video: <strong>"${
					event.videoName
				}"</strong>.</p>
            <a href="${getCommentUrl(event.videoId)}" 
               style="background-color: #059669; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Comment
            </a>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_SUCCESS:
			return {
				subject: `✅ Transcript is ready for ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Your Transcript is Ready</h2>
            <p>Good news! The transcript for <strong>"${
							event.videoName
						}"</strong> is now available.</p>
            <a href="${getTranscriptUrl(event.videoId)}" 
               style="background-color: #10b981; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Access Transcript
            </a>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_FAILURE:
			return {
				subject: `⚠️ Transcript failed for ${event.videoId}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Transcript Generation Failed</h2>
            <p>We encountered an issue processing your video: "</strong>.</p>
            <p>Try again later or contact support if the issue persists.</p>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.WORKSPACE_REMOVE:
			return {
				subject: `🗑️ Removed from workspace: ${event.workspaceName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6b7280;">You were removed from a workspace</h2>
            <p>Your access to the workspace <strong>"${event.workspaceName}"</strong> has been removed.</p>
            <p>If you believe this was a mistake, please contact the workspace admin.</p>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.WORKSPACE_DELETE:
			return {
				subject: `❌ Workspace deleted: ${event.workspaceName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ef4444;">Workspace Deleted</h2>
            <p>The workspace <strong>"${event.workspaceName}"</strong> has been permanently deleted.</p>
            <p>This action cannot be undone.</p>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.VIDEO_SHARE:
			return {
				subject: `📤 Your video was shared: ${event.videoName}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Your Video Was Shared</h2>
            <p>Your video <strong>"${event.videoName}"</strong> was shared by <strong>${event.sharerName}</strong>.</p>
          </div>
        `,
			};

		case EMAIL_NOTIFICATION_TYPE.WORKSPACE_INVITATION:
			return {
				subject: `📩 You're Invited to Join ${event.workspaceName}!`,
				html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #7c3aed; text-align: center;">🚀 Join ${event.workspaceName}!</h2>
        <p style="font-size: 16px; color: #333;">
          You've been invited to collaborate on the workspace <strong>"${event.workspaceName}"</strong>.
        </p>
        <p style="font-size: 16px; color: #333;">
          Click the button below to accept the invitation and start working with your team!
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${(event as any).url}" style="background-color: #7c3aed; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
            ✅ Join Workspace
          </a>
        </div>
      </div>
    `,
			};

		default:
			throw new Error(`Unknown email template: ${(event as any).template}`);
	}
}

// 🔹 Helper functions to generate URLs
function getVideoUrl(videoId: string): string {
	return `https://yourapp.com/videos/${videoId}`;
}

function getCommentUrl(videoId: string): string {
	return `https://yourapp.com/videos/${videoId}/comments`;
}

function getTranscriptUrl(videoId: string): string {
	return `https://yourapp.com/transcripts/${videoId}`;
}
