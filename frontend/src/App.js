
import './App.css';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className="App">
     <Route path="/" component= {Homepage} exact />
     <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
