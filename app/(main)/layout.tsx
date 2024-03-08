import { type ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div className={"pt-20"}>{children}</div>;
};

export default MainLayout;
