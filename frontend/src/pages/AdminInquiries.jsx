import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { FiMail, FiCheck, FiTrash2, FiClock, FiEye, FiCopy } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [copied, setCopied] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchInquiries();

    // Set up realtime subscription
    const subscription = supabase
      .channel('public:contacts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contacts' }, (payload) => {
        setInquiries(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchInquiries() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setInquiries(data);
    setLoading(false);
  }

  async function markAsRead(id) {
    const { error } = await supabase
      .from('contacts')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, is_read: true } : item));
    }
  }

  async function deleteInquiry() {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', deleteTarget.id);

    if (!error) {
      setInquiries(prev => prev.filter(item => item.id !== deleteTarget.id));
      if (selectedInquiry?.id === deleteTarget.id) setSelectedInquiry(null);
    } else {
      setToast({ type: 'error', message: `Inquiry could not be deleted: ${error.message}` });
    }
    setDeleteTarget(null);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries Inbox</h1>
          <p className="text-slate-500">Manage and respond to messages from your contact form.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* List Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card-surface overflow-hidden">
              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : inquiries.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">No inquiries yet.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {inquiries.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedInquiry(item);
                          if (!item.is_read) markAsRead(item.id);
                        }}
                        className={`cursor-pointer p-4 transition-colors hover:bg-slate-50 ${
                          selectedInquiry?.id === item.id ? 'bg-slate-50 border-l-4 border-brand-500' : ''
                        } ${!item.is_read ? 'bg-brand-50/30' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-sm font-bold ${!item.is_read ? 'text-brand-600' : 'text-slate-900'}`}>
                            {item.name}
                          </span>
                          {!item.is_read && <span className="h-2 w-2 rounded-full bg-brand-500"></span>}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{item.subject}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                          <FiClock /> {new Date(item.created_at).toLocaleDateString()}
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
            {selectedInquiry ? (
              <div className="card-surface p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedInquiry.subject}</h2>
                    <p className="text-slate-500 mt-1">From: <span className="font-semibold text-slate-700">{selectedInquiry.name}</span> ({selectedInquiry.email})</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDeleteTarget(selectedInquiry)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl border border-slate-100 bg-white">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Phone</p>
                    <p className="text-slate-900 font-medium">{selectedInquiry.phone || 'Not provided'}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-white">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Sent From</p>
                    <p className="text-slate-900 font-medium">{selectedInquiry.source_page || 'Contact Page'}</p>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4 pt-4">
                  <button
                    onClick={() => copyToClipboard(selectedInquiry.email)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        Copy Email
                      </>
                    )}
                  </button>
                  <a 
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/20 hover:bg-brand-700 transition-all"
                  >
                    <FiMail /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="card-surface h-full flex flex-col items-center justify-center p-12 text-slate-400">
                <FiEye size={48} className="mb-4 opacity-20" />
                <p>Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete inquiry?"
        message={deleteTarget ? `This will permanently delete the message from ${deleteTarget.name}.` : ''}
        confirmLabel="Delete inquiry"
        destructive
        onConfirm={deleteInquiry}
        onCancel={() => setDeleteTarget(null)}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </DashboardLayout>
  );
}
