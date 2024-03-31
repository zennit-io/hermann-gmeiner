import type { ComponentType } from "react";
//
import {
  Icon3dCubeSphere,
  IconBellBolt,
  IconBook,
  IconBrandThreejs,
  IconClipboard,
  IconClipboardPlus,
  IconHeartHandshake,
  IconHome,
  IconLayout,
  IconLuggage,
  IconNews,
  IconNotebook,
  IconPinned,
  IconTrophy,
  IconUserPlus,
  IconUsers,
  TablerIconsProps,
} from "@tabler/icons-react";

type Route = Readonly<{
  name: string;
  Icon: ComponentType<TablerIconsProps> | null;
  subRoutes?: Route[];
  href?: string;
  description?: string;
}>;
const PRIVATE_ROUTES: Route[] = [
  {
    name: "Paneli",
    Icon: IconLayout,
    href: "/menaxhimi",
    description: "Paneli i menaxhimit",
  },
  {
    name: "Stafi",
    Icon: IconUsers,
    href: "/menaxhimi/stafi",
    description: "Menaxhimi i stafit",
    subRoutes: [
      {
        name: "Shto staf",
        Icon: IconUserPlus,
        href: "/menaxhimi/stafi/shto",
        description: "Menaxhimi i artikujve",
      },
    ],
  },
  {
    name: "Menaxho Histori Suksesi",
    Icon: IconTrophy,
    href: "/menaxhimi/histori-suksesi",
    description: "Paneli i menaxhimit",
  },
  {
    name: "Menaxho Vendet e Punës",
    Icon: IconLuggage,
    href: "/menaxhimi/vende-te-lira-pune",
    description: "Paneli i menaxhimit",
  },
  {
    name: "Artikujt",
    Icon: IconClipboard,
    href: "/menaxhimi/artikujt",
    description: "Menaxhimi i artikujve",
    subRoutes: [
      {
        name: "Krijo një artikull",
        Icon: IconClipboardPlus,
        href: "/menaxhimi/artikujt/krijo",
        description: "Menaxhimi i artikujve",
      },
    ],
  },
];
const ROUTES: Route[] = [
  {
    name: "Kreu",
    Icon: IconHome,
    subRoutes: [
      {
        name: "Kreu",
        Icon: IconHome,
        href: "/",
        description: "Kreu i shkollës sonë",
      },
      {
        name: "Historia e Shkollës",
        Icon: IconNotebook,
        href: "/historia-e-shkolles",
        description: "Historia e shkollës sonë",
      },
      {
        name: "Partnerët",
        Icon: IconHeartHandshake,
        href: "/partneret",
        description: "Partnerët e që e bejnë këtë shkollë të suksesshme",
      },
      {
        name: "Kurrikula",
        Icon: IconBook,
        href: "/kurrikula",
        description: "Kurrikula e shkollës",
      },
    ],
  },
  {
    name: "Njoftimet",
    Icon: IconBellBolt,
    subRoutes: [
      {
        name: "Të rejat",
        Icon: IconNews,
        href: "/njoftime/te-reja",
        description: "Njoftimet e fundit nga shkolla jonë",
      },
      {
        name: "Vëndet e Lira",
        Icon: IconPinned,
        href: "/njoftime/vende-te-lira",
        description: "Vëndet e lira te stafit pedagogjik në shkollë",
      },
    ],
  },
  {
    name: "Histori Suksesi",
    Icon: IconTrophy,
    subRoutes: [
      {
        name: "Intershipe / Praktika",
        Icon: IconBrandThreejs,
        href: "/histori-suksesi/intershipe-praktika",
        description: "Histori suksesi dhe praktika nga nxënësit tanë",
      },
      {
        name: "Punësime",
        Icon: IconLuggage,
        href: "/histori-suksesi/punesime",
        description: "Punësimet e nxënësve tanë",
      },
    ],
  },
  {
    name: "Projektet",
    Icon: Icon3dCubeSphere,
    href: "/projektet",
    description: "Projektet nga nxënësit tanë të talentuar",
  },
];

export default ROUTES;
export { PRIVATE_ROUTES };
export type { Route };
