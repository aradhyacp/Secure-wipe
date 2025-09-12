import express from "express";
const router = express.Router();
import supabase from "../db/index.js";
import { authMiddleware } from "../middleware/middleware.js";

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, email, productKey")
      .eq("id", userId)
      .single();

    if (usersError || !users) {
      return res.status(404).json({ message: "User not found." });
    }

    const { data: certificates, error: certsError } = await supabase
      .from("certificates")
      .select("id, device_name, wipe_date, method, hash, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (certsError) {
      return res
        .status(500)
        .json({
          message: "Error fetching certificates.",
          error: certsError.message,
        });
    }

    const stats = {
      diskWiped: certificates.length || 0,
      certificatesIssued: certificates.length || 0,
    };

    return res.json({
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        productKey: users.productKey,
      },
      stats,
      certificates: certificates.map((cert) => ({
        certificate_id: cert.id,
        device_name: cert.device_name,
        wipe_date: cert.wipe_date,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching dashboard data.",
        error: error.message,
      });
  }
});

export default router;
