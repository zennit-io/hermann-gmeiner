"use client";
import { Fragment } from "react";
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
import { IconMoonStars, IconSun } from "@tabler/icons-react";
//
import ROUTES from "@/consts/routes";

export function Navbar() {
  const themeProvider = useTheme();
  const isChecked = themeProvider.theme === "dark";
  console.log("parent-check", isChecked);
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
}

export default Navbar;
