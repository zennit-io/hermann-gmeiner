import { getAllArticles } from "@/db/actions/article/get-all-articles";
import { ArticlePreview } from "@/components/home/ArticlePreview";
import { getAllTags } from "@/db/actions/article/get-all-tags";
import { Badge } from "@/components/general/Badge";
import { type SearchParamProps } from "@/types/navigation/SearchParamProps";
import { Input } from "@/components/general/Input";
import { IconSearch } from "@tabler/icons-react";
import { ProjectsGlobe } from "@/components/home/ProjectsGlobe";
import { RevealFX } from "@/components/fx/RevealFX";
import { Separator } from "@/components/general/Separator";
import Link from "next/link";
import Image from "next/image";
import { TechnologiesCarousel } from "@/components/banner/TechnologiesCarousel";

const ProjectsPage = async ({
  searchParams,
}: SearchParamProps<["kategoria", "faqe"]>) => {
  const articles = await getAllArticles({ page: 1 });
  const tags = await getAllTags();
  console.log(searchParams.kategoria);
  return (
    <section className={"relative -mt-20 h-screen w-full "}>
      <section
        className={
          "relative z-10 mb-8 grid h-full grid-cols-6 grid-rows-6 justify-between gap-4 p-6 pt-20"
        }
      >
        <Image
          src={"/images/account-background.png"}
          alt={""}
          fill
          className={
            "absolute bottom-0 right-0 -z-10 w-full opacity-30 hue-rotate-60 transition-all duration-500 dark:hue-rotate-0"
          }
          sizes={"100%"}
        />
        <div
          className={
            "relative col-span-3 row-span-4 h-full overflow-hidden rounded-xl border border-border  bg-black shadow-inner shadow-white dark:shadow-white/40"
          }
        >
          <RevealFX
            animationSpeed={5}
            containerClassName={"bg-transparent"}
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
            dotSize={2}
          />
          <div
            className={
              "absolute left-0 top-0 flex size-full flex-col items-center justify-center "
            }
          >
            <h3 className={"text-8xl font-bold text-primary-foreground"}>
              100 +
            </h3>
            <h5 className={"text-lg text-primary-foreground"}>
              Të lanchuara dhe në përdorim në treg
            </h5>
          </div>
        </div>
        <div
          className={
            "col-span-1 row-span-2 flex h-full flex-col justify-center rounded-xl border border-border bg-background p-8 shadow-inner shadow-white dark:shadow-white/40"
          }
        >
          <h3
            className={
              "inline-block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-5xl font-bold text-transparent "
            }
          >
            42
          </h3>
          <h5
            className={
              "mb-4 inline-block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
            }
          >
            Nxënes
          </h5>
          <h5 className={"font-mono text-xs text-foreground/40"}>
            Të diplomuar këtë vit dhe të punësuar brenda të njëjtit vit
          </h5>
        </div>
        <div
          className={
            "col-span-2 row-span-2 flex h-full flex-col justify-center rounded-xl border border-border bg-card/60 p-8 shadow-inner shadow-white backdrop-blur-lg dark:shadow-white/40"
          }
        >
          <h3
            className={
              "inline-block bg-gradient-to-r from-primary-background to-primary bg-clip-text text-5xl font-bold text-transparent "
            }
          >
            20+
          </h3>
          <h5
            className={
              "mb-4 inline-block bg-gradient-to-r from-primary-background to-primary bg-clip-text text-transparent"
            }
          >
            Biznese Partnere
          </h5>
          <h5 className={"font-mono text-xs text-foreground/40"}>
            Brenda dhe jashtë vendit që ofrojnë praktika profesionale dhe
            punësim
          </h5>
        </div>
        <div
          className={
            "relative col-span-2 row-span-4 overflow-hidden rounded-xl border border-border bg-card/30 shadow-inner shadow-white backdrop-blur-lg dark:shadow-white/40"
          }
        >
          <div
            className={
              "absolute left-0 top-6 flex w-full flex-col items-center p-4"
            }
          >
            <h3
              className={
                "inline-block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-5xl font-bold text-transparent"
              }
            >
              1000+
            </h3>
            <h3
              className={
                "mb-4 inline-block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-xl text-transparent"
              }
            >
              Nxënës
            </h3>
            <h5 className={"text-center font-mono text-xs text-foreground/40"}>
              Që kanë vazhduar studimet jashtë vendit pas diplomimit në shkollën
              tonë
            </h5>
          </div>
          <ProjectsGlobe />
        </div>
        <div
          className={
            "col-span-1 row-span-2 h-full rounded-xl border border-white/40 bg-white/40 p-8 text-black shadow-inner shadow-white backdrop-blur-lg dark:shadow-white/40"
          }
        >
          <Image
            src={"/images/projects-banner-1.png"}
            alt={""}
            sizes={"100%"}
            width={0}
            height={0}
            className={"h-auto w-full"}
          />
          <h3 className={"text-center font-mono text-sm"}>
            <span
              className={
                "inline-block bg-gradient-to-r from-primary-foreground to-primary bg-clip-text font-bold text-transparent"
              }
            >
              Programim
            </span>{" "}
            &{" "}
            <span
              className={
                "inline-block bg-gradient-to-r from-primary-background to-primary bg-clip-text font-bold text-transparent"
              }
            >
              Inxhinieri Softwaresh
            </span>
          </h3>
        </div>

        <div
          className={
            "relative isolate col-span-3 row-span-2 flex h-full flex-col overflow-hidden rounded-xl border border-border bg-primary-foreground/20 p-8 shadow-inner  shadow-white backdrop-blur-2xl dark:shadow-white/40"
          }
        >
          <h3
            className={
              "inline-block text-5xl font-bold text-primary-foreground "
            }
          >
            10+
          </h3>
          <h3
            className={
              "mb-4 inline-block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-xl text-transparent"
            }
          >
            Teknologji Moderne
          </h3>
          <h5 className={"w-1/2 font-mono text-xs text-foreground/40"}>
            Të para në tregun kombëtar dhe nënkombëtar dhe që ne trajtojmë në
            kurrikulën tonë
          </h5>
          <div
            className={
              "absolute -right-44 bottom-0 flex w-full -rotate-45 flex-col gap-3"
            }
          >
            <TechnologiesCarousel />
            <TechnologiesCarousel direction={"right"} />
            <TechnologiesCarousel />
          </div>
        </div>
        <div
          className={
            "col-span-1 row-span-2 h-full rounded-xl border border-white/40 bg-primary/40 p-8 text-black shadow-inner shadow-white backdrop-blur-lg dark:shadow-white/40"
          }
        >
          40 nxenes
        </div>
      </section>
      <section className={"flex flex-col gap-2 p-6"}>
        <div className={"justify-betweent flex"}>
          <div className={"flex items-center justify-between"}>
            <div
              className={
                "flex items-end gap-2 overflow-x-auto overflow-y-hidden"
              }
            >
              <span className={"mr-2"}>Kategoritë:</span>
              {[{ name: "Te gjitha", id: "te-gjitha" }, ...tags].map(
                ({ name, id }) => {
                  const isActive =
                    name === "Te gjitha"
                      ? searchParams.kategoria === "Te gjitha" ||
                        searchParams.kategoria === undefined
                      : searchParams.kategoria === name;
                  return (
                    <Link key={id} href={`?kategoria=${name}`}>
                      <Badge
                        variant={isActive ? "default" : "secondary"}
                        className={"text-sm"}
                      >
                        {name}
                      </Badge>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
          <div className={"mb-0.5 flex items-center gap-2"}>
            <Input className={"w-80"} placeholder={"Kërko këtu..."} />
            <div
              className={
                "flex aspect-square h-10 items-center justify-center rounded-lg border border-border bg-transparent"
              }
            >
              <IconSearch size={20} />
            </div>
          </div>
        </div>
        <Separator />
        <section
          className={
            "flex w-full flex-wrap gap-2 *:w-[calc((100%/4)-theme(spacing.2))]"
          }
        >
          <h2 className={"my-8 text-5xl font-bold"}>
            {searchParams.kategoria?.toString()}
          </h2>
          {articles.map((data, i) => (
            <ArticlePreview {...data} key={i} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default ProjectsPage;
