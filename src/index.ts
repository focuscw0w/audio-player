import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import { initUserTable } from "./db/init.js";
import { SESSION_SECRET, PORT } from "./env.js";
import { pool } from "./db/pool.js";

import homeRouter from "./routes/home.js";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import type { User } from "./types/user.js";
import type { QueryResult } from "pg";

const app = express();

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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const res: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    const user = res.rows[0];
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return done(error);
    }
  }
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// Start server
app.listen(PORT, async () => {
  try {
    await initUserTable();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error initializing the database:", error.message);
      process.exit(1);
    }
  }
});
