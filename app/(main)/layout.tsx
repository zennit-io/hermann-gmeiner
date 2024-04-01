import { type ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div
      className={
        "size-full max-h-full max-w-full overflow-y-auto overflow-x-hidden pt-20"
      }
    >
      {children}
    </div>
  );
};

export default MainLayout;
