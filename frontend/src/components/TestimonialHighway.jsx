import { useEffect, useState, useRef } from "react";
import { isSupabaseConfigured, supabase } from "../utils/supabase";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import TypewriterText from "./TypewriterText";
import { FiMessageSquare } from "react-icons/fi";
import Button from "./Button";

export default function TestimonialHighway() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!isSupabaseConfigured) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Testimonial data unavailable. Skipping testimonial highway.');
          setTestimonials([]);
          return;
      }
        
        // Ensure we have enough items for a continuous loop
        // Duplicate data if needed for the highway effect
        if (data && data.length > 0) {
          const items = data.length < 8 ? [...data, ...data, ...data] : data;
          setTestimonials(items);
        }
      } catch (error) {
        console.warn('Testimonial data unavailable. Skipping testimonial highway.');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  // Split testimonials into two rows for the opposing highway effect
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, midPoint);
  const row2 = testimonials.slice(midPoint);

  return (
    <section className="relative py-32 overflow-hidden bg-black-50/50">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-black-500/5 rounded-full blur-[10px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black-500/5 rounded-full blur-[10px] pointer-events-none" />

      <div className="site-container relative z-10 mb-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-2">
            <FiMessageSquare size={24} />
          </div>
          <TypewriterText
            as="h2"
            text="Glance of what People Say about me"
            className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl"
          />
          <p className="text-lg text-slate-600 leading-relaxed">
            Real feedback from partners and clients who have navigated digital transformations with me.
          </p>
          <Button to="/?review=1" variant="secondary" className="mt-4">
            Have we worked together? Leave a review
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="flex flex-col gap-8 select-none pointer-events-auto">
        {/* Top Row: Right to Left */}
        <div className="relative flex overflow-hidden group">
          <motion.div 
            className="flex gap-8 py-4 px-4"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: "fit-content" }}
          >
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <TestimonialCard key={`row1-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Row: Left to Right */}
        <div className="relative flex overflow-hidden group">
          <motion.div 
            className="flex gap-8 py-4 px-4"
            animate={{ x: [-1000, 0] }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: "fit-content" }}
          >
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <TestimonialCard key={`row2-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Side Fades for Seamless Look */}
      <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-black-50 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-black-50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
