import bcrypt from "bcrypt";
import db from "../drizzle";
import { User } from "../schema";
import yargs from "yargs";

// import yargs from "yargs";

export async function createAdmin(
  email: string,
  password: string,
  username: string
) {
  // Define user credentials
  const user = {
    email,
    password,
    username,
    id: (await db.select().from(User)).length,
    type: "admin",
    createdAt: new Date().toISOString(),
  } as const;

  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Insert the user into the database
  try {
    await db
      .insert(User)
      .values({
        ...user,
        password: hashedPassword,
        // add other necessary fields here
      })
      .execute();
    console.log("User has been created successfully.");
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}

const argv = yargs()
  .option("email", {
    alias: "e",
    description: "Email of the user",
    type: "string",
  })
  .option("password", {
    alias: "p",
    description: "Password of the user",
    type: "string",
  })
  .option("username", {
    alias: "u",
    description: "Username of the user",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

// Check if the necessary arguments are provided

// Call the function with command line arguments
(async () => {
  // @ts-ignore
  if (!argv.email || !argv.password || !argv.username) {
    console.log("Please provide an email, password and username.");
    process.exit(1);
  }
  // @ts-ignore
  await createAdmin(argv.email, argv.password, argv.username);
})();
