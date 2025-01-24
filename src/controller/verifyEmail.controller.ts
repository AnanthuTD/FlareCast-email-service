import { RequestHandler } from "express";
import env from "../env";
import TokenService from "../service/TokenService";
import VerificationTokenRepository from "../repository/VerificationTokenRepository";
import { logger } from "../logger/logger";

export const verifyEmail = <RequestHandler>(async (req, res, next) => {
	const { token } = req.query;

	const failureUrl = new URL(env.FRONTEND_VERIFICATION_FAILURE_ROUTE);
	failureUrl.searchParams.set("message", "Email verification failed.");

	if (!token) {
		logger.debug("�� No token provided");
		return res.redirect(failureUrl.toString());
	}

	const payload = await TokenService.verifyToken(token as string);

	if (!payload.valid) {
		logger.debug("�� Error verifying email");
		res.redirect(failureUrl.toString());
		return;
	}

	try {
		const tokenRepository = new VerificationTokenRepository();
		await tokenRepository.markAsVerified(payload.data);
	} catch (error) {
		logger.error("�� Error verifying email:", error);
		return res.redirect(failureUrl.toString());
	}

	const successUrl = new URL(env.FRONTEND_VERIFICATION_SUCCESS_ROUTE);
	successUrl.searchParams.set("message", "Email verification successful.");
	return res.redirect(successUrl.toString());
});
