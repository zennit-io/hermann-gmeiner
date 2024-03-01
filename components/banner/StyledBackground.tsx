import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line tailwindcss/no-custom-classname
const backgroundStyles = cva(
  "flex size-full items-center justify-center bg-white dark:bg-black",
  {
    variants: {
      variant: {
        "grid": "bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]",
        "dots": "dark:bg-dots-white/[0.2] bg-dot-black/[0.2]",
        "grid-small":
          "bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]",
      },
    },
    defaultVariants: {
      variant: "grid",
    },
  }
);

type StyledBackgroundProps = {
  className?: string;
} & VariantProps<typeof backgroundStyles>;

function StyledBackground({ className, variant }: StyledBackgroundProps) {
  return (
    <div className={className}>
      <div className={backgroundStyles({ variant })}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div>
    </div>
  );
}

export default StyledBackground;
export type { StyledBackgroundProps };
