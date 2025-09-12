import express from "express";
import authRoutes from "../auth/index.js";
import certRoutes from "../certificate/index.js";
import dashboardRoutes from "../dashboard/index.js";
import keyRoutes from "../keys/index.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cert", certRoutes);
router.use("/dashboard", dashboardRoutes)
router.use("/key", keyRoutes);

export default router;


