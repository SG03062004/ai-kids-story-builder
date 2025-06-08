export const GenerateImage = async (prompt: string) => {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (!res.ok) {
      throw new Error("Image generation failed");
    }
  
    const data = await res.json();
    return data.image;
  };
  