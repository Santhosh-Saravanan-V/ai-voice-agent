export async function transcribeAudio(audioBlob: Blob): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_ASSEMBLYAI_KEY as string;
  
    const uploadRes = await fetch("https://api.assemblyai.com/v2/upload", {
      method: "POST",
      headers: { authorization: apiKey },
      body: audioBlob,
    });
    const { upload_url } = await uploadRes.json();
  
    const transcriptRes = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({ audio_url: upload_url }),
    });
    const { id } = await transcriptRes.json();
  
    let status = "queued", text = "";
    while (status !== "completed") {
      const pollingRes = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
        headers: { authorization: apiKey },
      });
      const data = await pollingRes.json();
      status = data.status;
      text = data.text;
      await new Promise((r) => setTimeout(r, 3000));
    }
  
    return text;
  }
  