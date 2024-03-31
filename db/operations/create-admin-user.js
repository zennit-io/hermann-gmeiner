import bcrypt from "bcrypt";
import db from "../drizzle.js";
import { User } from "../schema.js";
import yargs from "yargs";

export async function createAdmin(email, password, username) {
  const user = {
    email: email,
    password: password,
    username: username,
    id: (await db.select().from(User)).length,
    type: "admin",
    createdAt: new Date().toISOString(),
  };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    await db
      .insert(User)
      .values({
        ...user,
        password: hashedPassword,
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
  .alias("help", "h")
  .parse(process.argv.slice(2));

(async () => {
  if (!argv.email || !argv.password || !argv.username) {
    console.log("Please provide an email, password and username.");
    process.exit(1);
  }

  await createAdmin(argv.email, argv.password, argv.username);
})();
