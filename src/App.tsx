import "./App.css";
import { Toast, useToastStore } from "./hooks/useToast";

function App() {
  const { dispatch } = useToastStore();

  return (
    <div className="App">
      <button type="button" onClick={() => dispatch(Toast.Success)}>
        Success
      </button>
      <button type="button" onClick={() => dispatch(Toast.Error)}>
        Error
      </button>
    </div>
  );
}

export default App;
