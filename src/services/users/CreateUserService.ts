import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!name || !email || !password) {
      throw new Error("All fields are required: name, email, and password.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    console.log("Creating user with the following details:", {
      name,
      email,
    });

    return {
      user,
    };
  }
}

export default CreateUserService;
