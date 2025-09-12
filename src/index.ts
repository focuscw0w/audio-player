import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRouter from "./routes/home.js";
import loginRouter from "./routes/login.js";

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", homeRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
