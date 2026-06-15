import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { FiCalendar, FiClock, FiTrash2, FiEye, FiCheckCircle, FiXCircle, FiPhone, FiMail, FiBriefcase, FiVideo, FiGlobe, FiLink } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { format, parseISO } from 'date-fns';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAppointments();

    // Set up realtime subscription
    const subscription = supabase
      .channel('public:appointments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, (payload) => {
        setAppointments(prev => [payload.new, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'appointments' }, (payload) => {
        setAppointments(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
        if (selectedAppointment?.id === payload.new.id) {
          setSelectedAppointment(payload.new);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('meeting_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error) setAppointments(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setAppointments(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      if (selectedAppointment?.id === id) {
        setSelectedAppointment(prev => ({ ...prev, status }));
      }
    }
  }

  async function deleteAppointment() {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', deleteTarget.id);

    if (!error) {
      setAppointments(prev => prev.filter(item => item.id !== deleteTarget.id));
      if (selectedAppointment?.id === deleteTarget.id) setSelectedAppointment(null);
    } else {
      setToast({ type: 'error', message: `Appointment could not be deleted: ${error.message}` });
    }
    setDeleteTarget(null);
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FiCheckCircle className="text-emerald-600" />;
      case 'cancelled':
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiClock className="text-amber-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage and track scheduled consultations.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* List Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card-surface overflow-hidden">
              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : appointments.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">No appointments yet.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {appointments.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAppointment(item)}
                        className={`cursor-pointer p-4 transition-colors hover:bg-slate-50 ${
                          selectedAppointment?.id === item.id ? 'bg-slate-50 border-l-4 border-brand-500' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-slate-900">
                            {item.client_name}
                          </span>
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{item.company_name || 'No company'}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <FiCalendar size={12} />
                          {format(parseISO(item.meeting_date), 'MMM dd, yyyy')} at {item.meeting_time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            {selectedAppointment ? (
              <div className="card-surface p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedAppointment.client_name}</h2>
                    <p className="text-slate-500 mt-1">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(selectedAppointment.status)}`}>
                        {getStatusIcon(selectedAppointment.status)}
                        {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setDeleteTarget(selectedAppointment)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>

                {/* Client Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <FiMail className="text-brand-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Email</p>
                        <a href={`mailto:${selectedAppointment.client_email}`} className="text-slate-900 font-medium hover:text-brand-600 break-all text-sm">
                          {selectedAppointment.client_email}
                        </a>
                      </div>
                    </div>
                    {selectedAppointment.client_phone && (
                      <div className="flex items-start gap-3">
                        <FiPhone className="text-brand-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Phone</p>
                          <a href={`tel:${selectedAppointment.client_phone}`} className="text-slate-900 font-medium hover:text-brand-600 text-sm">
                            {selectedAppointment.client_phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedAppointment.company_name && (
                      <div className="flex items-start gap-3">
                        <FiBriefcase className="text-brand-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Company</p>
                          <p className="text-slate-900 font-medium text-sm">
                            {selectedAppointment.company_name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Appointment Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-100 bg-white">
                      <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Date</p>
                      <p className="text-slate-900 font-bold text-lg">
                        {format(parseISO(selectedAppointment.meeting_date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-white">
                      <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Time</p>
                      <p className="text-slate-900 font-bold text-lg">
                        {selectedAppointment.meeting_time}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-white">
                      <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Duration</p>
                      <p className="text-slate-900 font-bold text-lg">
                        {selectedAppointment.duration}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-white">
                      <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Timezone</p>
                      <p className="text-slate-900 font-bold text-sm">
                        {selectedAppointment.timezone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Platform & Meeting Link */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Meeting Platform</h3>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-white">
                    <FiVideo className="text-brand-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Platform</p>
                      <p className="text-slate-900 font-bold mb-3">{selectedAppointment.platform}</p>
                      {selectedAppointment.meeting_link ? (
                        <div className="flex items-center gap-2">
                          <FiLink className="text-slate-400 flex-shrink-0" />
                          <a 
                            href={selectedAppointment.meeting_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:text-brand-700 underline text-sm break-all"
                          >
                            {selectedAppointment.meeting_link}
                          </a>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 italic">No meeting link provided yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consultation Purpose */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Consultation Purpose</h3>
                  <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">
                    {selectedAppointment.purpose}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                  {selectedAppointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedAppointment.id, 'confirmed')}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
                      >
                        <FiCheckCircle /> Mark Confirmed
                      </button>
                      <button
                        onClick={() => updateStatus(selectedAppointment.id, 'cancelled')}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                      >
                        <FiXCircle /> Cancel
                      </button>
                    </>
                  )}
                  {selectedAppointment.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(selectedAppointment.id, 'cancelled')}
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                    >
                      <FiXCircle /> Cancel
                    </button>
                  )}
                  {selectedAppointment.status === 'cancelled' && (
                    <button
                      onClick={() => updateStatus(selectedAppointment.id, 'pending')}
                      className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-900/20 hover:bg-amber-700 transition-all"
                    >
                      <FiClock /> Reactivate
                    </button>
                  )}
                  <a 
                    href={`mailto:${selectedAppointment.client_email}?subject=Regarding your consultation appointment`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all ml-auto"
                  >
                    <FiMail /> Email Client
                  </a>
                </div>
              </div>
            ) : (
              <div className="card-surface h-full flex flex-col items-center justify-center p-12 text-slate-400">
                <FiEye size={48} className="mb-4 opacity-20" />
                <p>Select an appointment to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete appointment?"
        message={deleteTarget ? `This will permanently delete the appointment with ${deleteTarget.client_name}.` : ''}
        confirmLabel="Delete appointment"
        destructive
        onConfirm={deleteAppointment}
        onCancel={() => setDeleteTarget(null)}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </DashboardLayout>
  );
}
