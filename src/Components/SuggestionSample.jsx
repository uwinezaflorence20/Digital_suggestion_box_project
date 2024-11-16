
import "../index.css"; 
const SuggestionSample = () => {
  return (
    <div className="post-card">
      <div className="post-header">
        <span className="user-id">2220***23</span>
        <span className="username">@mmindi</span>
      </div>
      <div className="post-content">
        <p>
          I am writing to request an increase in the monthly living allowance for
          students at the University of Rwanda from RWF 40,000 to RWF 100,000. The
          current allowance has not kept pace with the rising costs of living,
          including significant increases in food and accommodation prices, which
          have made it increasingly difficult for students to meet their basic
          needs. Many students are struggling to afford essentials, which negatively
          impacts their academic performance and overall well-being. An adjustment
          to RWF 100,000 would provide much-needed financial support, allowing
          students to focus on their studies without the burden of financial stress.
          Thank you for considering this important request.
        </p>
      </div>
      <div className="post-footer">
        <span className="timestamp">11:30 PM · 14/11/2024</span>
        <span className="views">· 120 Views</span>
      </div>
      <div className="post-interactions">
        <span className="votes">98 Upvotes</span>
        <span className="comments">61 Comments</span>
      </div>
    </div>
  );
};

export default SuggestionSample;
