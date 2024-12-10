import { useState, useEffect } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";

const Queue = () => {
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  // Fetch suggestions from the backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get("https://dsb-yf9s.onrender.com/suggestion", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        setSuggestions(response.data); // Store the fetched suggestions
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="w-full mt-20 max-w-[95%] mx-auto my-6 p-6">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <div key={suggestion.id} className="mb-6">
            <SuggestionCard suggestion={suggestion} />
          </div>
        ))
      ) : (
        <p>Loading suggestions...</p>
      )}
    </div>
  );
};

// SuggestionCard Component
const SuggestionCard = ({ suggestion }) => {
  const [upvotes, setUpvotes] = useState(suggestion.upvotes || 0); // Initial upvotes based on suggestion
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(suggestion.comments || []);

  // Function to trigger speech
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // Function to stop speech
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  // Handle upvote for this suggestion
  const handleUpvote = () => {
    setUpvotes(upvotes + 1); // Increment upvotes for this specific suggestion
  };

  // Toggle visibility of the comment section
  const toggleCommentSection = () => {
    setIsCommentVisible(!isCommentVisible); // Toggle comment section visibility
  };

  // Function to handle posting a comment
  const handleCommentPost = async () => {
    const token = localStorage.getItem("token"); // Fetch token from local storage
    const suggestionId = suggestion.id; // Get the suggestionId for the current suggestion

    if (!token) {
      alert("You need to log in to post a comment.");
      return;
    }

    if (comment.trim()) {
      try {
        // Make the API call to post the comment
        const response = await axios.post(
          `https://dsb-yf9s.onrender.com/suggestion/comment/${suggestionId}`,
          { content: comment.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the Bearer token
            },
          }
        );

        // Add the new comment returned from the server to the comments list
        setComments([...comments, response.data]);

        // Clear the input field after posting the comment
        setComment("");

      } catch (error) {
        if (error.response) {
          console.error("Error posting comment:", error.response.data);
          alert(`Error: ${error.response.data.error}`);
        } else {
          console.error("Error posting comment:", error);
          alert("Failed to post comment. Please try again.");
        }
      }
    } else {
      alert("Comment cannot be empty.");
    }
  };

  return (
    <div className="mb-6 gap-24 border border-gray-200 p-4 rounded-lg bg-gray-100">
      <div className="flex text-sm text-gray-500 mb-4">
        {/* Blue Circle with the Initial */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-800">
          <p className="text-white text-lg font-bold">
            {suggestion.by.charAt(0).toUpperCase()}
          </p>
        </div>
        {/* User Info */}
        <div className="flex flex-col mx-4">
          <span className="font-bold">{suggestion.by}</span>
          <span className="text-gray-400">@{suggestion.by}</span>
        </div>
      </div>

      {/* Suggestion Content */}
      <div className="text-base text-gray-700 leading-relaxed mb-6">
        <p
          onMouseEnter={() => speakText(suggestion.content)}
          onMouseLeave={stopSpeech}
        >
          {suggestion.content}
        </p>
      </div>

      {/* Time, Views, Tags */}
      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>{new Date(suggestion.createdAt).toLocaleString()}</span>
        <span>· {suggestion.views} Views</span>
        {suggestion.tags &&
          suggestion.tags.length > 0 &&
          suggestion.tags.map((tag, index) => (
            <span key={index} className="bg-gray-300 mb-2 rounded-full px-8 py-0.5">
              {tag}
            </span>
          ))}
      </div>
      <hr />

      {/* Upvotes and Comments Count */}
      <div className="flex gap-4 my-2 text-sm text-gray-600">
        <span
          className="hover:text-black gap-2 font-semibold cursor-pointer"
          onMouseEnter={() => speakText("Upvotes")}
          onMouseLeave={stopSpeech}
        >
          {upvotes} <span className="font-light">Upvotes</span>
        </span>
        <span
          className="hover:text-black gap-2 font-semibold cursor-pointer"
          onMouseEnter={() => speakText("Comments")}
          onMouseLeave={stopSpeech}
        >
          {comments.length} <span className="font-light">Comment</span>
        </span>
      </div>
      <hr />

      {/* Upvote and Comment Button */}
      <div className="flex gap-20 my-2 text-sm text-gray-600">
        <IoArrowUpCircleOutline
          className="text-2xl cursor-pointer hover:text-blue-500"
          onClick={handleUpvote}
          onMouseEnter={() => speakText("Upvote this suggestion")}
          onMouseLeave={stopSpeech}
        />
        <FaRegCommentDots
          className="text-2xl cursor-pointer hover:text-blue-500"
          onClick={toggleCommentSection}
          onMouseEnter={() => speakText("Open comment section")}
          onMouseLeave={stopSpeech}
        />
      </div>

      {/* Comment Section */}
      {isCommentVisible && (
        <div className="mt-4">
          <textarea
            className="w-full h-20 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onMouseEnter={() => speakText("Write your comment here")}
            onMouseLeave={stopSpeech}
          ></textarea>
          <button
            onClick={handleCommentPost}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            onMouseEnter={() => speakText("Post your comment")}
            onMouseLeave={stopSpeech}
          >
            Post Comment
          </button>
          {/* Display Comments */}
          <div className="mt-4">
            {comments.map((comment, index) => (
              <p key={index} className="bg-gray-200 p-2 rounded-md mb-2">
                {comment.content}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;
