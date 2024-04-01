import type { LayoutProps } from "@/types/navigation/LayoutProps";
import { Menu } from "@/components/management/Menu";

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={"flex size-full"}>
      <Menu />
      <section
        className={
          "size-full max-h-full max-w-full overflow-y-auto overflow-x-hidden"
        }
      >
        {children}
      </section>
    </main>
  );
};

export default Layout;
