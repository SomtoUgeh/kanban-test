import FullBoard from "./components/Board";
import BoardProvider from "./contexts/BoardContext";

function App() {
  return (
    <BoardProvider>
      <FullBoard />
    </BoardProvider>
  );
}

export default App;
