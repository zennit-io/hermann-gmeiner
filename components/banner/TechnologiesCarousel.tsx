"use client";
import { Badge } from "../general/Badge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/cn";
import { useCallback, useEffect, useRef } from "react";

type TechnologiesCarouselProps = {
  className?: string;
  direction?: "left" | "right";
};
export const TechnologiesCarousel = ({
  className,
  direction = "left",
}: TechnologiesCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      containerRef.current.style.setProperty("--animation-duration", "40s");
    }
  }, [getDirection]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      ref={containerRef}
    >
      <ul
        ref={scrollerRef}
        className={
          "flex size-full min-w-full shrink-0 animate-scroll flex-nowrap  gap-4 sm:min-w-[unset]"
        }
      >
        {TECHNOLOGIES.map(({ link, name, image }) => (
          <li
            key={name}
            className="group relative max-w-full shrink-0 overflow-hidden rounded-md transition-all duration-500"
          >
            <Link href={link} key={name}>
              <Badge className={"flex h-12 items-center gap-1 p-2"}>
                <div
                  className={
                    "flex aspect-square h-full w-auto items-center justify-center rounded-full bg-white p-1"
                  }
                >
                  <Image
                    sizes={"100%"}
                    src={`/images/technologies/${image}`}
                    alt={""}
                    width={0}
                    height={0}
                    className={"h-full w-auto "}
                  />
                </div>
                <span className={"font-mono text-lg"}>{name}</span>
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TECHNOLOGIES = [
  {
    link: "",
    name: "HTML",
    image: "html.png",
  },
  {
    link: "",
    name: "CSS",
    image: "css.png",
  },
  {
    link: "",
    name: "JavaScript",
    image: "js.png",
  },
  {
    link: "",
    name: "SQL Server",
    image: "sql-server.png",
  },
  {
    link: "",
    name: "Java",
    image: "java.png",
  },
  {
    link: "",
    name: "C#",
    image: "csh.png",
  },
  {
    link: "",
    name: "C++",
    image: "cpp.png",
  },
  {
    link: "",
    name: "Python",
    image: "python.png",
  },
  {
    link: "",
    name: "Kotlin",
    image: "kotlin.png",
  },
  {
    link: "",
    name: "React.js",
    image: "react.png",
  },
];
