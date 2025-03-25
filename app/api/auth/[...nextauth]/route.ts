import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// This is a simplified auth setup for demonstration purposes
// In a real app, you would connect this to your backend API

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.userType) {
          return null
        }

        // In a real app, you would verify credentials against your database
        // For demo purposes, we'll accept any credentials

        // Mock user data
        const user = {
          id: "1",
          name:
            credentials.userType === "user"
              ? "Demo User"
              : credentials.userType === "captain"
                ? "Demo Captain"
                : "Admin",
          email: credentials.email,
          userType: credentials.userType,
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.userType = token.userType as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }

