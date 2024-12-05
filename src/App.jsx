import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import About from "./Components/About";
import SuggestionSample from "./Components/SuggestionSample";
import Signin from "./Components/Signin";
import SignUp from "./Components/SignUp";
import RoleSelection from "./Components/RoleSelection";
import AdminSignIn from "./Components/AdminSignIn";

import Home2 from "./Components/Home2";
import Layout2 from "./Components/Layout2";
import Suggestion from "./Components/Suggestion";
import InputSuggestion from "./Components/InputSuggetion";
import Pending from "./Components/Pending";
import Queue from "./Components/Queue";
import Resolved from "./Components/Resolved";
import MySuggestion from "./Components/MySuggestion";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Parent Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="suggestion" element={<SuggestionSample />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="selection" element={<RoleSelection/>} />
            <Route path="adminsignin" element={<AdminSignIn/>} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<Layout2 />}>
            {/* Use relative paths for nested routes */}
            <Route index element={<Home2 />} />
            <Route path="suggestion" element={<Suggestion />} />
            <Route path="inputsuggestion" element={<InputSuggestion />} />
            <Route path="pending" element={<Pending />} />
            <Route path="queue" element={<Queue />} />
            <Route path="resolved" element={<Resolved />} />
            <Route path="mysuggestion" element={<MySuggestion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
