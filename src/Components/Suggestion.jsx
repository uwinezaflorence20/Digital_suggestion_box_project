import { IoArrowUpCircleOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";


const Suggestion = () => {
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

  const suggestionText = "Sample Suggestion from a Student";

  return (
    <div className="w-full  max-w-[90%] mx-auto my-6 border border-gray-300 rounded-lg p-6 bg-gray-100">
      {/* Heading indicating it's a sample suggestion */}
      <h2
        className="text-xl font-bold text-sky-800 mb-4"
        onMouseEnter={() => speakText(suggestionText)}  // Speak when mouse enters
        onMouseLeave={stopSpeech}  // Stop speech when mouse leaves
      >
        Sample Suggestion from a Student
      </h2>
      
      {/* Button to trigger the voice */}
      <button
        onMouseEnter={() => speakText(suggestionText)}  // Speak when mouse enters
        onMouseLeave={stopSpeech}  // Stop speech when mouse leaves
        className="text-sm font-medium text-sky-800 bg-white px-4 py-2 rounded-full hover:bg-sky-800 hover:text-white"
      >
        Listen to Suggestion Title
      </button>

      <div className="flex text-sm text-gray-500 mb-4 dark:bg-gray-800 dark:text-gray-200">
        <div className="size-10 rounded-full bg-sky-800">
          <p className="text-white mt-2 text-center">M</p>
        </div>
        <div className="flex flex-col mx-4">
          <span className="font-bold">2220***23</span>
          <span className="text-gray-400">@mmindi</span>
        </div>
      </div>

      <div className="text-base dark:bg-gray-800 dark:text-gray-200 text-gray-700 leading-relaxed mb-6">
        <p>
          I am writing to request an increase in the monthly living allowance
          for students at the University of Rwanda from RWF 40,000 to RWF
          100,000. The current allowance has not kept pace with the rising costs
          of living, including significant increases in food and accommodation
          prices, which have made it increasingly difficult for students to meet
          their basic needs. Many students are struggling to afford essentials,
          which negatively impacts their academic performance and overall
          well-being. An adjustment to RWF 100,000 would provide much-needed
          financial support, allowing students to focus on their studies without
          the burden of financial stress. Thank you for considering this
          important request.
        </p>
      </div>

      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>11:30 PM · 14/11/2024</span>
        <span>· 120 Views</span>
        <span className="bg-gray-300 mb-2 rounded-full px-8 py-0.5">dean</span>
        <span className="bg-gray-300 mb-2 rounded-full px-8 py-0.5">principal</span>
      </div>

      <hr />

      <div className="flex gap-4 my-2 text-sm text-gray-600">
        <span className="hover:text-black gap-2 font-semibold cursor-pointer">
          98 <span className="font-light">Upvotes</span>
        </span>
        <span className="hover:text-black gap-2 font-semibold cursor-pointer">
          61 <span className="font-light">Comments</span>
        </span>
      </div>

      <hr />

      <div className="flex gap-20 my-2 text-sm text-gray-600">
        <IoArrowUpCircleOutline
          className="text-2xl"
          onMouseEnter={() => speakText("Upvote button")}
          onMouseLeave={stopSpeech} // Stop speech when cursor leaves
        />
        <FaRegCommentDots
          className="text-2xl"
          onMouseEnter={() => speakText("Comment button")}
          onMouseLeave={stopSpeech} // Stop speech when cursor leaves
        />
      </div>
    </div>
  );
};

export default Suggestion;
