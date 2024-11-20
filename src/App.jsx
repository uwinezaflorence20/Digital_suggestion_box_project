import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Layout from './Components/Layout';
import About from './Components/About';
import SuggestionSample from './Components/SuggestionSample';
import Signin from './Components/Signin';
import SignUp from './Components/SignUp';



import Student from './Components/Student';
import Layout2 from './Components/Layout2';
import Suggestion from './Components/Suggestion';
import InputSuggestion from './Components/InputSuggetion';
import Pending from './Components/Pending';
function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/suggestion" element={<SuggestionSample />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp/>} />
        </Route>
        <Route path="/" element={<Layout2 />}>
          <Route path="/student"element={<Student />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/inputsuggestion" element={<InputSuggestion/>} />
          <Route path="/pending" element={<Pending/>} />
        </Route>
        </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
