import React from "react";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/general/Tooltip";
import { PRIVATE_ROUTES, type Route } from "@/consts/routes";
import { cva } from "class-variance-authority";
import Link from "next/link";

const MenuItem = ({ Icon, name, href }: Omit<Route, "subRoutes">) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger className={"rounded-full bg-foreground/80 p-1.5"}>
        <Link href={href ?? "/menaxhimi"}>
          {Icon && <Icon className={"size-5 text-background"} stroke={1.5} />}
        </Link>
      </TooltipTrigger>
      <TooltipContent side={"right"}>{name}</TooltipContent>
    </Tooltip>
  );
};
const menuItemStyles = cva("flex flex-col items-center gap-2 rounded-full", {
  variants: {
    visible: {
      true: "bg-primary-foreground/80 p-1 py-1.5",
    },
  },
});
export const Menu = () => {
  return (
    <TooltipProvider>
      <section
        className={
          "m-2 mt-0 flex h-[calc(100%-theme(spacing.2))] w-14 flex-col items-center gap-3 rounded-xl border bg-popover px-3 py-4 text-slate-800 shadow-inner shadow-white dark:shadow-white/40"
        }
      >
        <IconSettings className={"size-7 text-foreground"} stroke={1.5} />
        <hr className={"w-full rounded-lg border-foreground bg-foreground"} />
        {PRIVATE_ROUTES.map(({ subRoutes, ...route }, i) => (
          <div
            key={i}
            className={menuItemStyles({
              visible: (subRoutes?.length ?? 0) > 0,
            })}
          >
            <MenuItem {...route} />
            {subRoutes?.map((route, i) => <MenuItem {...route} key={i} />)}
          </div>
        ))}
        <Tooltip>
          <TooltipTrigger
            className={"mt-auto rounded-full bg-red-400/80 p-2  text-red-950"}
          >
            <IconLogout className={"size-5"} stroke={1.5} />
          </TooltipTrigger>
          <TooltipContent side={"right"}>Shkyçu</TooltipContent>
        </Tooltip>
      </section>
    </TooltipProvider>
  );
};
