import { HTMLAttributes } from "react";
//
import { cva, type VariantProps } from "class-variance-authority";
//
import cn from "@/lib/cn";

const badgeStyle = cva(
  "rounded-full inline-flex items-center rounded-full border px-2.5 py-0.5 text-xss transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = {} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeStyle>;

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeStyle({ variant }), className)} {...props} />;
};

export default Badge;
export type { BadgeProps };
