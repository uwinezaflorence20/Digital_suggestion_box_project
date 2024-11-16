import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Layout from './Components/Layout';
import About from './Components/About';
import SuggestionSample from './Components/SuggestionSample';
import Signin from './Components/Signin';
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
        </Route>
        </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
