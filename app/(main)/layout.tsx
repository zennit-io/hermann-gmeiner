import { LayoutProps } from "@/types/navigation/LayoutProps";
import { TrademarkZennit } from "@/icons/TrademarkZennit";
import Button from "@/components/general/Button";
import { IconBrandGithub } from "@tabler/icons-react";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div
      className={
        "relative size-full max-h-full max-w-full overflow-y-auto overflow-x-hidden pt-20"
      }
    >
      {children}
      <div className={"fixed bottom-3 right-3 z-50 flex items-center gap-4"}>
        <Button
          className={
            "aspect-square rounded-full p-0 *:items-center *:justify-center *:p-0"
          }
          variant={"primary"}
        >
          <IconBrandGithub className={"text-white"} />
        </Button>
        <div
          className={
            "flex items-center gap-3 rounded-full bg-gradient-to-r from-[#1D0043] via-[#7D1491] to-[#A21CAF] p-4 shadow-inner shadow-white"
          }
        >
          <span
            className={"whitespace-nowrap text-sm font-semibold text-white/80"}
          >
            Created By
          </span>
          <TrademarkZennit className={"h-5 w-auto invert"} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
