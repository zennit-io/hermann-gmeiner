import { SpotlightFX } from "@/components/fx/SpotlightFX";
import { ArticlePreview } from "@/components/home/ArticlePreview";
import { getAllArticles } from "@/db/actions/article/get-all-articles";
import { HermannGmeiner3D } from "@/components/fx/HermannGmeiner3D";

const Page = async () => {
  const articles = await getAllArticles({ page: 1 });
  return (
    <main className={"flex flex-col"}>
      <section
        className={"flex flex-wrap gap-2 *:w-[calc((100%/4)-theme(spacing.2))]"}
      >
        {articles.map((data, i) => (
          <ArticlePreview {...data} key={i} />
        ))}
      </section>
      <section
        className={
          "m-auto -mb-80 flex h-[600px] w-full items-center justify-center overflow-hidden"
        }
      >
        <SpotlightFX className={"-top-40 left-0 md:-top-20 md:left-60"} />
        <HermannGmeiner3D />
      </section>
      <Footer />
    </main>
  );
};
export default Page;

const Footer = () => {
  return (
    <footer
      className={
        "relative flex min-h-64 w-full items-center rounded-t-xl border border-foreground/25 bg-transparent shadow-xl backdrop-blur-2xl"
      }
    >
      <span className={"text-foreground"}>Hello</span>
    </footer>
  );
};
