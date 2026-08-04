import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const variants: Record<string, string> = {
      default:
        "bg-gold-fill text-theme-on-gold shadow-gold hover:brightness-110",
      outline:
        "border border-elevated bg-fill text-theme-primary hover:border-strong hover:bg-fill-hover",
      ghost: "text-theme-secondary hover:bg-fill hover:text-theme-primary",
      secondary:
        "bg-elevated text-theme-primary border border-subtle hover:bg-fill-hover",
    };

    const sizes: Record<string, string> = {
      default: "h-11 px-5 text-sm",
      sm: "h-9 px-3.5 text-sm",
      lg: "h-12 px-7 text-base",
      icon: "h-11 w-11",
    };

    const compClassName = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...props,
        className: `${compClassName} ${child.props.className || ""}`,
        ref: ref as React.Ref<HTMLElement>,
      } as never);
    }

    return <button ref={ref} className={compClassName} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
