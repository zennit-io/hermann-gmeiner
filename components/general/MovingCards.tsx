"use client";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import cn from "@/lib/cn";

import { IconCircleArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

type MovingCardProps = {
  image?: string | StaticImageData;
  quote: string;
  name: string;
  title: string;
};
type MovingCardsProps = {
  items: MovingCardProps[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};
const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: MovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
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
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 max-w-7xl", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " min-w-1/4 flex h-full w-full min-w-full shrink-0 flex-nowrap gap-0.5 sm:min-w-[unset] sm:gap-4",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map(({ name, quote, title, image }) => (
          <li
            className="group relative max-w-full shrink-0 overflow-hidden transition-all duration-500 hover:z-[1000] hover:scale-[110%] hover:shadow-top sm:rounded-md"
            style={{
              width: `calc((100% / ${items.length}) - 1rem)`,
            }}
            key={name}
          >
            {image ? (
              <div
                className={
                  "relative size-full overflow-hidden transition-transform "
                }
              >
                <Image
                  src={image}
                  alt={name}
                  width={0}
                  height={0}
                  sizes={"100%"}
                  className={
                    "aspect-video h-full transition-all duration-500 group-hover:brightness-[30%]"
                  }
                />
                <div
                  className={
                    "absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2"
                  }
                >
                  <h3
                    className={
                      "absolute left-1 top-1 flex w-full translate-y-3 items-center justify-between pr-2 text-base font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    }
                  >
                    <span className={"max-w-[80%] truncate"}>{title}</span>
                    <Link href={"/projektet/1"}>
                      <IconCircleArrowUpRight
                        size={16}
                        className={
                          "stroke-white transition-all duration-300 hover:rotate-45 hover:stroke-primary-foreground"
                        }
                      />
                    </Link>
                  </h3>

                  <h5
                    className={
                      "absolute bottom-1 left-1 line-clamp-3 translate-y-3 pr-1 text-[6px] font-[300] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 "
                    }
                  >
                    {quote}
                  </h5>
                </div>
              </div>
            ) : (
              <blockquote>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-0.5 -top-0.5 z-[-1]"
                ></div>
                <span className=" relative z-20 text-[8px] leading-tight text-gray-100">
                  {quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className=" text-xs font-normal text-gray-400">
                      {name}
                    </span>
                    <span className=" text-xs font-normal text-gray-400">
                      {title}
                    </span>
                  </span>
                </div>
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovingCards;
export type { MovingCards, MovingCardsProps };
