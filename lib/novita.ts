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

// Optimized polling for task result with maximum 1 minute waiting time
async function pollTaskResult(
  taskId: string,
  maxWaitTime: number = 60000
): Promise<string> {
  const startTime = Date.now();
  let attempts = 0;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const resultResponse = await fetch(
        `${API_BASE_URL}/async/task-result?task_id=${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!resultResponse.ok) {
        throw new Error("Failed to check video status");
      }

      const result = await resultResponse.json();

      if (result.task.status === "TASK_STATUS_SUCCEED") {
        return result.videos[0].video_url;
      } else if (result.task.status === "TASK_STATUS_FAILED") {
        throw new Error(result.task.reason || "Video generation failed");
      }

      // Wait 10 seconds before checking again
      await delay(10000);
      attempts++;
    } catch (error: any) {
      if (Date.now() - startTime >= maxWaitTime) {
        throw new Error("Video generation timed out");
      }
      await delay(10000); // Retry after a delay
    }
  }

  throw new Error("Video generation timed out");
}

// Generate video and get taskId with fast_mode flag
export async function generateVideo(
  imageBase64: string,
  fastMode: boolean = false
): Promise<{ taskId: string; videoUrl?: string }> {
  try {
    // Upload image and get public URL
    const imageUrl = await uploadImageToSupabase(imageBase64);

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
        fast_mode: fastMode, // Fast mode flag
      }),
    });

    if (!generateResponse.ok) {
      throw new Error("Failed to start video generation");
    }

    const { task_id } = await generateResponse.json();
    return { taskId: task_id };
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
