"use client";
import {
  ComponentType,
  Fragment,
  type ReactNode,
  useEffect,
  useState,
} from "react";

export type ClientOnlyProps = {
  children: ReactNode;
  Component?: ComponentType<any>;
} & Record<string, any>;
export const ClientOnly = ({
  children,
  Component = Fragment,
  ...props
}: ClientOnlyProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <Component {...props}>{children}</Component> : null;
};
