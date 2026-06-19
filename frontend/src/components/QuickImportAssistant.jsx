import { useId, useMemo, useState } from "react";
import { FiCheckCircle, FiSend, FiZap } from "react-icons/fi";
import Button from "./Button";
import { extractDashboardContent } from "../utils/api";

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  return String(value);
}

function getPreviewEntries(result) {
  if (!result || typeof result !== "object") return [];
  return Object.entries(result)
    .filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && String(value).trim() !== "";
    })
    .slice(0, 12);
}

export default function QuickImportAssistant({
  contentType,
  currentDraft = {},
  onApply,
  accent = "brand",
  placeholder = "Paste a raw paragraph, project debrief, client feedback, or draft notes here..."
}) {
  const rawTextId = useId();
  const instructionId = useId();
  const errorId = useId();
  const [rawText, setRawText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [messages, setMessages] = useState([]);
  const [pendingResult, setPendingResult] = useState(null);
  const [provider, setProvider] = useState("");
  const [loadingMode, setLoadingMode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const previewEntries = useMemo(() => getPreviewEntries(pendingResult), [pendingResult]);
  const accentClass = accent === "fuchsia"
    ? "focus:border-fuchsia-500"
    : accent === "cyan"
      ? "focus:border-cyan-500"
      : "focus:border-brand-500";

  const runAssistant = async ({ mode, nextInstruction = "" }) => {
    const text = rawText.trim();
    const prompt = nextInstruction.trim();
    setError("");
    setSuccess("");

    if (mode === "extract" && text.length < 20) {
      setError("Paste at least a short paragraph before extracting details.");
      return;
    }

    if (mode === "chat" && prompt.length < 3) {
      setError("Write a short instruction for the assistant.");
      return;
    }

    const nextMessages = mode === "chat"
      ? [...messages, { role: "user", content: prompt }]
      : messages;

    try {
      setLoadingMode(mode);
      const response = await extractDashboardContent({
        mode,
        contentType,
        rawText: text,
        instruction: prompt,
        messages: nextMessages,
        currentDraft
      });

      const assistantMessage = response.assistantMessage || "I prepared a draft you can review and apply.";
      setPendingResult(response.result || null);
      setProvider(response.provider || "");
      setMessages((previous) => {
        const base = mode === "chat" ? nextMessages : previous;
        return [...base, { role: "assistant", content: assistantMessage }];
      });
      setInstruction("");
      setSuccess("Draft ready. Review the suggested fields before applying them to the form.");
    } catch (extractError) {
      setError(extractError.message || "The assistant could not prepare a useful draft.");
    } finally {
      setLoadingMode("");
    }
  };

  const handleApply = () => {
    if (!pendingResult) return;
    onApply(pendingResult);
    setSuccess("Draft applied to the form. Review the fields below before saving.");
  };

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <label htmlFor={rawTextId} className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <FiZap className="text-brand-500" />
            Quick Import with AI Assistant
          </label>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Paste rough notes, extract draft fields, then chat with the assistant to refine them before applying.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => runAssistant({ mode: "extract" })}
          disabled={Boolean(loadingMode)}
          className="shrink-0 gap-2"
        >
          <FiZap /> {loadingMode === "extract" ? "Extracting..." : "Extract Details"}
        </Button>
      </div>

      <textarea
        id={rawTextId}
        value={rawText}
        onChange={(event) => {
          setRawText(event.target.value);
          if (error) setError("");
          if (success) setSuccess("");
        }}
        rows={5}
        className={`mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition ${accentClass}`}
        placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
      />

      {messages.length > 0 ? (
        <div className="mt-4 max-h-56 space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={[
                "rounded-2xl px-3 py-2 text-sm leading-6",
                message.role === "user"
                  ? "ml-auto max-w-[85%] bg-brand-600 text-white"
                  : "mr-auto max-w-[90%] bg-white text-slate-700 shadow-sm"
              ].join(" ")}
            >
              {message.content}
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-3 lg:flex-row">
        <label htmlFor={instructionId} className="sr-only">Instruction for AI assistant</label>
        <input
          id={instructionId}
          type="text"
          value={instruction}
          onChange={(event) => {
            setInstruction(event.target.value);
            if (error) setError("");
          }}
          className={`min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition ${accentClass}`}
          placeholder="Instruct the assistant, e.g. make it shorter, add tags, translate French fields..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              runAssistant({ mode: "chat", nextInstruction: instruction });
            }
          }}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => runAssistant({ mode: "chat", nextInstruction: instruction })}
          disabled={Boolean(loadingMode)}
          className="gap-2"
        >
          <FiSend /> {loadingMode === "chat" ? "Thinking..." : "Send Instruction"}
        </Button>
      </div>

      {previewEntries.length > 0 ? (
        <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                <FiCheckCircle /> Suggested draft {provider ? `via ${provider}` : ""}
              </p>
              <p className="mt-1 text-xs text-emerald-700">
                These fields are not applied until you confirm.
              </p>
            </div>
            <Button type="button" size="sm" onClick={handleApply} className="gap-2">
              Apply to Form
            </Button>
          </div>
          <dl className="mt-4 grid gap-3 md:grid-cols-2">
            {previewEntries.map(([key, value]) => (
              <div key={key} className="rounded-xl bg-white/80 p-3">
                <dt className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">{key.replace(/_/g, " ")}</dt>
                <dd className="mt-1 line-clamp-3 text-sm leading-6 text-slate-700">{formatValue(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          {success}
        </p>
      ) : null}
    </section>
  );
}
