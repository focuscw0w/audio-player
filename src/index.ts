import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import homeRouter from "./routes/home.js";
import loginRouter from "./routes/login.js";

// Config for environment variables
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Public folder & Views
app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", homeRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
