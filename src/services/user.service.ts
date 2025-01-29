import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db";

export type TSignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

class userService {
  private static getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  public static async signup(payload: TSignupPayload) {
    const { firstName, lastName, email, password } = payload;

    // check if user email is already exist
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new Error("This email already exist. try with a different email");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return newUser;
  }

  public static async login(payload: TLoginPayload) {
    const { email, password } = payload;
    // check if user email is already exist
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // check if user password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Incorrect password. Please try again");
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export default userService;
