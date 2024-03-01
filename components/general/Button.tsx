import { type HTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cva, VariantProps } from "class-variance-authority";

type ButtonProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

// eslint-disable-next-line tailwindcss/no-contradicting-classname
const buttonStyles = cva(
  "inline-flex h-12 items-center justify-center overflow-hidden whitespace-nowrap rounded-xl text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-glassy-light dark:bg-glassy-dark animate-shimmer items-center justify-center border  border-slate-800 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        secondary:
          "dark:bg-metallic-light bg-metallic-dark border border-foreground bg-center transition-all duration-500 ease-in-out hover:bg-[length:200%_200%]",
        border:
          "relative overflow-hidden !rounded-full p-0.5 transition-shadow duration-500 ease-in-out  hover:shadow-top focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ",
        default:
          "overflow-hidden border-primary-background bg-primary-background p-0 text-primary-foreground shadow-md ring-1 ring-primary/10 transition-colors duration-500 hover:bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const contentStyles = cva(" h-full px-6 py-3 text-background", {
  variants: {
    variant: {
      primary:
        "text-foreground shadow-inner shadow-background/40 backdrop-blur-md transition-all duration-500 ease-in-out hover:backdrop-blur-lg",
      secondary: "shadow-inner shadow-[#919191]",
      border:
        "inline-flex size-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white shadow-inner shadow-white/40 backdrop-blur-3xl",
      default:
        "flex size-full items-center text-white shadow-inner shadow-white/40 backdrop-blur-xl",
    },
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component ref={ref} {...props} className={buttonStyles({ variant })}>
        {variant === "border" && (
          <span
            aria-hidden
            aria-description={"decoration"}
            className={
              "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary-foreground))_0%,hsl(var(--primary))_50%,hsl(var(--primary-foreground)_/_20)_100%)]"
            }
          />
        )}
        <span className={contentStyles({ variant })}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
