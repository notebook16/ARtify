import dotenv from "dotenv";
dotenv.config();


async function forest(data) {
	try{

        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
      
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer(); // Convert the blob to an array buffer
        const buffer = Buffer.from(arrayBuffer); // Corrected: use Buffer.from()

        return buffer; // Return the buffer

    }catch(error){
        console.error('Error in forest function:', error);
        return null; // Return null if error occurs
    }
}


export { forest };