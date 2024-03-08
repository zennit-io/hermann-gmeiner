import type { ComponentType } from "react";
//
import {
  Icon3dCubeSphere,
  IconBellBolt,
  IconBook,
  IconBrandThreejs,
  IconHeartHandshake,
  IconHome,
  IconLuggage,
  IconNews,
  IconNotebook,
  IconPinned,
  IconTrophy,
  TablerIconsProps,
} from "@tabler/icons-react";

type Route = {
  name: string;
  Icon: ComponentType<TablerIconsProps> | null;
  subRoutes?: Route[];
  href?: string;
  description?: string;
};

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
export type { Route };
