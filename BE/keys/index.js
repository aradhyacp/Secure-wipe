import express from "express";
const router = express.Router();
import supabase from "../db/index.js";

router.get("/key-verify/:product_key", async (req, res) => {
    const { product_key } = req.params;
    try {
        const { data, error } = await supabase
            .from("users")
            .select("product_key")
            .eq("product_key", product_key)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "Product key not found.", valid: false });
        }
        if(product_key !== data.product_key){
            return res.status(400).json({ message: "Invalid product key.", valid: false });
        }
        return res.json({ valid: true });
    } catch (error) {
        return res.status(500).json({ message: "Error verifying product key.", error: error.message, valid: false });
    }
});

export default router;