"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
//
import NavigationMenu, {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
} from "@/components/general/NavigationMenu";
import Switch from "@/components/general/Switch";
import Button from "@/components/general/Button";
//
import {
  IconBrandGithub,
  IconMenu2,
  IconMoonStars,
  IconSun,
} from "@tabler/icons-react";
//
import ROUTES, { Route } from "@/consts/routes";
import { useMediaQuery } from "@/components/general/credeza/use-media-query";
import { screens } from "@/tailwind-globals";
import { Sheet, SheetContent, SheetTrigger } from "@/components/general/Sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/general/Accordion";

const MobileNavigationAccordion = ({ name, subRoutes, Icon }: Route) => {
  return (
    <AccordionItem value={name} key={name} className={"pt-2"}>
      <AccordionTrigger className={"my-1 p-0 text-sm first:mt-0 last:mb-0"}>
        <span className={"mb-1 flex items-center gap-2"}>
          {Icon && <Icon size={16} />}
          {name}
        </span>
      </AccordionTrigger>
      <AccordionContent className={"space-y-1 p-2"}>
        {subRoutes!.map(({ name, href, Icon, subRoutes }) =>
          subRoutes ? (
            <MobileNavigationAccordion
              name={name}
              subRoutes={subRoutes}
              Icon={Icon}
              key={name}
            />
          ) : (
            <Link
              href={href!}
              key={name}
              className={"my-1 flex items-center gap-2 first:mt-0 last:mb-0"}
            >
              {Icon && <Icon size={16} />}
              {name}
            </Link>
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
const MobileNavbar = () => {
  const themeProvider = useTheme();
  const isChecked = themeProvider.theme === "dark";
  return (
    <Sheet>
      <div
        className={
          "absolute right-0 top-3 z-50 flex w-full items-center justify-between px-3"
        }
      >
        <SheetTrigger>
          <Button
            variant={"icon"}
            className={
              "border border-foreground/20 bg-background p-3 shadow-inner hover:bg-background dark:shadow-white/40"
            }
          >
            <IconMenu2 />
          </Button>
        </SheetTrigger>
        <Button variant={"border"}>Apliko</Button>
      </div>
      <SheetContent side={"left"} className={"flex flex-col justify-between"}>
        <div>
          <h2 className={"text-2xl font-semibold"}>Hermann Gmeiner</h2>
          <hr className={"mb-4"} />
          <Accordion type={"multiple"}>
            {ROUTES.map(({ name, subRoutes, href, Icon }) => {
              if (subRoutes)
                return (
                  <MobileNavigationAccordion
                    key={name}
                    subRoutes={subRoutes}
                    Icon={Icon}
                    name={name}
                    href={name}
                  />
                );
              return (
                <Link
                  href={href!}
                  key={name}
                  className={
                    "my-1 flex items-center gap-2 py-1 text-sm first:mt-0 last:mb-0"
                  }
                >
                  {Icon && <Icon size={16} />}
                  {name}
                </Link>
              );
            })}
          </Accordion>
        </div>
        <div className={"flex items-center justify-between"}>
          <Switch
            OnIcon={IconSun}
            OffIcon={IconMoonStars}
            checked={isChecked}
            onCheckedChange={(checked) => {
              themeProvider.setTheme(checked ? "dark" : "light");
            }}
          />
          <Button variant={"border"}>
            Shiko kodin ne <IconBrandGithub />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
const DesktopNavbar = () => {
  const themeProvider = useTheme();
  const [isChecked, setIsChecked] = useState(themeProvider.theme === "dark");
  useEffect(() => {
    if (themeProvider.theme) setIsChecked(themeProvider.theme === "dark");
  }, [themeProvider.theme]);
  return (
    <div
      className={
        "absolute left-1/2 top-3 z-50 flex w-full -translate-x-1/2 items-center px-2"
      }
    >
      <Switch
        OnIcon={IconSun}
        OffIcon={IconMoonStars}
        checked={isChecked}
        onCheckedChange={(checked) => {
          themeProvider.setTheme(checked ? "dark" : "light");
        }}
      />
      <NavigationMenu className={"mx-auto"}>
        <NavigationMenuList>
          {ROUTES.map(({ name, subRoutes, href, Icon }) => (
            <NavigationMenuItem key={name}>
              {subRoutes ? (
                <Fragment key={name}>
                  <NavigationMenuTrigger
                    startDecorator={Icon && <Icon size={20} />}
                  >
                    {name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {subRoutes.map(({ name, href, description, Icon }) => (
                        <NavigationMenuListItem
                          key={name}
                          title={name}
                          href={href}
                          startDecorator={Icon && <Icon size={20} />}
                        >
                          {description}
                        </NavigationMenuListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </Fragment>
              ) : (
                <Link href={href!} legacyBehavior passHref>
                  <NavigationMenuLink
                    startDecorator={Icon && <Icon size={20} />}
                  >
                    {name}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button variant={"border"}>Apliko</Button>
    </div>
  );
};
export const Navbar = () => {
  const isMobile = useMediaQuery(`(max-width: ${screens.xs})`);
  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};
