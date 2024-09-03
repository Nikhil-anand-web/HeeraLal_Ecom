import db from "@/lib/db";
import inputcleaner from "@/lib/inputcleaner";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",

            async authorize(credentials, req) {
                const sourceUrl = req.headers?.referer.replace(req.headers?.origin, '')
                const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;


                const lastIp = clientIp.split(',')[0].trim();

                const { identifire, password } = credentials


                if (sourceUrl === '/wah-control-center/sign-in') {
                    try {
                        const user = await db.admin.findFirst({
                            where: {
                                OR: [
                                    { email: identifire },
                                    { userName: identifire }

                                ],
                            },
                            include: {
                                permissions: true  // This will include the related permissions data
                            }
                        });

                        if (!user) {
                            console.log("not user found")
                            throw new Error("No registered User Found")

                        }
                        const isPasswordCorrect = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            const updatedAdmin = await db.admin.update({
                                where: { userName: user.userName },
                                data: {
                                    lastLogin: new Date(),
                                    lastLoginIp: lastIp,
                                },
                            });

                            console.log("User authorized successfully");
                            user.sourceUrl = sourceUrl
                            return user;

                        } else {
                            console.error("Incorrect password");
                            throw new Error("Incorrect password");
                        }


                    } catch (error) {
                        console.error("Error during authorization:", error);
                        throw new Error(error.message || "Authorization error");

                    }

                } else {
                    try {
                        const user = await db.user.findFirst({
                            where: {
                                OR: [
                                    { email: identifire },

                                ],
                            },
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                address: true,
                                pinCode: true,
                                city: true,
                                state: true,
                                emailVerified: true,
                                mobileVerified: true,
                                googleProfilePic: true,
                                mobile: true,
                                status: true,
                                password: true,
                                role: true
                            }
                        });

                        if (!user) {
                            console.log("not user found")
                            throw new Error("No registered User Found")

                        }
                        const isPasswordCorrect = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isPasswordCorrect) {


                            console.log("User authorized successfully", user);

                            user.sourceUrl = sourceUrl
                            return user;

                        } else {
                            console.error("Incorrect password");
                            throw new Error("Incorrect password");
                        }


                    } catch (error) {
                        console.error("Error during authorization:", error);
                        throw new Error(error.message || "Authorization error");

                    }

                }



            },


        }

        ),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID ,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET 
          })
    ],
    callbacks: {
        async signIn(props) {
            try {
                if (props.account.provider === 'google') {
                    let user = await db.user.findUnique({
                        where: { email: props.profile.email }
                    });
                    
                    if (!user) {
                        user = await db.user.create({
                            data: {
                                firstName: props.profile.given_name,
                                lastName: props.profile.family_name,
                                email: props.profile.email,
                                googleId: props.profile.sub,
                                googleProfilePic: props.profile.picture,
                                status: true,
                                emailVerified:true
                            }
                        });

                        if (user) {
                            
                            const cart = await db.cart.create({
                                data:{
                                    user:{connect:{id:user.id}}
                                }
                            })
                            
                        }
                    }
                    return true;
                }
                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Return false to prevent login if an error occurs
            }
        },
        async jwt(props) {
         
            var { token, user } =props
            if (props.account?.provider==='google') {
                const us=await db.user.findUnique({
                    where:{
                        email:props.profile.email
                    }
                })
                user = {...us,sourceUrl:'/sign-in'}

                
            }

            if (user && user.sourceUrl === '/sign-in') {

                token.id = user.id
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.role = user.role
                token.email = user.email
                token.status = user.status
                token.address = user.address
                token.pinCode = user.pinCode
                token.city = user.city
                token.state = user.state
                token.googleProfilePic = user.googleProfilePic
                token.mobile = user.mobile
                token.sourceUrl = user.sourceUrl
                token.mobileVerified=user.mobileVerified
                token.emailVerified=user.emailVerified




            } else if (user && user.sourceUrl === '/wah-control-center/sign-in') {
                token.id = user.id
                token.role = user.role
                token.email = user.email
                token.status = user.status
                token.sourceUrl = user.sourceUrl
                token.fullName = user.fullName
                token.profilePic = user.profilePic
                token.permissions = user.permissions
                token.lastLogin = user.lastLogin
                token.lastLoginIp = user.lastLoginIp
                token.createdAt = user.createdAt
                token.updatedAt = user.updatedAt



            }
            
         

            return token
        },
        async session({ session, token }) {

            if (token && token.sourceUrl === '/sign-in') {
                session.id = token.id
                session.firstName = token.firstName
                session.lastName = token.lastName
                session.role = token.role
                session.email = token.email
                session.status = token.status
                session.address = token.address
                session.pinCode = token.pinCode
                session.city = token.city
                session.state = token.state
                session.googleProfilePic = token.googleProfilePic
                session.mobile = token.mobile
                session.sourceUrl = token.sourceUrl
                session.mobileVerified=token.mobileVerified
                token.emailVerified=token.emailVerified



            } else if (token && token.sourceUrl === '/wah-control-center/sign-in') {
                session.id = token.id
                session.role = token.role
                session.email = token.email
                session.status = token.status
                session.sourceUrl = token.sourceUrl
                session.fullName = token.fullName
                session.profilePic = token.profilePic
                session.permissions = token.permissions
                session.lastLogin = token.lastLogin
                session.lastLoginIp = token.lastLoginIp
                session.createdAt = token.createdAt
                session.updatedAt = token.updatedAt

            }
        
     
            return session

        }
    },
    pages: {
        signIn: "/sign-in",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.SECRET_KEY,
}