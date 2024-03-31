"use server";
import { signIn } from "@/db/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Kredencialet jane të gabuara, ju lutem kontrolloini!";
        default:
          return "Diçka shkoi keq, ju lutem provoni përsëri!";
      }
    }
    throw error;
  }
}
