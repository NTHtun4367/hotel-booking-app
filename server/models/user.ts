import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [6, "Your password must be longer than 6 characters."],
      select: false,
    },
    avatar: {
      url: String,
      public_id: String,
    },
    role: {
      type: [String],
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "Please select a correct role.",
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model("User", userSchema);
