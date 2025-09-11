import express from "express"
import cors from "cors"
import config from "./config.js"
import router from "./router/router.js"

const app = express()
app.use(cors())
app.use(express.json())
const PORT = config.PORT || 3000;

app.use("/api", router);

app.get("/", (req, res) => {
    res.json({ message : "SIH Backend Server is running perfectly"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})