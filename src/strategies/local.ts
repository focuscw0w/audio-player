import passport from "passport";
import { pool } from "../db/pool.js";
import { Strategy as LocalStrategy } from "passport-local";
import type { User } from "../types/user.js";
import type { QueryResult } from "pg";
import { verifyPassword } from "../utils/password.js";

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const res: QueryResult<User> = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = res.rows[0];
      // User not found
      if (!user) {
        return done(null, false, { message: "User not found." });
      }

      // Is password correct?
      if (!verifyPassword(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return done(error);
      }
    }
  })
);
