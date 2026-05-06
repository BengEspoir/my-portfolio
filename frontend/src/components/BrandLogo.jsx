import { useState } from "react";

export default function BrandLogo({ className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-3xl font-extrabold tracking-tight text-brand-500">
        BENG ESPOIR
      </span>
    );
  }

  return (
    <img
      src="/src/assets/logo.png"
      alt="Beng Espoir logo"
      className={["h-30 w-50 object-contain sm:h-20", className].filter(Boolean).join(" ")}
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}
