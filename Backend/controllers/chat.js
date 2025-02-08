import User from "../models/user.js";
import Prompt from "../models/prompt.js";
import { HfInference } from "@huggingface/inference";
import { stable_Diffusion_35_lab } from "../imgModels/SD_3.5_lab.js";
import { forest } from "../imgModels/forest.js";
import enhancePrompt from '../imgModels/Eprompt.js';
import fetch from "node-fetch"; // Ensure fetch is available for Node.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUD_API_KEY}`,
  api_secret: `${process.env.CLOUD_API_SECERET}`,
});

// Verify Cloudinary setup
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("Cloudinary setup error:", error);
  } else {
    console.log("Cloudinary setup successful:", result);
  }
});



const chat = async (req, res) => {
  try {
    console.log("Received request on chat");

    const { prompt, quick } = req.body;

    if (!prompt || typeof quick !== "boolean") {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    const username = req.headers["username"]; // Extract username from headers
    console.log("Authenticated user:", username);

    if (quick) {
      const encodedPrompt = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

      const response = await fetch(imageUrl);
      if (!response.ok) {
        return res
          .status(400)
          .json({ error: "Invalid image URL or server error" });
      }

      try {
        const uploadResult = await cloudinary.uploader.upload(imageUrl, {
          resource_type: "image",
          folder: "generated_images",
        });

        console.log("Image uploaded successfully:", uploadResult.secure_url);
        const downloadUrl = uploadResult.secure_url.replace(
          "/upload/",
          "/upload/fl_attachment/"
        );

        const user = await User.findOne({ username });
        if (user) {
          const newPrompt = new Prompt({
            prompt,
            images: [downloadUrl],
            user: user._id,
          });
          await newPrompt.save();

          user.prompts.push(newPrompt._id);
          await user.save();
          console.log(
            "Prompt and image saved successfully for user:",
            username
          );
        }

        return res.status(200).json({ link: downloadUrl });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError.message);
        return res.status(500).json({
          message: "Error uploading image to Cloudinary",
          error: uploadError.message,
        });
      }
    }

 

    console.log("enhancing prompt");


    try {
      const enhancedPrompt = await enhancePrompt(prompt);
      console.log("Enhanced Prompt:", enhancedPrompt);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    }

  
    
    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "generated_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    };


    let uploadResults = [];
    const results = await Promise.allSettled([
      (async () => {
        try {
          const buffer = await stable_Diffusion_35_lab({
            inputs: prompt,
          });
          const uploadResult1 = await uploadToCloudinary(buffer);
          console.log(`stable diffusion worked ${uploadResult1.secure_url}`);
          return uploadResult1.secure_url.replace(
            "/upload/",
            "/upload/fl_attachment/"
          );
        } catch (error) {
          console.log("failed stable diffusion");
          console.error("Stable Diffusion failed:", error.message);
          return null;
        }
      })(),
      (async () => {
        try {
          const buffer2 = await forest({ inputs: prompt });
          const uploadResult2 = await uploadToCloudinary(buffer2);
          console.log(`forest worked ${uploadResult2.secure_url}`);
          return uploadResult2.secure_url.replace(
            "/upload/",
            "/upload/fl_attachment/"
          );
        } catch (error) {
          console.log("failed forest");
          console.error("Forest model failed:", error.message);
          return null;
        }
      })(),
    ]);

    // Collect successful results
    uploadResults = results
      .filter(
        (result) => result.status === "fulfilled" && result.value !== null
      )
      .map((result) => result.value);

    if (uploadResults.length === 0) {
      return res
        .status(500)
        .json({ message: "Both models failed to generate images" });
    }

    const user = await User.findOne({ username });
    if (user) {
      const newPrompt = new Prompt({
        prompt,
        images: uploadResults,
        user: user._id,
      });
      await newPrompt.save();

      user.prompts.push(newPrompt._id);
      await user.save();
      console.log("Prompt and image saved successfully for user:", username);
    }

    console.log("Image(s) generated and uploaded successfully:", uploadResults);

    return res.status(200).json({
      message: "Image(s) generated and uploaded successfully",
      link: uploadResults,
    });
  } catch (error) {
    console.error("Error in chat handler:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const userChat = async (req, res) => {
  //extract username
  const username = req.headers["username"];

  //get user
  const user = await User.findOne({ username });

  //get all prompts for user
  const prompts = await Prompt.find({ user: user._id });

  //return prompts
  return res.status(200).json({ prompts });
};

export { chat, userChat };
