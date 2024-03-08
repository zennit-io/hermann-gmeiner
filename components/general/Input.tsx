"use client";
import {
  type ComponentType,
  type DetailedHTMLProps,
  forwardRef,
  type InputHTMLAttributes,
  useState,
} from "react";
//
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/lib/cn";
import { TablerIconsProps } from "@tabler/icons-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
//
type InputProps = {
  StartDecorator?: ComponentType<TablerIconsProps>;
  EndDecorator?: ComponentType<TablerIconsProps>;
  onTextChange?: (text: string) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  VariantProps<typeof inputContainerStyles>;
//
const inputContainerStyles = cva(
  "relative flex h-9 items-center rounded-lg border px-1.5 focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      variant: {
        border: "group/input rounded-lg p-0.5 transition duration-300",
      },
    },
  }
);
const inputDecoratorStyles = cva("relative z-10 size-5", {
  variants: {
    position: {
      start: "mr-1.5",
      end: "ml-auto",
      both: "mx-1.5",
    },
  },
});
const inputStyles = cva(
  "absolute left-1/2 top-1/2 h-full w-[calc(100%-theme(spacing.[1.5]))] -translate-x-1/2 -translate-y-1/2 border-none bg-transparent placeholder:text-muted-foreground focus-visible:outline-none",
  {
    variants: {
      variant: {
        border: `
         flex !size-[calc(100%-theme(spacing.[1]))]
         rounded-md !bg-background px-3 py-2 text-sm text-foreground 
         shadow-input transition 
         duration-500 file:border-0 file:bg-transparent file:text-sm file:font-medium 
         placeholder:text-neutral-400 
         group-hover/input:shadow-none focus-visible:outline-none focus-visible:ring-[2px] 
         focus-visible:ring-neutral-400
         disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder-neutral-600
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600`,
      },
      decoratorPosition: {
        start: "pl-[calc(theme(spacing.[5])+theme(spacing.[1.5]))]",
        end: "pr-[calc(theme(spacing.[5])+theme(spacing.[1.5]))]",
        both: "px-[calc(theme(spacing.[5])+theme(spacing.[1.5]))]",
      },
    },
  }
);
const RADIUS = 100;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      StartDecorator,
      EndDecorator,
      className,
      disabled,
      onTextChange,
      variant,
      ...props
    },
    ref
  ) => {
    if (onTextChange) {
      props = {
        ...props,
        onChange: (e) => onTextChange(e.target.value),
      };
    }
    //
    const [visible, setVisible] = useState(false);
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const decoratorPosition = (
      StartDecorator && EndDecorator
        ? "both"
        : StartDecorator
          ? "start"
          : EndDecorator
            ? "end"
            : undefined
    ) as VariantProps<typeof inputStyles>["decoratorPosition"];
    const isBorder = variant === "border";
    return (
      <motion.div
        className={cn(inputContainerStyles({ disabled, variant }), className)}
        style={
          isBorder
            ? {
                background: useMotionTemplate`
            radial-gradient(
              ${visible ? RADIUS + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary-foreground)),
              transparent 80%
            )
        `,
              }
            : {}
        }
        onMouseMove={isBorder ? handleMouseMove : undefined}
        onMouseEnter={isBorder ? () => setVisible(true) : undefined}
        onMouseLeave={isBorder ? () => setVisible(false) : undefined}
      >
        {StartDecorator && (
          <StartDecorator
            className={inputDecoratorStyles({ position: "start" })}
          />
        )}
        <input
          {...props}
          ref={ref}
          disabled={disabled}
          className={inputStyles({ decoratorPosition, variant })}
        />
        {EndDecorator && (
          <EndDecorator className={inputDecoratorStyles({ position: "end" })} />
        )}
      </motion.div>
    );
  }
);

Input.displayName = "Input";

export default Input;
