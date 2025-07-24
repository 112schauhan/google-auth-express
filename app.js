import express from "express"
import dotenv from "dotenv"
import session from "express-session"
import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

dotenv.config()

const app = express()
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/blank")
  }
)

app.get("/blank", (req, res) => {
  res.send("<html><body></body></html>")
})

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;  /* centers horizontally */
            align-items: center;      /* centers vertically */
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .google-btn {
            background-color: #4285F4;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: background-color 0.3s ease;
            text-align: center;
            text-decoration: none;
            display: inline-block;
          }
          .google-btn:hover {
            background-color: #357ae8;
          }
        </style>
      </head>
      <body>
        <a class="google-btn" href="/auth/google">Sign in with Google</a>
      </body>
    </html>
  `);
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
