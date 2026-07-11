import { useMemo, useState } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCpu,
  FiMessageSquare,
  FiSend,
  FiX,
  FiZap
} from 'react-icons/fi';
import { useDashboardAssistant } from '../hooks/useDashboardAssistant';
import { extractDashboardContent } from '../utils/api';

const greeting = 'Hello Ben, how can I help you today? Which project can I help you fill into your dashboard?';

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined) return '';
  return String(value);
}

function getPreviewEntries(result) {
  if (!result || typeof result !== 'object') return [];

  return Object.entries(result)
    .filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && String(value).trim() !== '';
    })
    .slice(0, 10);
}

function isSetupError(message) {
  return /GEMINI_API_KEY|GROQ_API_KEY|AI_EXTRACT_PROVIDER|Function not found|not deployed|not configured/i.test(message);
}

function SetupGuide() {
  return (
    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
      <p className="font-bold">Supabase AI setup checklist</p>
      <ol className="mt-2 list-decimal space-y-1 pl-4">
        <li>Open Supabase Dashboard - Edge Functions - Secrets.</li>
        <li>Add `AI_EXTRACT_PROVIDER=gemini`.</li>
        <li>Add `GEMINI_API_KEY` and `GEMINI_MODEL=gemini-3.5-flash`.</li>
        <li>Deploy or update `extract-dashboard-content`.</li>
      </ol>
    </div>
  );
}

export default function EspoirAssistantWidget() {
  const { assistantTarget } = useDashboardAssistant();
  const [isOpen, setIsOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [instruction, setInstruction] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: greeting }]);
  const [pendingResult, setPendingResult] = useState(null);
  const [provider, setProvider] = useState('');
  const [loadingMode, setLoadingMode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const previewEntries = useMemo(() => getPreviewEntries(pendingResult), [pendingResult]);
  const canApplyToProject = assistantTarget?.contentType === 'project' && typeof assistantTarget.onApply === 'function';

  const runAssistant = async (mode) => {
    const text = rawText.trim();
    const prompt = instruction.trim();

    setError('');
    setSuccess('');

    if (!canApplyToProject) {
      setError('Open a project create or edit form before asking Espoir to fill project fields.');
      return;
    }

    if (mode === 'extract' && text.length < 20) {
      setError('Paste at least a short project brief or case study before extracting details.');
      return;
    }

    if (mode === 'chat' && prompt.length < 3) {
      setError('Write a short instruction for Espoir.');
      return;
    }

    const userMessage = mode === 'extract'
      ? { role: 'user', content: `I pasted project notes for extraction (${text.length} characters).` }
      : { role: 'user', content: prompt };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setLoadingMode(mode);

    try {
      const response = await extractDashboardContent({
        mode,
        contentType: 'project',
        rawText: text,
        instruction: mode === 'chat' ? prompt : '',
        messages: nextMessages,
        currentDraft: assistantTarget.currentDraft || {}
      });

      const assistantMessage = response.assistantMessage || 'I prepared a project draft you can review and apply.';
      setPendingResult(response.result || null);
      setProvider(response.provider || '');
      setMessages((previous) => [...previous, { role: 'assistant', content: assistantMessage }]);
      setInstruction('');
      setSuccess('Draft ready. Review the suggested fields, then apply them to the project form.');
    } catch (assistantError) {
      const message = assistantError.message || 'Espoir could not prepare a useful draft.';
      setError(message);
      setMessages((previous) => [...previous, { role: 'assistant', content: message }]);
    } finally {
      setLoadingMode('');
    }
  };

  const applyDraft = () => {
    if (!pendingResult || !canApplyToProject) return;

    assistantTarget.onApply(pendingResult);
    setPendingResult(null);
    setSuccess('Draft applied to the active project form. Review the fields before saving.');
    setMessages((previous) => [
      ...previous,
      { role: 'assistant', content: 'I applied the draft to the active project form. Please review it before saving.' }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {isOpen ? (
        <section
          className="mb-4 flex max-h-[78vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
          aria-label="Espoir dashboard assistant"
        >
          <header className="flex items-center justify-between border-b border-slate-100 bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-500">
                <FiCpu />
              </div>
              <div>
                <p className="text-sm font-extrabold">Espoir</p>
                <p className="text-xs text-slate-300">Dashboard project assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close Espoir assistant"
            >
              <FiX />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={[
                    'rounded-2xl px-3 py-2 text-sm leading-6',
                    message.role === 'user'
                      ? 'ml-auto max-w-[85%] bg-brand-600 text-white'
                      : 'mr-auto max-w-[90%] bg-slate-100 text-slate-700'
                  ].join(' ')}
                >
                  {message.content}
                </div>
              ))}
            </div>

            {!canApplyToProject ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                Open <span className="font-bold text-slate-900">Projects - New Project</span> or edit an existing project so Espoir can apply fields to the active form.
              </div>
            ) : null}

            <label htmlFor="espoir-project-notes" className="mt-4 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Project notes
            </label>
            <textarea
              id="espoir-project-notes"
              value={rawText}
              onChange={(event) => {
                setRawText(event.target.value);
                setError('');
                setSuccess('');
              }}
              rows={5}
              placeholder="Paste a raw UX, web, or Android case study here. Screens and images stay manual."
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-brand-500"
            />

            <button
              type="button"
              onClick={() => runAssistant('extract')}
              disabled={Boolean(loadingMode) || !canApplyToProject}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiZap /> {loadingMode === 'extract' ? 'Extracting...' : 'Extract Project Details'}
            </button>

            <div className="mt-3 flex gap-2">
              <label htmlFor="espoir-instruction" className="sr-only">Instruction for Espoir</label>
              <input
                id="espoir-instruction"
                value={instruction}
                onChange={(event) => {
                  setInstruction(event.target.value);
                  setError('');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    runAssistant('chat');
                  }
                }}
                placeholder="Ask Espoir to refine the draft..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => runAssistant('chat')}
                disabled={Boolean(loadingMode) || !canApplyToProject}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-200 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send instruction to Espoir"
              >
                <FiSend />
              </button>
            </div>

            {previewEntries.length > 0 ? (
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                    <FiCheckCircle /> Draft ready {provider ? `via ${provider}` : ''}
                  </p>
                  <button
                    type="button"
                    onClick={applyDraft}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700"
                  >
                    Apply
                  </button>
                </div>
                <dl className="mt-3 space-y-2">
                  {previewEntries.map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-white/80 p-2">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{key.replace(/_/g, ' ')}</dt>
                      <dd className="mt-1 line-clamp-2 text-xs leading-5 text-slate-700">{formatValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {error ? (
              <div className="mt-3 rounded-2xl bg-red-50 p-3 text-sm leading-6 text-red-700" role="alert">
                <p className="flex items-center gap-2 font-bold">
                  <FiAlertCircle /> Espoir needs attention
                </p>
                <p className="mt-1">{error}</p>
                {isSetupError(error) ? <SetupGuide /> : null}
              </div>
            ) : null}

            {success ? (
              <p className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
                {success}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-2xl shadow-brand-900/30 transition hover:-translate-y-0.5 hover:bg-brand-700"
        aria-label="Open Espoir dashboard assistant"
      >
        <FiMessageSquare size={22} />
      </button>
    </div>
  );
}
