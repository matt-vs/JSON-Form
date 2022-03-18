import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormComponent from './Components/Form'
import Merci from './Components/Merci';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/inscription" element={<FormComponent />} />
        <Route path="/merci/:name" element={<Merci />} />
      </Routes>
    </div>
  );
}

export default App;