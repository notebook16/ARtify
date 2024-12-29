import React, { useState, useEffect, useRef } from "react";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [quick, setQuick] = useState(true);
  const [enhancedPrompt, setEnhancedPrompt] = useState(false);
  const [imageLink, setImageLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const chatContainerRef = useRef(null);
  const username = localStorage.getItem("username");

  // Scroll to the bottom of the chat container whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Smooth scroll
      });
    }
  }, [chatHistory]);

  // Fetch chat history if user is logged in
  useEffect(() => {
    if (username) {
      const fetchChatHistory = async () => {
        setLoading(true);
        setError("");

        try {
          const response = await fetch(
            "http://localhost:8080/api/v1/users/userChat",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                username: username,
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            setChatHistory(data.prompts);
          } else {
            setError(data.error || "Failed to fetch chat history.");
          }
        } catch (err) {
          setError("An error occurred while processing the request.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchChatHistory();
    }
  }, [username]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setImageLink([]); // Reset the image link state
    setImageLoading(true);

    const requestBody = { prompt, quick };

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/chat", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          username: username,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        // Check if data.link is an array, then update imageLink
        const newImages = Array.isArray(data.link) ? data.link : [data.link];

        // Update chatHistory with the new image links and prompt
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { prompt, images: newImages },
        ]);
      } else {
        setError(data.error || "Failed to generate image.");
      }
    } catch (err) {
      setError("An error occurred while processing the request.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickChange = () => {
    setQuick(true);
    setEnhancedPrompt(false);
  };

  const handleEnhancedChange = () => {
    setEnhancedPrompt(true);
    setQuick(false);
  };



  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-br from-black via-gray-800 to-blue-500">

{chatHistory.length === 0 && (
  <div
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-4xl font-bold"
  >
    <span className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
      Unleash your creativity
    </span>
  </div>
)}


      {/* Other components go here */}
      {chatHistory.length > 0 ? (
        <div>
          {/* Your chat content */}
        </div>
      ) : (
        <div>{/* Optional content when chatHistory is empty */}</div>
      )}
     
      <div
        className="flex flex-col space-y-4 flex-grow no-scrollbar items-center"
        ref={chatContainerRef}
        style={{
          maxHeight: "calc(100vh - 150px)",
          overflowY: "auto",
        }}
      >
        {/* {loading && (
          <div className="absolute flex items-center space-x-2">
            <div className="loader"></div>
            <p className="text-gray-500">Generating your image...</p>
          </div>
        )} */}

        {error && <p className="text-red-500">{error}</p>}

        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className="flex flex-col sm:w-2/3 md:w-1/2 mb-4 text-center"
          >
            <div class="h-[1px] bg-gray-500"></div>
            <h2 className="text-white font-medium mb-3">{chat.prompt}</h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {chat.images && chat.images.length > 0 ? (
                chat.images.map((image, i) => (
                  <div
                    key={i}
                    className="relative w-80 h-80 border border-gray-300 rounded-lg sm:w-2/3 sm:h-72 md:w-4/5 lg:w-4/5 xl:w-1/3"
                  >
                    {/* Download Icon */}
                    <a
                      href={image}
                      download={`image-${i}`}
                      className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md opacity-80 hover:opacity-100 transition"
                      aria-label="Download Image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v12m0 0l-7-7m7 7l7-7"
                        />
                      </svg>
                    </a>

                    {/* Image */}
                    <img
                      src={image}
                      alt={`Generated for ${chat.prompt}`}
                      className="w-full h-full border border-gray-300 rounded-lg"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No images available</p>
              )}
            </div>
          </div>
        ))}
      </div>

     {loading ? (
  <div className="flex justify-center items-center">
    <div className="loader"></div>
    {enhancedPrompt ? (
      <p className="text-gray-400 ml-2">
        Enhanced prompts take a little extra time—after all, quality creations from free, open-source models are worth the wait!
      </p>
    ) : (
      <p className="text-gray-400 ml-2">
        "Patience, my friend—greatness takes time! The result? Oh, it'll be astonishing enough to make you forget the wait."
      </p>
    )}
  </div>
) : (
  <div>{/* Add your content here */}</div>
)}


      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="w-56 sm:w-[500px] p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <button
            onClick={handleGenerate}
            className= "bg-gradient-to-r from-green-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate"}
          </button>
        </div>

        <div className="flex items-center space-x-6 ">
          <input
            type="checkbox"
            checked={quick}
            onChange={handleQuickChange}
            className="mr-1 scale-150"
          />
          <label className="text-white">Quick Mode</label>
          <input
            type="checkbox"
            checked={enhancedPrompt}
            onChange={handleEnhancedChange}
            className="ml-4 mr-2 scale-150"
          />
          <label className="text-stone-50 ">Enhanced Prompt</label>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
