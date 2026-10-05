type ButtonVariant = "primary" | "add" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) => {
  const variantStyles = {
    primary:
      "bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] focus:ring-[var(--color-button)]/30",

    add: "bg-[var(--color-add-button)] text-white hover:bg-[var(--color-add-button-hover)] focus:ring-[var(--color-add-button)]/30",

    secondary:
      "bg-[var(--color-secondary-button)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-button-hover)] focus:ring-[var(--color-secondary-button)]/50",

    danger:
      "bg-[var(--color-danger-button)] text-white hover:bg-[var(--color-danger-button-hover)] focus:ring-[var(--color-danger-button)]/30",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        w-full
        rounded-lg
        font-medium
        transition-all
        duration-200
        shadow-sm
        hover:shadow
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:shadow-none
        disabled:active:scale-100
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
