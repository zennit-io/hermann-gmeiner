import type { LayoutProps } from "@/types/navigation/LayoutProps";
import { Menu } from "@/components/management/Menu";

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={"flex size-full"}>
      <Menu />
      {children}
    </main>
  );
};

export default Layout;
