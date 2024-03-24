import { type ReactNode, useEffect, useState } from "react";

export type ClientOnlyProps = {
  children: ReactNode;
};
export const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <>{children}</> : null;
};
