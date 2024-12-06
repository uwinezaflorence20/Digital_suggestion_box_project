import { useState } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";

const Pending = () => {
  // State to track upvotes and comment visibility
  const [upvotes, setUpvotes] = useState(140);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState(""); // Tracks the input comment
  const [comments, setComments] = useState([]); // Stores the list of comments

  // Function to trigger speech
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US'; // You can change the language to your preference
    window.speechSynthesis.speak(speech);
  };

  // Function to stop speech
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const toggleCommentSection = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleCommentPost = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment(""); // Clear input after posting
    }
  };

  return (
    <div className="w-full mt-28 max-w-[90%] mx-auto my-6 border border-gray-300 rounded-lg p-6 bg-gray-100">
      <div className="flex text-sm text-gray-500 mb-4">
        <div className="size-10 rounded-full bg-sky-800">
          <p className="text-white mt-2 text-center">M</p>
        </div>
        <div className="flex flex-col mx-4">
          <span className="font-bold">2220***23</span>
          <span className="text-gray-400">@mmindi</span>
        </div>
      </div>
      
      {/* Paragraph to be read aloud */}
      <div className="text-base text-gray-700 leading-relaxed mb-6">
        <p
          onMouseEnter={() =>
            speakText(
              "I am writing to request an increase in the monthly living allowance for students at the University of Rwanda from RWF 40,000 to RWF 100,000. The current allowance has not kept pace with the rising costs of living, including significant increases in food and accommodation prices, which have made it increasingly difficult for students to meet their basic needs. Many students are struggling to afford essentials, which negatively impacts their academic performance and overall well-being. An adjustment to RWF 100,000 would provide much-needed financial support, allowing students to focus on their studies without the burden of financial stress. Thank you for considering this important request."
            )
          }
          onMouseLeave={stopSpeech}
        >
          I am writing to request an increase in the monthly living allowance for students at the University of Rwanda from RWF 40,000 to RWF 100,000. The current allowance has not kept pace with the rising costs of living, including significant increases in food and accommodation prices, which have made it increasingly difficult for students to meet their basic needs. Many students are struggling to afford essentials, which negatively impacts their academic performance and overall well-being. An adjustment to RWF 100,000 would provide much-needed financial support, allowing students to focus on their studies without the burden of financial stress. Thank you for considering this important request.
        </p>
      </div>
      
      {/* Time, Views, Tags */}
      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>11:30 PM · 14/11/2024</span>
        <span>· 120 Views</span>
        <span className="bg-gray-300 mb-2 rounded-full px-8 py-0.5">dean</span>
        <span className="bg-gray-300 mb-2 rounded-full px-8 py-0.5">principal</span>
      </div>
      <hr></hr>
      
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
      <hr></hr>
      
      {/* Upvote and Comment Button */}
      <div className="flex gap-20 my-2 text-sm text-gray-600">
        {/* Upvote Button */}
        <IoArrowUpCircleOutline
          className="text-2xl cursor-pointer hover:text-blue-500"
          onClick={handleUpvote}
          onMouseEnter={() => speakText("Upvote this suggestion")}
          onMouseLeave={stopSpeech}
        />
        
        {/* Comment Button */}
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
                {comment}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
