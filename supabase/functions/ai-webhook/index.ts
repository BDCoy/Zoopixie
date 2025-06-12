// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
// Setup CORS headers (use the shared 'corsHeaders' from your existing setup)
import { corsHeaders } from "../_shared/cors.ts";

// Initialize the Supabase client to interact with the database
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  // Handle preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  // Parse the incoming JSON payload
  const body = await req.json();

  // Ensure that we received the correct event type
  if (body.event_type !== "ASYNC_TASK_RESULT") {
    return new Response("Invalid event type", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { payload } = body;

  // Extract relevant data from the payload
  const { task, videos } = payload;

  // Only process if the task status is 'TASK_STATUS_SUCCEED'
  if (task.status !== "TASK_STATUS_SUCCEED") {
    return new Response("Task not completed successfully", {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Extract task_id, video_url, and other relevant info
  const task_id = task.task_id;
  const video_url = videos[0]?.video_url || null; // Get the video URL from the first video object
  const video_title = `Video for task ${task_id}`; // Custom title based on the task ID
  const video_status = task.status;

  // Check if a video with this task_id already exists in the database
  const { data: existingVideo, error: findError } = await supabase
    .from("ai_videos")
    .select("*")
    .eq("task_id", task_id)
    .single();

  if (findError) {
    return new Response("Failed to find video with the provided task_id", {
      status: 500,
      headers: corsHeaders,
    });
  }

  // If no video exists for this task_id, do nothing (no insert)
  if (!existingVideo) {
    return new Response(
      "No video found for the provided task_id, skipping update",
      { status: 404, headers: corsHeaders }
    );
  }

  // If a video exists for this task_id, update it
  const { data, error } = await supabase
    .from("ai_videos")
    .update({
      video_url,
      video_title,
      video_status,
      updated_at: new Date().toISOString(), // Update the timestamp
    })
    .eq("task_id", task_id)
    .single();

  if (error) {
    return new Response("Failed to update video data", {
      status: 500,
      headers: corsHeaders,
    });
  }

  return new Response("Video data updated successfully", {
    status: 200,
    headers: corsHeaders,
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
