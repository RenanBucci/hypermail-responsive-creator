
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const cardVariants = cva(
  "rounded-lg overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
        elevated: "bg-white border border-gray-200 shadow-md hover:shadow-lg",
        flat: "bg-white border border-gray-200",
        colored: "border border-transparent",
        glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-sm",
      },
      size: {
        sm: "p-3",
        default: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 active:translate-y-0",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

export interface ThemeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  asChild?: boolean;
}

const ThemeCard = React.forwardRef<HTMLDivElement, ThemeCardProps>(
  ({ className, variant, size, interactive, headerContent, footerContent, children, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, interactive, className }))}
        ref={ref}
        {...props}
      >
        {headerContent && (
          <div className="px-5 py-3 border-b border-gray-200">
            {headerContent}
          </div>
        )}
        <div className={cn("flex flex-col", !headerContent && !footerContent && "h-full")}>
          {children}
        </div>
        {footerContent && (
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);

ThemeCard.displayName = "ThemeCard";

export { ThemeCard, cardVariants };
