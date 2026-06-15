import { useEffect, useRef } from "react";
import Button from "./Button";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel
}) {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousActiveElement = document.activeElement;
    confirmButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <h2 id="confirm-dialog-title" className="text-xl font-bold text-slate-900">
          {title}
        </h2>
        {message ? (
          <p id="confirm-dialog-description" className="mt-3 text-sm leading-6 text-slate-600">
            {message}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
            className={destructive ? "!bg-red-600 hover:!bg-red-700" : ""}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
