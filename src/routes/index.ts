import express from "express";
import { verifyEmail } from "../controller/verifyEmail.controller";

const router = express.Router();

router.get('/verify/email', verifyEmail)

export default router;

