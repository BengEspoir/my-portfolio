import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { revealUp, staggerContainer } from "../animations/motion";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading && testimonials.length === 0) return null;
  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="site-container py-20">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <motion.div variants={revealUp} className="text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <FiMessageSquare size={24} />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Client Feedback</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Hear from the partners and clients I've worked with on various projects.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <motion.div 
              key={item.id} 
              variants={revealUp}
              className="card-surface p-8 flex flex-col h-full"
            >
              <div className="mb-6 flex gap-1 text-amber-400">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <FiStar key={i} fill="currentColor" />
                ))}
              </div>
              
              <blockquote className="mb-8 flex-1 text-lg leading-relaxed text-slate-700 italic">
                &quot;{item.content}&quot;
              </blockquote>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                {item.client_image ? (
                  <img 
                    src={item.client_image} 
                    alt={item.client_name} 
                    className="h-12 w-12 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900">{item.client_name}</h4>
                  <p className="text-sm text-slate-500">
                    {item.client_role}{item.client_company ? ` @ ${item.client_company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
