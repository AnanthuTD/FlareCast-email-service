import app from "./app";
import env from "./env";
import { logger } from "./logger/logger";
import './kafka'

const start = async () => {
	try {
		app.listen(env.PORT, async () => {
			logger.info(`🟢 Server running at http://localhost:${env.PORT}`);
			logger.info(`mongodb is available on port ${env.DATABASE_URL}`)
		});
	} catch (err) {
		logger.error(`🔴 Error starting the server: ${(err as Error).message}`);
	}
};

start();
