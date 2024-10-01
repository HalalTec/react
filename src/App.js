import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import PopReg from './component/PopReg';



function App() {
  return (
    <Router>
       <div className="App">
      <Routes>
        <Route path="/" element={<PopReg />} /> 
      </Routes>
    </div>
    </Router>
   
  );
}

export default App;
