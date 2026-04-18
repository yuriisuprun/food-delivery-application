import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-dark)]",
        secondary:
          "border-transparent bg-[color:var(--secondary)] text-white hover:bg-[color:var(--warning)]",
        destructive:
          "border-transparent bg-[color:var(--danger)] text-white hover:brightness-90",
        outline: "border-[color:var(--line)] text-[color:var(--fg1)] bg-transparent hover:bg-[color:var(--bg1)]",
        success: "border-transparent bg-[color:var(--success)] text-white",
        warning: "border-transparent bg-[color:var(--warning)] text-white",
        info: "border-transparent bg-[color:var(--info)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };