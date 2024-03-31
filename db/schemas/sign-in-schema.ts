import z from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Ju lutem, shkruani email-in tuaj!" })
    .email({
      message:
        "Emaili nuk është i mirëfilltë, kujdes te shkruani një email te saktë!",
    }),
  password: z
    .string({ required_error: "Ju lutem, shkruani password-in tuaj!" })
    .min(8, {
      message: "Fjalëkalimi duhet të jetë më i gjatë se 8 karaktere!",
    }),
});
