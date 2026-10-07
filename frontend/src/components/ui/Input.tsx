import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  children?: React.ReactNode;
};

const Input = ({
  label,
  children,
  className = "",
  readOnly,
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const isPassword = type === "password";

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-[var(--color-text-primary)] text-left"
        >
          {label}
        </label>
      )}

      <div
        className={`
          h-11
          w-full
          flex
          items-center
          rounded-lg
          overflow-hidden
          transition

          ${
            readOnly
              ? "border-none bg-transparent"
              : `
                border
                border-[var(--color-input-border)]
                bg-[var(--color-input-bg)]
                focus-within:border-[var(--color-secondary)]
                focus-within:ring-2
                focus-within:ring-[var(--color-secondary)]/20
              `
          }
        `}
      >
        <input
          {...props}
          type={inputType}
          readOnly={readOnly}
          className={`
            h-full
            flex-1
            min-w-0
            px-3
            bg-transparent
            outline-none
            border-none

            ${
              readOnly
                ? "text-[var(--color-text-muted)] cursor-default"
                : `
                  text-[var(--color-text-primary)]
                  placeholder:text-[var(--color-text-muted)]

                  autofill:bg-[var(--color-input-bg)]
                  autofill:text-[var(--color-text-primary)]

                  [-webkit-text-fill-color:var(--color-text-primary)]
                  [-webkit-box-shadow:0_0_0px_1000px_var(--color-input-bg)_inset]
                `
            }

            ${className}
          `}
        />

        {isPassword ? (
          <button
            type="button"
            className="h-full w-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Input;
