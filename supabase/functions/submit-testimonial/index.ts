import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxImageSize = 2 * 1024 * 1024;
const maxLengths = {
  client_name: 120,
  client_role: 120,
  client_company: 160,
  content: 1200
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function readText(formData: FormData, fieldName: keyof typeof maxLengths) {
  return String(formData.get(fieldName) || "").trim();
}

function validateText(fieldName: keyof typeof maxLengths, value: string, label: string, required = true) {
  if (required && !value) return `${label} is required.`;
  if (value.length > maxLengths[fieldName]) return `${label} is too long.`;
  return "";
}

function extensionForContentType(contentType: string) {
  if (contentType === "image/jpeg") return "jpg";
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "bin";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase function environment is not configured.");
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return jsonResponse({ error: "Expected multipart form data." }, 400);
    }

    const formData = await req.formData();
    const clientName = readText(formData, "client_name");
    const clientRole = readText(formData, "client_role");
    const clientCompany = readText(formData, "client_company");
    const content = readText(formData, "content");
    const rating = Number(formData.get("rating") || 5);
    const imageValue = formData.get("profile_image");

    const validationErrors = [
      validateText("client_name", clientName, "Name"),
      validateText("client_role", clientRole, "Role or relationship"),
      validateText("client_company", clientCompany, "Company or project name", false),
      validateText("content", content, "Review")
    ].filter(Boolean);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      validationErrors.push("Rating must be between 1 and 5.");
    }

    let profileImage: File | null = null;
    if (imageValue instanceof File && imageValue.size > 0) {
      if (!allowedImageTypes.has(imageValue.type)) {
        validationErrors.push("Profile image must be JPG, PNG, WEBP, or GIF.");
      } else if (imageValue.size > maxImageSize) {
        validationErrors.push("Profile image must be 2 MB or smaller.");
      } else {
        profileImage = imageValue;
      }
    }

    if (validationErrors.length > 0) {
      return jsonResponse({ error: validationErrors[0], errors: validationErrors }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    });

    let clientImage: string | null = null;
    if (profileImage) {
      const extension = extensionForContentType(profileImage.type);
      const filePath = `testimonials/${crypto.randomUUID()}.${extension}`;
      const imageBody = new Uint8Array(await profileImage.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, imageBody, {
          contentType: profileImage.type,
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(filePath);
      clientImage = data.publicUrl;
    }

    const { data: testimonial, error: insertError } = await supabase
      .from("testimonials")
      .insert({
        client_name: clientName,
        client_role: clientRole,
        client_company: clientCompany || null,
        client_image: clientImage,
        content,
        rating,
        status: "pending"
      })
      .select("id,status")
      .single();

    if (insertError) throw insertError;

    return jsonResponse({
      success: true,
      testimonial,
      message: "Your review has been submitted for approval."
    });
  } catch (error) {
    console.error("submit-testimonial error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Testimonial submission failed." },
      400
    );
  }
});
