import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy((username, password, done) => {}));
