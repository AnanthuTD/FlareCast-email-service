import { RequestHandler } from "express";
import prisma from "../prismaClient";
import { logger } from "../logger/logger";

export const isUserVerified = <RequestHandler>(async (req, res, next) => {
	try {
		const { userId } = req.params;

		const isVerified = await prisma.emailVerification.findFirst({
			where: { userId, verified: true },
		});

		res.json({ verified: isVerified });
	} catch (err) {
		res.status(500).json({ verified: false });
		logger.error(err);
	}
});
