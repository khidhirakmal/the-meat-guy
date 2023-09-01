import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcrypt";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  // extract email and password
  const { email, password } = await req.json();
  // validate email and password
  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  // check if user exists
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Incorrect email. Please try again.",
      });
    }
    // compare/validate password using bcrypt
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }
    // if all details correct, create token
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );

    const newUserData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login Succesful!",
      newUserData,
    });
  } catch (error) {
    console.log("Error while loggin in. Please try again");

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
