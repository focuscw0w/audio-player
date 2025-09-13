import passport from "passport";
import { pool } from "../db/pool.js";
import { Strategy as LocalStrategy } from "passport-local";
import type { User } from "../types/user.js";
import type { QueryResult } from "pg";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const res: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    // Is user in database?
    if (res.rowCount === 0) {
      return done(null, false, { message: "User not found." });
    }

    // Is password correct?
    const user = res.rows[0];
  })
);
