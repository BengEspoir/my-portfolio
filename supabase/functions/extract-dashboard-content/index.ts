import { createClient } from "npm:@supabase/supabase-js@^2";
import { corsHeaders } from "npm:@supabase/supabase-js@^2/cors";

type ContentType = "project" | "blog" | "testimonial" | "experience";
type AssistantMode = "extract" | "chat";
type ExtractedContent = Record<string, string | number | string[] | null>;
type AssistantMessage = { role: "user" | "assistant"; content: string };

const maxRawTextLength = 12000;
const maxInstructionLength = 3000;
const adminEmail = (Deno.env.get("ADMIN_EMAIL") || "mbengespoir@gmail.com").toLowerCase();
const contentTypes: ContentType[] = ["project", "blog", "testimonial", "experience"];
const assistantModes: AssistantMode[] = ["extract", "chat"];

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function getSupabasePublishableKey() {
  const publishableKeys = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (publishableKeys) {
    try {
      const parsed = JSON.parse(publishableKeys);
      if (typeof parsed.default === "string") return parsed.default;
    } catch (_error) {
      // Fall back to legacy env below.
    }
  }

  return Deno.env.get("SUPABASE_ANON_KEY") || "";
}

async function requireAdmin(req: Request) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const publishableKey = getSupabasePublishableKey();
  const authorization = req.headers.get("authorization") || "";

  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase function authentication is not configured.");
  }

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return jsonResponse({ error: "Authentication is required." }, 401);
  }

  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: authorization } }
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) {
    return jsonResponse({ error: "Authentication is invalid or expired." }, 401);
  }

  if (data.user.email.toLowerCase() !== adminEmail) {
    return jsonResponse({ error: "You do not have permission to use this assistant." }, 403);
  }

  return null;
}

function schemaForResult(contentType: ContentType) {
  if (contentType === "blog") {
    return {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        excerpt: { type: "string" },
        content: { type: "string" },
        category: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        seo_title: { type: "string" },
        seo_description: { type: "string" },
        reading_time: { type: "string" }
      },
      required: ["title", "description", "excerpt", "content", "tags"]
    };
  }

  if (contentType === "testimonial") {
    return {
      type: "object",
      properties: {
        client_name: { type: "string" },
        client_role: { type: "string" },
        client_company: { type: "string" },
        content: { type: "string" },
        rating: { type: "number" }
      },
      required: ["client_name", "client_role", "content", "rating"]
    };
  }

  if (contentType === "experience") {
    return {
      type: "object",
      properties: {
        company: { type: "string" },
        title: { type: "string" },
        period: { type: "string" },
        description: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        title_fr: { type: "string" },
        period_fr: { type: "string" },
        description_fr: { type: "string" },
        tags_fr: { type: "array", items: { type: "string" } }
      },
      required: ["company", "title", "description", "tags"]
    };
  }

  return {
    type: "object",
    properties: {
      title: { type: "string" },
      project_type: { type: "string" },
      problem_statement: { type: "string" },
      solution: { type: "string" },
      cta_type: { type: "string" },
      description: { type: "string" },
      case_study_content: { type: "string" },
      tags: { type: "array", items: { type: "string" } }
    },
    required: ["title", "project_type", "problem_statement", "solution", "cta_type", "description", "case_study_content", "tags"]
  };
}

function outputSchemaFor(contentType: ContentType) {
  return {
    type: "object",
    properties: {
      assistantMessage: { type: "string" },
      result: schemaForResult(contentType)
    },
    required: ["assistantMessage", "result"]
  };
}

function normalizeString(value: unknown, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => normalizeString(item, 60))
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeProjectType(value: unknown, tags: string[]) {
  const text = `${normalizeString(value, 80)} ${tags.join(" ")}`.toLowerCase();
  if (text.includes("android")) return "Android";
  if (text.includes("mobile") || text.includes("react native")) return "Mobile";
  if (text.includes("web") || text.includes("frontend") || text.includes("website")) return "Web";
  if (text.includes("ux") || text.includes("ui") || text.includes("product design")) return "UX";
  return normalizeString(value, 80);
}

function normalizeCtaType(value: unknown) {
  const text = normalizeString(value, 80).toLowerCase();
  if (["default", "case-study", "full-design", "prototype"].includes(text)) return text;
  if (text.includes("prototype")) return "prototype";
  if (text.includes("full") || text.includes("design")) return "full-design";
  if (text.includes("case")) return "case-study";
  return "case-study";
}

function normalizeMessages(value: unknown): AssistantMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-10)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const message = item as Record<string, unknown>;
      const role = message.role === "assistant" ? "assistant" : "user";
      const content = normalizeString(message.content, 1200);
      return content ? { role, content } : null;
    })
    .filter(Boolean) as AssistantMessage[];
}

function allowedDraftKeys(contentType: ContentType) {
  if (contentType === "blog") {
    return ["title", "slug", "excerpt", "content", "category", "tags", "status", "reading_time", "seo_title", "seo_description"];
  }
  if (contentType === "testimonial") {
    return ["client_name", "client_role", "client_company", "content", "rating", "status"];
  }
  if (contentType === "experience") {
    return ["company", "title", "period", "description", "tags", "title_fr", "period_fr", "description_fr", "tags_fr", "status", "sort_order"];
  }
  return [
    "title",
    "slug",
    "description",
    "categories",
    "project_type",
    "case_study_title",
    "project_background",
    "problem_statement",
    "solution",
    "cta_type",
    "cta_label",
    "tools_tech",
    "seo_title",
    "seo_description"
  ];
}

function normalizeCurrentDraft(contentType: ContentType, value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const draft = value as Record<string, unknown>;
  return allowedDraftKeys(contentType).reduce((acc, key) => {
    const current = draft[key];
    if (Array.isArray(current)) {
      acc[key] = current.map((item) => normalizeString(item, 80)).filter(Boolean).slice(0, 20);
    } else if (typeof current === "number") {
      acc[key] = current;
    } else {
      const text = normalizeString(current, key.includes("description") || key === "content" ? 2500 : 300);
      if (text) acc[key] = text;
    }
    return acc;
  }, {} as Record<string, unknown>);
}

function promptFor({
  contentType,
  mode,
  rawText,
  instruction,
  messages,
  currentDraft
}: {
  contentType: ContentType;
  mode: AssistantMode;
  rawText: string;
  instruction: string;
  messages: AssistantMessage[];
  currentDraft: Record<string, unknown>;
}) {
  const basePrompt = [
    "You are a private AI assistant inside a portfolio admin dashboard.",
    "Your job is to transform rough admin notes and instructions into structured draft fields.",
    "Return only valid JSON matching the provided schema.",
    "Never claim that content was saved, published, deployed, emailed, or inserted into a database.",
    "Use professional, concise language and do not invent specific facts unsupported by the notes or current draft.",
    "The result object must represent the best current draft after applying the user's latest instruction."
  ].join(" ");

  const contentInstructions: Record<ContentType, string> = {
    project:
      "For a project, return title, project_type, problem_statement, solution, cta_type, description, case_study_content, and tags. Project type should be UX, Web, Android, or Mobile when possible. cta_type must be default, case-study, full-design, or prototype. Do not parse, describe, or request images because project screens are uploaded manually.",
    blog:
      "For a blog post, return title, description, excerpt, markdown content, category, tags, SEO fields, and reading_time.",
    testimonial:
      "For a testimonial, return client_name, client_role, optional client_company, testimonial content, and a 1 to 5 rating.",
    experience:
      "For an experience item, return company, title, period, description, tags, and optional French equivalents title_fr, period_fr, description_fr, tags_fr."
  };

  return [
    basePrompt,
    `Mode: ${mode}.`,
    `Task: ${contentInstructions[contentType]}`,
    `Current draft JSON: ${JSON.stringify(currentDraft)}`,
    `Conversation JSON: ${JSON.stringify(messages)}`,
    `Latest instruction: ${instruction || "(none)"}`,
    `Raw notes: ${rawText || "(none)"}`
  ].join("\n\n");
}

function parseJson(text: string) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (_error) {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("The model did not return JSON.");
    return JSON.parse(match[0]);
  }
}

function normalizeModelOutput(contentType: ContentType, value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("The model returned an invalid object.");
  }

  const output = value as Record<string, unknown>;
  const assistantMessage = normalizeString(output.assistantMessage, 500) ||
    "I prepared a draft you can review and apply.";
  const rawResult = output.result && typeof output.result === "object" ? output.result : output;
  const result = normalizeResult(contentType, rawResult);

  return { assistantMessage, result };
}

function normalizeResult(contentType: ContentType, value: unknown): ExtractedContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("The model returned an invalid draft object.");
  }

  const input = value as Record<string, unknown>;

  if (contentType === "blog") {
    const result = {
      title: normalizeString(input.title, 140),
      description: normalizeString(input.description, 280),
      excerpt: normalizeString(input.excerpt, 280),
      content: normalizeString(input.content, 10000),
      category: normalizeString(input.category, 80),
      tags: normalizeTags(input.tags),
      seo_title: normalizeString(input.seo_title, 160),
      seo_description: normalizeString(input.seo_description, 300),
      reading_time: normalizeString(input.reading_time, 30)
    };

    if (!result.title || !result.content) {
      throw new Error("The model could not extract a usable article title and content.");
    }

    return result;
  }

  if (contentType === "testimonial") {
    const rating = Number(input.rating);
    const result = {
      client_name: normalizeString(input.client_name, 120),
      client_role: normalizeString(input.client_role, 120),
      client_company: normalizeString(input.client_company, 160),
      content: normalizeString(input.content, 1200),
      rating: Number.isFinite(rating) ? Math.max(1, Math.min(5, Math.round(rating))) : 5
    };

    if (!result.client_name || !result.client_role || !result.content) {
      throw new Error("The model could not extract a usable testimonial.");
    }

    return result;
  }

  if (contentType === "experience") {
    const result = {
      company: normalizeString(input.company, 120),
      title: normalizeString(input.title, 160),
      period: normalizeString(input.period, 120),
      description: normalizeString(input.description, 1200),
      tags: normalizeTags(input.tags),
      title_fr: normalizeString(input.title_fr, 160),
      period_fr: normalizeString(input.period_fr, 120),
      description_fr: normalizeString(input.description_fr, 1200),
      tags_fr: normalizeTags(input.tags_fr)
    };

    if (!result.company || !result.title || !result.description) {
      throw new Error("The model could not extract a usable experience item.");
    }

    return result;
  }

  const tags = normalizeTags(input.tags);
  const result = {
    title: normalizeString(input.title, 140),
    project_type: normalizeProjectType(input.project_type, tags),
    problem_statement: normalizeString(input.problem_statement, 2500),
    solution: normalizeString(input.solution, 2500),
    cta_type: normalizeCtaType(input.cta_type),
    description: normalizeString(input.description, 320),
    case_study_content: normalizeString(input.case_study_content, 8000),
    tags
  };

  if (!result.title || !result.description || !result.case_study_content) {
    throw new Error("The model could not extract a usable project draft.");
  }

  return result;
}

async function extractWithGemini(args: {
  contentType: ContentType;
  mode: AssistantMode;
  rawText: string;
  instruction: string;
  messages: AssistantMessage[];
  currentDraft: Record<string, unknown>;
}) {
  // This key must be configured in Supabase Edge Function secrets, not frontend/.env.local.
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  const model = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash";
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: promptFor(args) }] }],
      generationConfig: {
        temperature: 0.2,
        responseFormat: {
          text: {
            mimeType: "application/json",
            schema: outputSchemaFor(args.contentType)
          }
        }
      }
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || "Gemini extraction failed.");
  }

  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") throw new Error("Gemini returned an empty response.");
  return parseJson(text);
}

async function extractWithGroq(args: {
  contentType: ContentType;
  mode: AssistantMode;
  rawText: string;
  instruction: string;
  messages: AssistantMessage[];
  currentDraft: Record<string, unknown>;
}) {
  // This key must be configured in Supabase Edge Function secrets, not frontend/.env.local.
  const apiKey = Deno.env.get("GROQ_API_KEY");
  const model = Deno.env.get("GROQ_MODEL") || "openai/gpt-oss-20b";
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured.");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a private admin dashboard assistant. Respond only with schema-valid JSON." },
        { role: "user", content: promptFor(args) }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: `${args.contentType}_dashboard_assistant`,
          schema: outputSchemaFor(args.contentType),
          strict: false
        }
      }
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || "Groq extraction failed.");
  }

  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string") throw new Error("Groq returned an empty response.");
  return parseJson(text);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const authError = await requireAdmin(req);
    if (authError) return authError;

    const payload = await req.json();
    const contentType = payload.contentType as ContentType;
    const mode = (payload.mode || "extract") as AssistantMode;

    if (!contentTypes.includes(contentType)) {
      return jsonResponse({ error: "Unsupported content type." }, 400);
    }

    if (!assistantModes.includes(mode)) {
      return jsonResponse({ error: "Unsupported assistant mode." }, 400);
    }

    const rawText = normalizeString(payload.rawText, maxRawTextLength + 1);
    const instruction = normalizeString(payload.instruction, maxInstructionLength + 1);
    const messages = normalizeMessages(payload.messages);
    const currentDraft = normalizeCurrentDraft(contentType, payload.currentDraft);

    if (rawText.length > maxRawTextLength) {
      return jsonResponse({ error: "Pasted text is too long. Keep it under 12,000 characters." }, 400);
    }

    if (instruction.length > maxInstructionLength) {
      return jsonResponse({ error: "Instruction is too long. Keep it under 3,000 characters." }, 400);
    }

    if (mode === "extract" && rawText.length < 20) {
      return jsonResponse({ error: "Paste at least a short paragraph before extracting details." }, 400);
    }

    if (mode === "chat" && instruction.length < 3) {
      return jsonResponse({ error: "Write a short instruction for the assistant." }, 400);
    }

    const provider = (Deno.env.get("AI_EXTRACT_PROVIDER") || "gemini").toLowerCase();
    if (!["gemini", "groq"].includes(provider)) {
      return jsonResponse({ error: "Unsupported AI_EXTRACT_PROVIDER. Use gemini or groq." }, 400);
    }

    const args = { contentType, mode, rawText, instruction, messages, currentDraft };
    const rawResult = provider === "groq"
      ? await extractWithGroq(args)
      : await extractWithGemini(args);

    const { assistantMessage, result } = normalizeModelOutput(contentType, rawResult);
    return jsonResponse({ success: true, provider, assistantMessage, result });
  } catch (error) {
    console.error("extract-dashboard-content error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Dashboard content extraction failed." },
      400
    );
  }
});
