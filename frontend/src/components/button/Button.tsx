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
    primary: "bg-[#819A91] text-white",
    add: "bg-[#738a81] text-white",
    secondary: "bg-gray-200 text-gray-800",
    danger: "bg-red-500 text-white",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "p-1",
    lg: "px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-[5px]
        mt-3
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
