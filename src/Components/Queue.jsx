import React, { useState, useEffect } from "react";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import axios from "axios";

const Queue = () => {
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from the backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(
          "https://dsb-yf9s.onrender.com/suggestion",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

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

const SuggestionCard = ({ suggestion }) => {
  const [upvotes, setUpvotes] = useState(suggestion.upvotes || 0);
  const [userVote, setUserVote] = useState(null); // Track user's current vote
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // To store the comments for this suggestion
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch comments for the current suggestion
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://dsb-yf9s.onrender.com/suggestion/${suggestion.id}/comments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data); // Store fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isCommentVisible) {
      fetchComments();
    }
  }, [isCommentVisible, suggestion.id, token]);

  // Handle voting (upvote or downvote)
  const handleVote = async (voteType) => {
    try {
      const response = await axios.post(
        `https://dsb-yf9s.onrender.com/suggestion/vote/${voteType}`,
        { suggestionId: suggestion.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUpvotes((prev) => (voteType === "upvote" ? prev + 1 : prev - 1));
      setUserVote(voteType);
    } catch (err) {
      console.error("Error voting:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const toggleCommentSection = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      setError("Please write a comment before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `https://dsb-yf9s.onrender.com/suggestion/comment/${suggestion.id}`,
        { content: comment.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      setSuccess("Comment submitted successfully!");
      setComment("");

      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 gap-24 border border-gray-200 p-4 rounded-lg bg-gray-100 shadow-lg">
      <div className="flex text-sm text-gray-500 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-800">
          <p className="text-white text-lg font-bold">
            {suggestion.by.charAt(0).toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col mx-4">
          <span className="font-bold text-gray-800">{suggestion.by}</span>
          <span className="text-gray-400">@{suggestion.by}</span>
        </div>
      </div>

      <div className="text-base text-gray-700 leading-relaxed mb-6">
        {suggestion.content}
      </div>

      <div className="flex gap-4 my-2 text-sm text-gray-600">
        <span>{upvotes} Upvotes</span>
        <button
          className={`text-blue-600 hover:text-blue-800 ${userVote === "upvote" ? "font-bold" : ""}`}
          onClick={() => handleVote("upvote")}
          disabled={userVote === "upvote"}
        >
          <IoArrowUpCircleOutline size={24} />
        </button>
        <button
          className={`text-red-600 hover:text-red-800 ${userVote === "downvote" ? "font-bold" : ""}`}
          onClick={() => handleVote("downvote")}
          disabled={userVote === "downvote"}
        >
          <IoArrowDownCircleOutline size={24} />
        </button>
      </div>

      <hr />

      <div className="flex gap-4 my-2 text-sm text-gray-600">
        <span onClick={toggleCommentSection} className="cursor-pointer">
          {comments.length} Comments
        </span>
      </div>
      <hr />

      {isCommentVisible && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </p>

          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md mb-2">
              <p className="font-bold text-gray-800">{comment.by}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-gray-500 text-sm">
                Posted on: {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

          <textarea
            className="w-full h-20 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            onClick={handleSubmitComment}
            disabled={loading}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Queue;
