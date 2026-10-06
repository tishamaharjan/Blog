import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  message: ReactNode;
  type: ToastType;
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const styles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`flex min-w-[300px] items-center justify-between rounded-lg px-4 py-3 text-white shadow-lg ${styles[type]}`}
      role="alert"
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="ml-4 text-lg font-bold hover:opacity-80"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
