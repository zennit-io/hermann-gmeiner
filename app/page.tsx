"use client";
//
import MovingCards from "@/components/general/MovingCards";
import StyledBackground from "@/components/banner/StyledBackground";
import SpotlightFX from "@/components/fx/SpotlightFX";
//
import ZennitBadge from "@/icons/ZennitBadge";
import MacbookScroll from "@/components/banner/MacbookScroll";
import { ClientOnly } from "@/components/general/ClientOnly";
import { MutableRefObject, useRef } from "react";
import { ContainerScroll } from "@/components/banner/ContainerScroll";
import { useMediaQuery } from "@/components/general/credeza/use-media-query";
//
const LandingPage = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 400px)");
  return (
    <main
      className={"relative size-full overflow-y-auto overflow-x-hidden"}
      ref={scrollRef}
    >
      <StyledBackground
        className={"absolute left-0 top-0 flex size-full flex-col"}
        variant={"grid-small"}
      />
      <SpotlightFX className={"-top-40 left-0 md:-top-20 md:left-60"} />
      <div className={"relative min-h-screen"}>
        {isMobile ? (
          <MobileHeroSection parentScrollRef={scrollRef} />
        ) : (
          <DesktopHeroSection parentScrollRef={scrollRef} />
        )}
      </div>
    </main>
  );
};
type HeroSectionProps = {
  parentScrollRef: MutableRefObject<HTMLDivElement | null>;
};
const DesktopHeroSection = ({ parentScrollRef }: HeroSectionProps) => {
  return (
    <ClientOnly>
      <MacbookScroll
        title={
          <div className={"relative size-full"}>
            <div className={"flex flex-col"}>
              <h3>
                Shkolla për <span>Programim</span> dhe{" "}
                <span>Inxhinieri Software-sh</span>
              </h3>
              <h1 className={"text-8xl font-bold"}>Hermann Gmeiner</h1>
            </div>
            <div className={"relative mx-auto w-full"}>
              <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
              <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
              <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            </div>
          </div>
        }
        logo={<ZennitBadge width={"48"} />}
        showGradient
        parentRefToScroll={parentScrollRef}
      >
        <div className={"size-full scale-100"}>
          <div
            className={
              "flex size-[200%] origin-center -translate-x-1/4 -translate-y-1/4 -rotate-12 scale-100 flex-col gap-4 overflow-scroll p-2 sm:-rotate-45"
            }
          >
            {projects.map((projectRow, i) => (
              <MovingCards
                items={projectRow}
                key={i}
                className={"grow"}
                speed={"normal"}
                direction={i % 2 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </MacbookScroll>
    </ClientOnly>
  );
};
const MobileHeroSection = ({ parentScrollRef }: HeroSectionProps) => {
  return (
    <ContainerScroll
      parentRefToScroll={parentScrollRef}
      titleComponent={
        <div className={"relative size-full pt-52"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-xs"}>
              Shkolla për <span>Programim</span> dhe{" "}
              <span>Inxhinieri Software-sh</span>
            </h3>
            <h1 className={"text-4xl font-bold"}>Hermann Gmeiner</h1>
          </div>
          <div className={"relative mx-auto w-full"}>
            <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          </div>
        </div>
      }
    >
      <div className={"size-full scale-100"}>
        <div
          className={
            "flex h-[200%] origin-center scale-x-[800%] flex-col gap-3 overflow-scroll p-2 sm:-rotate-45"
          }
        >
          {projects.map((projectRow, i) => (
            <MovingCards
              items={projectRow}
              key={i}
              className={"grow"}
              speed={"normal"}
              direction={i % 2 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </ContainerScroll>
  );
};
const projects = [
  [
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
  ],
  [
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
  ],
  [
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
  ],
  [
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
  ],
  [
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
    {
      image: require("../public/images/project-1.jpeg"),
      quote:
        "Linja e Këshillimit për Gra dhe Vajza vijon realizimin e workshope-ve me të rinjtë. U zhvillua sesioni i rradhë me nxënës të Shkollës së Mesme Profesionale TIK, “Hermann Gmeiner”, gjatë workshop-it  të rinjtë janë ndërgjegjësuar lidhur me rolet gjinore dhe stereotipet me bazë gjinore.",
      name: "Linja e Keshillimit per Gra dhe Vajza",
      title: "Vajzat ne TIK",
    },
  ],
];
export default LandingPage;
