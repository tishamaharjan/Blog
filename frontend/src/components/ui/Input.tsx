type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  children?: React.ReactNode;
};

const Input = ({ label, children, className = "", ...props }: InputProps) => {
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
        className="
          h-11
          w-full
          flex
          items-center
          rounded-lg
          border
          border-[var(--color-input-border)]
          bg-[var(--color-input-bg)]
          overflow-hidden
          transition
          focus-within:border-[var(--color-secondary)]
          focus-within:ring-2
          focus-within:ring-[var(--color-secondary)]/20
        "
      >
        <input
          {...props}
          className={`
            h-full
            flex-1
            min-w-0
            px-3
            bg-transparent
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-muted)]
            outline-none
            border-none

            autofill:bg-[var(--color-input-bg)]
            autofill:text-[var(--color-text-primary)]

            [-webkit-text-fill-color:var(--color-text-primary)]
            [-webkit-box-shadow:0_0_0px_1000px_var(--color-input-bg)_inset]

            ${className}
          `}
        />

        {children}
      </div>
    </div>
  );
};

export default Input;
