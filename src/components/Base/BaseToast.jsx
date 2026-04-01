import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

const toastStyles = {
  success: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "bi-check-circle-fill text-emerald-600",
  },
  error: {
    wrapper: "border-rose-200 bg-rose-50 text-rose-800",
    icon: "bi-exclamation-octagon-fill text-rose-600",
  },
  info: {
    wrapper: "border-cyan-200 bg-cyan-50 text-cyan-800",
    icon: "bi-info-circle-fill text-cyan-600",
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast,
      ),
    );

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 220);
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const safeType = toastStyles[type] ? type : "info";

      setToasts((prev) => [
        ...prev.slice(-3),
        { id, message, type: safeType, isVisible: false },
      ]);

      window.requestAnimationFrame(() => {
        setToasts((prev) =>
          prev.map((toast) =>
            toast.id === id ? { ...toast, isVisible: true } : toast,
          ),
        );
      });

      window.setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      showSuccess: (message, duration) =>
        showToast(message, "success", duration),
      showError: (message, duration) => showToast(message, "error", duration),
      showInfo: (message, duration) => showToast(message, "info", duration),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[120] flex w-[min(92vw,360px)] flex-col gap-2">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] || toastStyles.info;
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-3 py-3 shadow-lg backdrop-blur transition-all duration-200 ${style.wrapper} ${toast.isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}>
              <i className={`bi ${style.icon} mt-0.5 text-base`} />
              <p className="text-sm font-medium leading-relaxed">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-auto rounded-md px-1 text-slate-500 transition hover:bg-white/60 hover:text-slate-700"
                aria-label="Close toast">
                <i className="bi bi-x-lg text-xs" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
