import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/gallery" element={<h1>Gallery Page</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
