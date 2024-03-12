"use client";
import {
  type ComponentPropsWithoutRef,
  ComponentType,
  type ElementRef,
  forwardRef,
} from "react";
//
import * as SwitchPrimitives from "@radix-ui/react-switch";
//
import cn from "@/lib/cn";
//
type RequiredSwitchIconProps = { className?: string; stroke?: number } & any;
type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  thumbClassName?: string;
  OnIcon?: ComponentType<RequiredSwitchIconProps>;
  OffIcon?: ComponentType<RequiredSwitchIconProps>;
};
const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      thumbClassName,
      OnIcon,
      OffIcon,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => (
    <SwitchPrimitives.Root
      checked={checked}
      defaultChecked={defaultChecked}
      className={cn(
        "data-[state=checked]:bg-metallic-light data-[state=unchecked]:bg-metallic-dark peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border shadow-sm transition-transform duration-500 data-[state=checked]:border-background/20 data-[state=unchecked]:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        defaultChecked={defaultChecked}
        className={cn(
          "data-[state=checked]:bg-metallic-dark data-[state=unchecked]:bg-metallic-light group pointer-events-none relative block size-4 rounded-full border shadow-inner  shadow-white/20 ring-0 transition-all duration-500 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:border-foreground/20 data-[state=unchecked]:border-background/20",

          thumbClassName
        )}
      >
        {OnIcon && (
          <OnIcon
            stroke={1.5}
            className={
              "absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 transition-opacity [.group[data-state=checked]_&]:opacity-0 [.group[data-state=unchecked]_&]:stroke-foreground  [.group[data-state=unchecked]_&]:opacity-100"
            }
          />
        )}
        {OffIcon && (
          <OffIcon
            stroke={1.5}
            className={
              "absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 transition-opacity [.group[data-state=checked]_&]:stroke-foreground [.group[data-state=checked]_&]:opacity-100 [.group[data-state=unchecked]_&]:opacity-0"
            }
          />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
export type { SwitchProps };
