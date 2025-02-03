import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1d expired token
  },

  secret: environment.AUTH_SECRET, // get from .env

  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        // ambil nilai dari credentials
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        // Login dengan identifier dan password
        const result = await authServices.login({
          identifier,
          password,
        });
        // jika berhasil login, ambil accessToken nya
        const accessToken = result.data.data;

        // ambil data profile dari accessToken
        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        // validasi semua response
        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;

          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;

      return session;
    },
  },
});
