import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays, isSunday, startOfToday } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCalendar, 
  FiClock, 
  FiGlobe, 
  FiInfo, 
  FiVideo, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBriefcase,
  FiMessageSquare,
  FiLink,
  FiCheckCircle,
  FiArrowRight,
  FiX
} from "react-icons/fi";
import { supabase } from "../utils/supabase";
import { sendBookingEmail } from "../utils/api";
import PageTransition from "../components/PageTransition";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import SEO from "../components/SEO";
import Toast from "../components/Toast";
import { useI18n } from "../i18n";

function createBookingSchema(messages) {
  return z.object({
  client_name: z.string().min(2, messages.name),
  client_email: z.string().email(messages.email),
  client_phone: z.string().optional(),
  company_name: z.string().optional(),
  purpose: z.string().min(10, messages.purpose),
  meeting_date: z.date({ required_error: messages.date }),
  meeting_time: z.string().min(1, messages.time),
  duration: z.string(),
  timezone: z.string(),
  platform: z.enum(["Google Meet", "Zoom"]),
  meeting_link: z.string().url(messages.url).optional().or(z.literal("")),
  });
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

function getInitialMeetingDate() {
  let date = addDays(startOfToday(), 1);
  while (isSunday(date)) {
    date = addDays(date, 1);
  }
  return date;
}

export default function Booking() {
  const { t } = useI18n();
  const pageCopy = t("booking");
  const bookingSchema = useMemo(() => createBookingSchema(pageCopy.errors), [pageCopy.errors]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    trigger,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      duration: "30 min",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      platform: "Google Meet",
      meeting_date: getInitialMeetingDate()
    }
  });

  const selectedDate = watch("meeting_date");
  const selectedPlatform = watch("platform");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([{
          ...data,
          meeting_date: format(data.meeting_date, 'yyyy-MM-dd')
        }]);

      if (error) throw error;

      // Send booking confirmation emails (admin + client)
      try {
        await sendBookingEmail({
          ...data,
          meeting_date: format(data.meeting_date, 'yyyy-MM-dd')
        });
      } catch (emailError) {
        console.warn('Email notification failed but appointment was saved:', emailError);
        // Don't fail the booking if email fails
      }

      setIsSuccess(true);
    } catch (error) {
      setToast({
        type: "error",
        message: pageCopy.errors.submit.replace("{message}", error.message)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateSelectable = (date) => {
    return !isSunday(date);
  };

  return (
    <PageTransition>
      <SEO
        title={t("seo.booking.title")}
        description={t("seo.booking.description")}
        path="/booking"
      />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="site-container py-20">
        <SectionTitle 
          title={pageCopy.title}
          subtitle={pageCopy.subtitle}
          align="center"
        />

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Sidebar: Details */}
            <div className="space-y-6">
              <div className="card-surface p-8 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FiInfo className="text-brand-500" /> {pageCopy.detailsTitle}
                </h3>
                
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <FiClock />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{pageCopy.durationTitle}</h4>
                      <p className="text-slate-500 text-xs">{pageCopy.durationBody}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <FiVideo />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{pageCopy.platformTitle}</h4>
                      <p className="text-slate-500 text-xs">{pageCopy.platformBody}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <FiGlobe />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{pageCopy.timezoneTitle}</h4>
                      <p className="text-slate-500 text-xs truncate max-w-[150px]">{watch("timezone")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-surface p-8 bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">{pageCopy.windowTitle}</h3>
                  <p className="text-slate-400 text-sm">{pageCopy.windowBody}</p>
                </div>
                <div className="absolute top-0 right-0 h-20 w-20 bg-brand-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-surface p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[500px]"
                  >
                    <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <FiCheckCircle size={48} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-extrabold text-slate-900">{pageCopy.successTitle}</h2>
                      <p className="text-slate-600 max-w-md mx-auto">
                        {pageCopy.successBody}
                      </p>
                    </div>
                    <Button to="/" variant="secondary">{pageCopy.returnHome}</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="form-dynamic-bg p-8 md:p-10 space-y-8 rounded-3xl border shadow-soft">
                    {/* Stepper Header */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                      <div className="h-px flex-1 bg-slate-100" />
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                    </div>

                    {step === 1 ? (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <FiUser size={14} className="text-brand-500" /> {pageCopy.fields.fullName}
                            </label>
                            <input 
                              {...register("client_name")}
                              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 transition-colors"
                              placeholder="Beng Espoir"
                            />
                            {errors.client_name && <p className="text-xs text-red-500 font-medium">{errors.client_name.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <FiMail size={14} className="text-brand-500" /> {pageCopy.fields.email}
                            </label>
                            <input 
                              {...register("client_email")}
                              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 transition-colors"
                              placeholder="beng@example.com"
                            />
                            {errors.client_email && <p className="text-xs text-red-500 font-medium">{errors.client_email.message}</p>}
                          </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <FiPhone size={14} className="text-brand-500" /> {pageCopy.fields.phone}
                            </label>
                            <input 
                              {...register("client_phone")}
                              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 transition-colors"
                              placeholder="+237 ..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <FiBriefcase size={14} className="text-brand-500" /> {pageCopy.fields.company}
                            </label>
                            <input 
                              {...register("company_name")}
                              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 transition-colors"
                              placeholder="Acme Corp"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <FiMessageSquare size={14} className="text-brand-500" /> {pageCopy.fields.purpose}
                          </label>
                          <textarea 
                            {...register("purpose")}
                            rows="4"
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 transition-colors"
                            placeholder={pageCopy.fields.purposePlaceholder}
                          />
                          {errors.purpose && <p className="text-xs text-red-500 font-medium">{errors.purpose.message}</p>}
                        </div>

                        <div className="pt-4">
                          <Button 
                            type="button" 
                            className="w-full justify-center gap-2"
                            onClick={async () => {
                              const isValid = await trigger(["client_name", "client_email", "purpose"]);
                              if (isValid) {
                                setStep(2);
                              }
                            }}
                          >
                            {pageCopy.fields.chooseDateTime} <FiArrowRight />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="grid gap-8 md:grid-cols-2">
                          <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 block">{pageCopy.fields.selectDate}</label>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setValue("meeting_date", date, { shouldValidate: true })}
                              inline
                              minDate={addDays(startOfToday(), 1)}
                              maxDate={addDays(startOfToday(), 7)}
                              filterDate={isDateSelectable}
                              calendarClassName="premium-calendar"
                            />
                          </div>
                          
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700 block">{pageCopy.fields.selectTime}</label>
                            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setValue("meeting_time", time, { shouldValidate: true })}
                                  className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                                    watch("meeting_time") === time 
                                      ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-200' 
                                      : 'bg-white border-slate-100 text-slate-600 hover:border-brand-200'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                            {errors.meeting_time && <p className="text-xs text-red-500 font-medium">{errors.meeting_time.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-100">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700">{pageCopy.fields.preferredPlatform}</label>
                              <div className="grid grid-cols-2 gap-3">
                                {["Google Meet", "Zoom"].map((p) => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => setValue("platform", p)}
                                    className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                                      selectedPlatform === p 
                                        ? 'bg-brand-50 border-brand-500 text-brand-600' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                                    }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700">{pageCopy.fields.meetingLink}</label>
                              <div className="relative">
                                <input 
                                  {...register("meeting_link")}
                                  className="w-full rounded-xl border border-slate-200 p-3 pl-10 outline-none focus:border-brand-500 transition-colors"
                                  placeholder={pageCopy.fields.meetingLinkPlaceholder.replace("{platform}", selectedPlatform)}
                                />
                                <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              </div>
                              {errors.meeting_link && <p className="text-xs text-red-500 font-medium">{errors.meeting_link.message}</p>}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button 
                            type="button" 
                            variant="secondary" 
                            className="flex-1 justify-center"
                            onClick={() => setStep(1)}
                          >
                            {pageCopy.fields.back}
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1 justify-center gap-2"
                            disabled={isSubmitting || !watch("meeting_time")}
                          >
                            {isSubmitting ? pageCopy.fields.processing : pageCopy.fields.confirm} <FiCheckCircle />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
