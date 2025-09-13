import passport from "passport";
import { pool } from "../db/pool.js";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy((username, password, done) => {
   //pool.query()
}));
