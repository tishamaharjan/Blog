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
          className="text-sm font-medium text-gray-700 text-left"
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
          border-gray-300
          bg-white
          overflow-hidden
          transition
          focus-within:border-[#738A81]
          focus-within:ring-2
          focus-within:ring-[#738A81]/20
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
            outline-none
            border-none

            autofill:bg-transparent
            autofill:shadow-[inset_0_0_0px_1000px_white]
            ${className}
          `}
        />

        {children}
      </div>
    </div>
  );
};

export default Input;
