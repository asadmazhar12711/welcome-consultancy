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
        "bg-gold-fill text-theme-on-gold shadow-gold hover:shadow-gold-lg hover:brightness-[1.06] hover:-translate-y-0.5",
      outline:
        "border border-elevated bg-fill text-theme-primary hover:-translate-y-0.5 hover:border-gold hover:bg-fill-hover",
      ghost: "text-theme-secondary hover:bg-fill hover:text-theme-primary",
      secondary:
        "bg-elevated text-theme-primary border border-subtle hover:-translate-y-0.5 hover:border-elevated hover:bg-fill-hover",
    };

    const sizes: Record<string, string> = {
      default: "h-11 px-5 text-sm",
      sm: "h-9 px-3.5 text-sm",
      lg: "h-12 px-7 text-base",
      icon: "h-11 w-11",
    };

    const compClassName = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:pointer-events-none disabled:opacity-50 disabled:translate-y-0 active:scale-[0.97] active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      const { children: _childNode, ...restProps } = props;
      const child = props.children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...restProps,
        className: `${compClassName} ${child.props.className || ""}`,
        ref: ref as React.Ref<HTMLElement>,
      } as never);
    }

    return <button ref={ref} className={compClassName} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
