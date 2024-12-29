async function stable_Diffusion_35_lab(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
            {
                headers: {
                    Authorization: "Bearer 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", // Replace with your Hugging Face API key
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        // Check if the response is okay (status 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer(); // Convert the blob to an array buffer
        const buffer = Buffer.from(arrayBuffer); // Corrected: use Buffer.from()

        return buffer; // Return the generated image buffer
    } catch (error) {
        console.error('Error in query function:', error);
        return null; // Return null if error occurs
    }
}

export { stable_Diffusion_35_lab };
