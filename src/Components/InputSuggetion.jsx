import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Notification from "./Notification"; // Importing the Notification component

const InputSuggestion = ({ closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [tagAuthority, setTagAuthority] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  
  const navigate = useNavigate(); // Initialize navigate hook

  const roles = [
    "CompusAdmin",
    "Principal",
    "Dean",
    "Hod-CS",
    "Hod-CSE",
    "Hod-IS",
    "Hod-IT",
    "Register",
    "GuildPresident",
  ];

  // Text-to-speech helper functions
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  // Function to post a suggestion
  const postSuggestion = async () => {
    setLoading(true);
    setNotification({ message: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to post a suggestion.");

      const payload = {
        by: 123,
        content: suggestion.trim(),
        tagAuthority: tagAuthority,
      };

      await axios.post(
        "https://dsb-yf9s.onrender.com/suggestion",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotification({ message: "Suggestion posted successfully!", type: "green" });
      setSuggestion("");
      setTagAuthority("");

      // Auto-close modal and redirect
      setTimeout(() => {
        closeModal();
        navigate("/student"); // Redirect to "/student" page
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "An unexpected error occurred.";
      setNotification({ message: errorMessage, type: "red" });
    } finally {
      setLoading(false);
    }
  };

  // Component UI
  return (
    isOpen && (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[70%] lg:w-[80%] p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2
                className="text-lg font-semibold"
                onMouseEnter={() => speakText("Enter Your Suggestion")}
                onMouseLeave={stopSpeech}
              >
                Enter Your Suggestion
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  closeModal();
                }}
                className="text-xl font-bold text-gray-600 hover:text-gray-900"
                onMouseEnter={() => speakText("Close Modal")}
                onMouseLeave={stopSpeech}
              >
                &times;
              </button>
            </div>

            {/* Suggestion Input */}
            <textarea
              className="w-full h-40 mt-4 p-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your suggestion here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              onMouseEnter={() => speakText("Write your suggestion here")}
              onMouseLeave={stopSpeech}
            ></textarea>

            {/* Tag Authority Dropdown */}
            <div className="mt-4">
              <label className="text-sm text-gray-500">
                Tag Authority <span className="text-xs">(Optional)</span>
              </label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tagAuthority}
                onChange={(e) => setTagAuthority(e.target.value)}
                onMouseEnter={() => speakText("Tag authority dropdown")}
                onMouseLeave={stopSpeech}
              >
                <option value="">Select a role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={postSuggestion}
                disabled={loading}
                className={`py-2 px-6 rounded-md text-white ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                onMouseEnter={() => speakText("Post suggestion")}
                onMouseLeave={stopSpeech}
              >
                {loading ? "Posting..." : "Post Suggestion"}
              </button>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}
      </>
    )
  );
};

export default InputSuggestion;
