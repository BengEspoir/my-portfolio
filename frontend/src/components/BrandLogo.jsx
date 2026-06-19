import { useState } from "react";
import { getPublicUrl } from "../utils/supabase";

export default function BrandLogo({ className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-3xl font-extrabold tracking-tight text-brand-500">
        <span translate="no">
        BENG ESPOIR
        </span>
      </span>
    );
  }

  return (
    <img
      src={getPublicUrl("images/logo.png")}
      alt="Beng Espoir logo"
      className={["h-30 w-50 object-contain sm:h-20", className].filter(Boolean).join(" ")}
      loading="eager"
      translate="no"
      onError={() => setFailed(true)}
    />
  );
}
