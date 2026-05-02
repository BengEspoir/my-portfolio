import Button from "./Button";
import { FiCheck } from "react-icons/fi";

export default function PricingCard({
  title,
  price,
  description,
  features,
  ctaLabel,
  popular = false
}) {
  return (
    <article
      className={[
        "relative flex h-full flex-col rounded-[2rem] border p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1",
        popular
          ? "z-10 border-4 border-amber-400 bg-white px-9 py-10 text-slate-900 lg:scale-[1.03]"
          : "border-brand-400 bg-gradient-to-b from-brand-500 to-brand-600 text-white"
      ].join(" ")}
    >
      {popular ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 px-5 py-1 text-sm font-semibold text-white shadow-sm">
          Most Popular
        </span>
      ) : null}

      <h3
        className={[
          "text-center text-3xl font-bold uppercase tracking-wide",
          popular ? "text-slate-900" : "text-white"
        ].join(" ")}
      >
        {title}
      </h3>
      <p
        className={[
          "mt-4 text-center text-5xl font-extrabold",
          popular ? "text-slate-900" : "text-white"
        ].join(" ")}
      >
        {price}
      </p>
      <p className={["mt-4 text-center", popular ? "text-slate-600" : "text-brand-50"].join(" ")}>
        {description}
      </p>

      <ul
        className={[
          "mt-6 flex flex-1 flex-col gap-2 text-sm",
          popular ? "text-slate-700" : "text-brand-50"
        ].join(" ")}
      >
        {features.map((feature) => (
          <li key={`${title}-${feature}`} className="flex items-start gap-2">
            <FiCheck className={popular ? "mt-0.5 text-brand-600" : "mt-0.5 text-white"} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        to="/contact"
        variant={popular ? "primary" : "secondary"}
        className={[
          "mt-8 w-full rounded-xl px-4 py-3 font-semibold",
          popular
            ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600"
            : "bg-white text-brand-600 hover:text-brand-700"
        ].join(" ")}
      >
        {ctaLabel}
      </Button>
    </article>
  );
}
