import { type ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div className={"size-full pt-20"}>{children}</div>;
};

export default MainLayout;
