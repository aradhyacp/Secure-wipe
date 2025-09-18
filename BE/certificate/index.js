import express from "express";
const router = express.Router();
import supabase from "../db/index.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

router.post("/verify", upload.single("json_file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "JSON file is required." });
        }
        
        let jsonData;
        try {
            jsonData = JSON.parse(req.file.buffer.toString());
        } catch (error) {
            return res.status(400).json({ message: "Invalid JSON file format." });
        }
        const { id ,device_name, wipe_date, method, hash } = jsonData;
        
        if (!id || !device_name || !wipe_date || !method || !hash) {
            return res.status(400).json({ message: "Missing required fields in JSON." });
        }
        const { data: certificate, error } = await supabase
            .from("certificates")
            .select("*")
            .eq("id", id)
            .single();
        
        if (error) {
            return res.status(500).json({ message: "Error fetching certificate.", error: error.message });
        }
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found." });
        }
        if (
            certificate.device_name !== device_name ||
            new Date(certificate.wipe_date).toISOString() !== new Date(wipe_date).toISOString() ||
            certificate.method !== method ||
            certificate.hash !== hash
        ) {
            return res.status(400).json({ message: "Certificate data does not match." });
        }
        return res.json({ success: true, message: "Certificate verified successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error verifying certificate.", error: error.message });
    }
});

router.get("/verify-by-id/:certid", async (req, res) => {
    try {
        const { certid } = req.params;
        const { data: certificate, error } = await supabase
            .from("certificates")
            .select("*")
            .eq("id", certid)
            .single();

        if (error) {
            return res.status(500).json({ message: "Error fetching certificate.", error: error.message });
        }
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found." });
        }
        return res.json({ success: true, verified: true, certificate });
    } catch (error) {
        return res.status(500).json({ message: "Error verifying certificate.", error: error.message });
    }
});

router.post("/create", async (req, res) => {
    try{
        const {id,product_key,device_name,capacity,passes,wipe_date,method,hash} = req.body;
        if(!id || !product_key || !device_name || !capacity || !passes || !wipe_date || !method || !hash){
            return res.status(400).json({message: "All fields are required"});
        }
        const {data: existingCertificate, error: fetchError} = await supabase
            .from('certificates')
            .select('*')
            .eq('id', id)
            .single();
        if(fetchError && fetchError.code !== 'PGRST116'){
            return res.status(500).json({message: "Error checking existing certificate", error: fetchError.message});
        }
        if(existingCertificate){
            return res.status(400).json({message: "Certificate with this ID already exists"});
        }
        const {data, error} = await supabase
            .from('certificates')
            .insert([{id, product_key, device_name, capacity, passes, wipe_date, method, hash}])
        if(error){
            return res.status(500).json({message: "Error adding certificate", error: error.message,success:false});
        }
        return res.status(201).json({message: "Certificate added successfully", data,success:true});
    } catch (error) {
        return res.status(500).json({message: "Error adding certificate", error: error.message,success:false});
    }
});

export default router;