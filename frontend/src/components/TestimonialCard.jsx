import { FiStar, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TestimonialCard({ item, isFloating = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative w-[340px] flex-shrink-0 card-surface p-8 flex flex-col h-[340px] justify-between transition-all duration-500 ${
        isFloating ? 'shadow-xl shadow-brand-500/5' : ''
      }`}
    >
      {/* Top Section: Rating & Badge */}
      <div className="flex justify-between items-start">
        <div className="flex gap-1 text-amber-400">
          {[...Array(item.rating || 5)].map((_, i) => (
            <FiStar key={i} fill="currentColor" size={18} />
          ))}
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
          <FiCheckCircle size={12} /> Verified
        </div>
      </div>

      {/* Middle Section: Testimonial Text */}
      <blockquote className="my-6 flex-1 text-lg leading-relaxed text-slate-700 italic line-clamp-5">
        &quot;{item.content}&quot;
      </blockquote>

      {/* Bottom Section: Client Profile */}
      <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
        <div className="relative">
          {item.client_image ? (
            <img 
              src={item.client_image} 
              alt={item.client_name} 
              className="h-14 w-14 rounded-2xl object-cover shadow-sm ring-2 ring-white"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 font-bold text-xl ring-2 ring-white">
              {item.client_name.charAt(0)}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-brand-500 border-2 border-white flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-slate-900 truncate">{item.client_name}</h4>
          <p className="text-xs text-slate-500 truncate">
            {item.client_role}{item.client_company ? ` @ ${item.client_company}` : ""}
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
