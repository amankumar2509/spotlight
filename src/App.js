import './App.css';
import Feed from './components/feed';
import { Header } from './components/header';
import Login from './components/login';
import Sidebar from './components/sidebar';
import Widget from './components/widget';
import { useStateValue } from './providers/stateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {
        !user ? (<Login />) : (<> <Header />
          <div className='app__body'>
            <Sidebar />
            <Feed />
            <Widget />
          </div></>)
      }
    </div>
  );
}

export default App;
