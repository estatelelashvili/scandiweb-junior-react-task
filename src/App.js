import './index.css';
import { NavBar } from './components/Navbar';
import { PLP } from './components/PLP';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <PLP />
      </div>
    );
  }
}

export default App;
