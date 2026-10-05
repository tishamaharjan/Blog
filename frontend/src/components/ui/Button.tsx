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
      "bg-[#819A91] text-white hover:bg-[#718A80] focus:ring-[#819A91]/30",
    add: "bg-[#738A81] text-white hover:bg-[#627A71] focus:ring-[#738A81]/30",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300/50",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/30",
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
