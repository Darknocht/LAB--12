import './App.css'
import {MenuBar} from "./components/MenuBar.tsx";
import {MainPanel} from "./components/MainPanel.tsx";
import {FooterBar} from "./components/FooterBar.tsx";

function App() {

  return (
    <div className="container">
        <MenuBar/>
        <MainPanel/>
        <FooterBar/>
    </div>
  )
}

export default App
