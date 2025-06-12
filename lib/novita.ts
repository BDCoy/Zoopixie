import { supabase } from "./supabase";

const API_KEY = process.env.EXPO_PUBLIC_NOVITA_API_KEY;
const API_BASE_URL = "https://api.novita.ai/v3";

// Utility function to upload image to Supabase
async function uploadImageToSupabase(base64Image: string): Promise<string> {
  try {
    const response = await fetch(`data:image/jpeg;base64,${base64Image}`);
    const blob = await response.blob();
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.jpg`;
    const filePath = `drawings/${filename}`;

    const { data, error } = await supabase.storage
      .from("drawings")
      .upload(filePath, blob, {
        contentType: "image/jpeg",
        cacheControl: "3600",
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("drawings").getPublicUrl(filePath);

    return publicUrl;
  } catch (error: any) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

// Modified prompt to create a realistic and animated video from the drawing
function generatePromptFromDrawing(): string {
  return "Convert the uploaded drawing into a realistic, animated video using AI. For example, if I upload a drawing of a car, the drawing should be animated and appear as realistic as it would in a movie.";
}

async function pollTaskResult(
  taskId: string,
  maxWaitTime: number = 120000 // 2 minutes (120,000 ms)
): Promise<string> {
  const startTime = Date.now();

  // Function to add delay (20 seconds)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (Date.now() - startTime < maxWaitTime) {
    try {
      // Query the database for the current task status
      const { data, error } = await supabase
        .from("ai_videos")
        .select("video_status, video_url")
        .eq("task_id", taskId)
        .single();

      if (error) {
        throw new Error("Failed to check video status in the database");
      }

      if (!data) {
        throw new Error("No video found with the provided task_id");
      }

      const { video_status, video_url } = data;

      // If the task is successful, return the video URL
      if (video_status === "TASK_STATUS_SUCCEED") {
        return video_url;
      }

      // If the task failed, throw an error
      if (video_status === "TASK_STATUS_FAILED") {
        throw new Error("Video generation failed");
      }

      // If the task is still processing or queued, wait 20 seconds before checking again
      if (
        video_status === "TASK_STATUS_QUEUED" ||
        video_status === "TASK_STATUS_PROCESSING"
      ) {
        await delay(20000); // Wait 20 seconds before checking again
        continue;
      }

      // If the status is something unexpected
      throw new Error("Unexpected task status");
    } catch (error: any) {
      if (Date.now() - startTime >= maxWaitTime) {
        throw new Error("Video generation timed out");
      }
      await delay(20000); // Retry after 20 seconds
    }
  }

  throw new Error("Video generation timed out");
}

// Generate video and get taskId with fast_mode flag
export async function generateVideo(
  imageBase64: string,
  userId: string
): Promise<{ taskId: string; videoUrl?: string }> {
  try {
    // Upload image and get public URL
    const imageUrl = await uploadImageToSupabase(imageBase64);
    const WEBHOOK_URL = process.env.EXPO_PUBLIC_WEBHOOK_API;
    console.log(WEBHOOK_URL)
    const generateResponse = await fetch(`${API_BASE_URL}/async/wan-i2v`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
        height: 1280,
        width: 720,
        prompt: generatePromptFromDrawing(),
        fast_mode: true, // Fast mode flag
        extra: {
          webhook: {
            url: WEBHOOK_URL,
          },
        },
      }),
    });

    if (!generateResponse.ok) {
      throw new Error("Failed to start video generation");
    }

    const { task_id } = await generateResponse.json();

    // Save the task_id and set initial status as 'TASK_STATUS_PROCESSING' in Supabase
    const { error } = await supabase.from("ai_videos").insert([
      {
        task_id, // Save the task_id to link to the video
        user_id: userId,
        video_status: "TASK_STATUS_PROCESSING", // Set the status as processing initially
      },
    ]);

    if (error) {
      throw new Error("Failed to save task ID to the database");
    }

    return { taskId: task_id }; // Return task_id
  } catch (error: any) {
    throw new Error(error.message || "Failed to generate video");
  }
}

// Get video URL based on taskId
export async function getVideoUrl(taskId: string): Promise<string> {
  try {
    return await pollTaskResult(taskId);
  } catch (error: any) {
    throw new Error(`Failed to get video URL: ${error.message}`);
  }
}
