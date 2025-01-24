import prisma from "../prismaClient";

class VerificationTokenRepository {
	async createToken({
		email,
		expiresAt,
		token,
		userId,
	}: IToken): Promise<null> {
		try {
			const tokenInstance = await prisma.emailVerification.upsert({
				create: {
					email,
					expiresAt,
					token,
					userId,
				},
				update: { token, expiresAt },
				where: { userId, email },
			});
		} catch (error) {
			console.error("Error creating token:", error);
		}
		return null;
	}

	async findToken(token: string, email: string): Promise<IToken | null> {
		return await prisma.emailVerification.findFirst({ where: { token, email } });
	}

	async removeToken(token: string): Promise<null> {
		await prisma.emailVerification.delete({ where: { token } });
		return null;
	}

	async removeTokenWithEmail(email: string): Promise<null> {
		await prisma.emailVerification.delete({ where: { email } });
		return null;
	}

	async updateOrCreateToken({
		email,
		token,
		expiresAt,
		userId,
	}: IToken): Promise<null> {
		prisma.emailVerification.upsert({
			where: { email, userId },
			update: { token, expiresAt },
			create: { email, token, expiresAt, userId },
		});
		return null;
	}

	async markAsVerified({email, userId}){
		await prisma.emailVerification.update({
      where: { email, userId },
      data: { verifiedAt: new Date(), verified: true },
    });
    return null;
	}
}

export default VerificationTokenRepository;
