"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/general/form/Form";
import { useForm } from "react-hook-form";
import z from "zod";
import { SignInSchema } from "@/db/schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/general/Input";
import { authenticate } from "@/db/actions/account/sign-in";
import Button from "@/components/general/Button";
import {
  IconAsterisk,
  IconClearAll,
  IconLogin,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });
  const router = useRouter();
  const handleFormSubmit = async (fields: z.infer<typeof SignInSchema>) => {
    const request = new FormData();
    request.append("email", fields.email);
    request.append("password", fields.password);
    const error = await authenticate(undefined, request);
    if (error) toast.error(error);
    router.push("/menaxhimi");
  };
  return (
    <section className={"relative size-full"}>
      <Image
        src={"/images/account-background.png"}
        alt={""}
        fill
        className={
          "absolute bottom-0 right-0 w-full hue-rotate-60 transition-all duration-500 dark:hue-rotate-0"
        }
        sizes={"100%"}
      />
      <div
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        <div
          className={
            "m-auto max-w-2xl rounded-xl border bg-popover p-6 shadow-inner shadow-foreground/20"
          }
        >
          <span>Shkolla:</span>

          <h1 className={"text-5xl font-bold"}>Hermann Gmeiner</h1>
          <div className={"relative mx-auto mb-4 w-full"}>
            <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          </div>
          <div>
            <h3>
              Paneli i menaxhimit te shkollës profesionale për Programim dhe
              Inxhinieri Software-sh, mirëserdhet!
            </h3>
            <hr className={"mb-2 mt-3 border-foreground bg-foreground"} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className={"flex flex-col gap-2"}
            >
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor={"email"}>Email</FormLabel>
                      <FormControl>
                        <Input
                          StartDecorator={IconMail}
                          {...field}
                          id={"email"}
                          className={"bg-background"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name={"email"}
              />
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor={"password"}>Fjalëkalim</FormLabel>
                      <FormControl>
                        <Input
                          StartDecorator={IconAsterisk}
                          {...field}
                          id={"password"}
                          type={"password"}
                          className={"bg-background"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name={"password"}
              />
              <div className={"ml-auto flex items-center gap-2"}>
                <Button
                  variant={"icon"}
                  onClick={() => form.reset()}
                  type={"button"}
                >
                  <IconClearAll />
                </Button>
                <Button variant={"default"} className={"w-fit"} type={"submit"}>
                  <IconLogin />
                  Kyçu
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default Page;
