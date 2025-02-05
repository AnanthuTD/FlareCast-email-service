export enum EMAIL_NOTIFICATION_TYPE {
	FIRST_VIEW = "first_view",
	COMMENT = "comment",
	TRANSCRIPT_SUCCESS = "transcript_success",
	TRANSCRIPT_FAILURE = "transcript_failure",
	WORKSPACE_REMOVE = "workspace_remove",
	WORKSPACE_DELETE = "workspace_delete",
	VIDEO_SHARE = "video_share",
	WORKSPACE_INVITATION = "workspace_invitation",
}

// Base notification event structure
interface BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE;
	userId: string;
	timestamp: number;
	template: EMAIL_NOTIFICATION_TYPE;
	email: string;
}

// Specific notification event structures
export interface FirstViewNotificationEvent extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.FIRST_VIEW;
	template: EMAIL_NOTIFICATION_TYPE.FIRST_VIEW;
	videoName: string;
	videoId: string;
	viewerName: string;
}

export interface CommentNotificationEvent extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.COMMENT;
	template: EMAIL_NOTIFICATION_TYPE.COMMENT;
	videoName: string;
	videoId: string;
	commenterName: string;
}

export interface TranscriptSuccessNotificationEvent
	extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_SUCCESS;
	template: EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_SUCCESS;
	videoId: string;
	videoName: string;
}

export interface TranscriptFailureNotificationEvent
	extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_FAILURE;
	template: EMAIL_NOTIFICATION_TYPE.TRANSCRIPT_FAILURE;
	videoId: string;
}

export interface WorkspaceRemoveNotificationEvent
	extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.WORKSPACE_REMOVE;
	template: EMAIL_NOTIFICATION_TYPE.WORKSPACE_REMOVE;
	workspaceId: string;
	workspaceName: string;
}

export interface WorkspaceDeleteNotificationEvent
	extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.WORKSPACE_DELETE;
	template: EMAIL_NOTIFICATION_TYPE.WORKSPACE_DELETE;
	workspaceId: string;
	workspaceName: string;
}

export interface VideoShareNotificationEvent extends BaseNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.VIDEO_SHARE;
	template: EMAIL_NOTIFICATION_TYPE.VIDEO_SHARE;
	url: string;
	sharerId: string;
	sharerName: string;
	videoName: string;
}

export interface WorkspaceInvitationNotificationEvent {
	eventType: EMAIL_NOTIFICATION_TYPE.WORKSPACE_INVITATION;
	template: EMAIL_NOTIFICATION_TYPE.WORKSPACE_INVITATION;
	senderId: string;
	invites: {
		receiverEmail: string;
		url: string;
		receiverId?: string;
	}[];
	workspaceId: string;
	workspaceName: string;
	timestamp: number;
	userId: null;
}

// Union type for all possible email notification events
export type EmailNotificationEvent =
	| FirstViewNotificationEvent
	| CommentNotificationEvent
	| TranscriptSuccessNotificationEvent
	| TranscriptFailureNotificationEvent
	| WorkspaceRemoveNotificationEvent
	| WorkspaceDeleteNotificationEvent
	| VideoShareNotificationEvent
	| WorkspaceInvitationNotificationEvent;
