import express from "express"
const router = express.Router();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config.js";
import supabase from "../db/index.js";

function generateProductKey() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomStr = "";
  for (let i = 0; i < 11; i++) {
    randomStr += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return `Secure-${randomStr}-wipe`;
}

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }
    try {
    const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    
    if(existingUser) {
        return res.status(400).json({ message: "User with this email already exists." });
    }

    if (findError && findError.code !== 'PGRST116') {
        return res.status(500).json({ message: "Error checking existing user.", error: findError.message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const productKey = generateProductKey();

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, passwordHash, productKey }])
      .select()
      .single();

    if (error) {
        return res.status(500).json({ message: "Error creating user.", error: error.message }); 
    }
    const token = jwt.sign({ id: data.id, email: data.email }, config.JWT_SECRET);
    return res.json({ success: true, userId: data.id, token });

    } catch (error) {
        return res.status(500).json({ message: "Error creating user.", error: error.message });
    }   
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
            
        if (error || !user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET);
    return res.json({ success: true, userId: user.id, token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in.", error: error.message });
    }

});

export default router;