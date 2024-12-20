import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentForm = () => {
  const [comment, setComment] = useState(""); // For comment content
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages
  const [success, setSuccess] = useState(null); // Success messages
  const [showForm, setShowForm] = useState(false); // To toggle the form visibility
  const [comments, setComments] = useState([]); // State for storing fetched comments

  const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ1MzQwNjcsInJlZ251bWJlciI6MjIyMDAxMjEzLCJ1c2VybmFtZSI6ImZpZmkifQ.v0c5M1IOtsUG5XyjBkupnAXYxaBWF0x_cbrkEYLQespfvVq4qegRDlScA3L_RecxZAjsuSpHmlFK6EB7CJO3wLctz9YKw17p650hZhPNSmHxaUI__QaGk6Jp7HwhXbpX3un64GBkKv6kORsYZcR3uPkeehuZhS5WlPffN7I1QbR6ZLag9gWbHLFb9yvwsrjbkMqTazOP94qwwta6ZjRauUsn2EJpJI5a1ifPHqXI9iI4qQYUrzI9bUXBey-Vn7NFB6J7u1A4065A7HZS0zBjB5u41KLM7u-Wf2sT3j9fTkNT-aw1fyoVCKAIVrAyqDzZgLL-Lb9hNyzLmRm4N05dfA"; // Replace with a valid token
  const suggestionId = "675879e91cffdc4a6a1276a1"; // Replace with your suggestion ID

  // Log to ensure the component is rendered
  useEffect(() => {
    console.log("CommentForm component mounted.");
    fetchComments(); // Fetch comments when the component mounts
  }, []);

  // Function to fetch existing comments
  const fetchComments = async () => {
    try {
      console.log("Fetching comments...");
      const response = await axios.get(
        `https://dsb-yf9s.onrender.com/suggestion/comment/${suggestionId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Fetched comments:", response.data);
      setComments(response.data.comments); // Assuming the response has a 'comments' array
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again later.");
    }
  };

  // Handle comment input
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted. Comment:", comment);

    // Prevent empty submissions
    if (!comment.trim()) {
      setError("Please write a comment before submitting.");
      console.log("Empty comment - submission stopped.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Sending API request...");
      const response = await axios.post(
        `https://dsb-yf9s.onrender.com/suggestion/comment/${suggestionId}`,
        { content: comment },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      // Show success message and clear form
      setSuccess("Comment submitted successfully!");
      setComment(""); // Clear comment box
      setShowForm(false); // Optionally hide form

      // Fetch the updated comments after submission
      fetchComments();

    } catch (error) {
      console.error("Error:", error);

      // Show meaningful error message
      if (error.response) {
        console.error("Backend error:", error.response.data);
        setError(error.response.data.message || "Error submitting comment.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
      console.log("Request finished.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Button to show/hide the form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Post a Comment
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Post a Comment
          </h2>

          {/* Comment Input */}
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-3 border border-gray-300 rounded-md resize-none mb-4"
            placeholder="Write your comment here..."
            rows="5"
          />

          {/* Display Error or Success */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      )}

      {/* Display Comments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Comments</h3>
        <ul className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="mb-3 p-3 border-b border-gray-200">
                <p>{comment.content}</p>
                <small className="text-gray-500">Posted by {comment.username}</small>
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommentForm;
