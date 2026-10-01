import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import prisma from "../lib/prisma.js"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value
                const googleId = profile.id
                const avatar = profile.photos?.[0]?.value

                if (!email) {
                    return done(null, false)
                }

                let user = await prisma.user.findUnique({
                    where: {
                        googleId
                    }
                })

                if (!user) {
                    user = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    })
                }

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId,
                            email,
                            userName: profile.displayName,
                            avatar
                        }
                    })
                } else if (!user.googleId) {
                    user = await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            googleId,
                            avatar: avatar || user.avatar
                        }
                    })
                }

                return done(null, user)
            } catch (error) {
                console.log("Google OAuth Error:", error)
                return done(error, null)
            }
        }
    )
)

export default passport