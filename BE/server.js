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

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).json({
    error: "Internal server error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})