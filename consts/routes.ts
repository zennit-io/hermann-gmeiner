import type { ComponentType } from "react";
//
import {
  Icon3dCubeSphere,
  IconBellBolt,
  IconBook,
  IconHeartHandshake,
  IconHome,
  IconNews,
  IconNotebook,
  IconPinned,
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
        name: "Historia e Shkollës",
        Icon: IconNotebook,
        href: "/historia-e-shkollës",
        description: "Historia e shkollës sonë",
      },
      {
        name: "Partnerët",
        Icon: IconHeartHandshake,
        href: "/partnerët",
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
        href: "/njoftime/të-reja",
        description: "Njoftimet e fundit nga shkolla jonë",
      },
      {
        name: "Vëndet e Lira",
        Icon: IconPinned,
        href: "/njoftime/vënde-të-lira",
        description: "Vëndet e lira te stafit pedagogjik në shkollë",
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
