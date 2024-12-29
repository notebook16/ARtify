async function stable_Diffusion_V1(data) {
	
    try {
          
    
    
    const response = await fetch(
		"https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}

    )


        if (!response.ok) { 
            throw new Error(`Error: ${response.statusText}`);
        }


        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer(); // Convert the blob to an array buffer
        const buffer = Buffer.from(arrayBuffer); // Corrected: use Buffer.from()

        return buffer; // 
    }catch(error){
        console.error('Error in SD_V-1 function:', error);
        return null; // Return null if error occurs
    }
	
}

export { stable_Diffusion_V1 };