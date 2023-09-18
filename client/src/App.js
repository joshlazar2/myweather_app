import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Landing from './components/Landing';
import Nav from './components/Nav';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
