import express from "express";
import { verifyEmail } from "../controller/verifyEmail.controller";
import { isUserVerified } from "../controller/isUserVerified.controller";

const router = express.Router();

router.get('/verify/email', verifyEmail)

router.get('/isVerified/:userId', isUserVerified)

export default router;

