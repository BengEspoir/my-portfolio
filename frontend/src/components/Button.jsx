import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { createMagneticHandlers, hoverLift, magneticButton } from "../animations/motion";

const variantStyles = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  cta: "bg-secondary-500 text-white hover:bg-secondary-600",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:border-brand-200 hover:text-brand-600",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  dark: "bg-slate-900 text-white hover:bg-slate-800"
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-base"
};

function buildClassName(variant, size, className) {
  return [
    "inline-flex items-center justify-center rounded-xl font-semibold transition-transform duration-300",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className
  ]
    .filter(Boolean)
    .join(" ");
}

function chainHandlers(...handlers) {
  return (event) => {
    handlers.forEach((handler) => {
      if (typeof handler === "function") handler(event);
    });
  };
}

const Button = forwardRef(function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  style,
  type = "button",
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onBlur,
  disabled = false,
  ...props
}, ref) {
  const useMagnetic = (variant === "primary" || variant === "cta") && !disabled;
  const magneticHandlers = createMagneticHandlers(useMagnetic);
  const classes = buildClassName(
    variant,
    size,
    [className, useMagnetic ? `${hoverLift} ${magneticButton}` : ""].join(" ")
  );
  const sharedProps = {
    ...props,
    className: classes,
    style,
    onMouseEnter: chainHandlers(magneticHandlers.onMouseEnter, onMouseEnter),
    onMouseMove: chainHandlers(magneticHandlers.onMouseMove, onMouseMove),
    onMouseLeave: chainHandlers(magneticHandlers.onMouseLeave, onMouseLeave),
    onMouseDown: chainHandlers(magneticHandlers.onMouseDown, onMouseDown),
    onMouseUp: chainHandlers(magneticHandlers.onMouseUp, onMouseUp),
    onBlur: chainHandlers(magneticHandlers.onBlur, onBlur)
  };

  if (to) {
    return (
      <Link to={to} ref={ref} {...sharedProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} ref={ref} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} ref={ref} {...sharedProps}>
      {children}
    </button>
  );
});

export default Button;
