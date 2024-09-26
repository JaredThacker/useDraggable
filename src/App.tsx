import "./App.css";
import useDraggable from "./hooks/useDraggable";

function App() {
  useDraggable("box");

  return (
    <main>
      <div id="container" className="container">
        <div id="box" className="box"></div>
      </div>
    </main>
  );
}

export default App;
