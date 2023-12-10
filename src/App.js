import './App.css';
import Main from './components/main/Wrapper';
import FontAwesome from './components/font-awesome/FontAwesome';
import { useState } from 'react';

function App() {
  // const [dummy, setDummy] = useState(0);
  return (
    <div className="App sm:pt-4 md:pt-5 lg:pt-10 container">
      {/* <FontAwesome /> */}
      
      <Main />
    </div>
  );
}

export default App;
