import connectToDB from "@/utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User, { UserDocument } from "@/models/user";

interface AuthorizeResult {
  id: string | number;
  email: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials: any): Promise<AuthorizeResult | null> {
        if (!credentials || !credentials.email || !credentials.password) {
          return null; // Credentials are missing
        }

        await connectToDB();
        try {
          const user: UserDocument | null = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return { id: user._id, email: user.email };
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unexpected error occurred");
          }
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
