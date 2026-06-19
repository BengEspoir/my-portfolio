import { motion } from 'framer-motion';
import Button from './Button';
import TypewriterText from './TypewriterText';
import { FiCalendar } from 'react-icons/fi';
import { useI18n } from '../i18n';

export default function BookingCTA() {
  const { t } = useI18n();

  return (
    <section className="site-container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 " />
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse animation-delay-2000" />

        {/* Content */}
        <div className="relative z-10 px-6 py-16 sm:px-8 md:py-20 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-6"
            >
              <FiCalendar className="text-white" size={32} />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <TypewriterText
                as="h2"
                text={t("bookingCta.title")}
                className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
              />
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {t("bookingCta.body")}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Button
                to="/booking"
                variant="secondary"
                className="inline-flex items-center gap-2 text-lg px-8 py-4 font-bold hover:scale-105 transition-transform"
              >
                <FiCalendar size={20} />
                {t("bookingCta.cta")}
              </Button>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-white/70 text-sm md:text-base mt-8"
            >
              {t("bookingCta.support")}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
