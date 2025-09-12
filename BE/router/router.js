import express from "express";
import authRoutes from "../auth/index.js";
import certRoutes from "../certificate/index.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cert", certRoutes);

export default router;


