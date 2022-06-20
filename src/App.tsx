import "./App.css";
import { StyledToastButton } from "./App.styles";
import { Toast, useToastStore } from "./hooks/useToast";

function App() {
  const { dispatch } = useToastStore();

  return (
    <div className="App">
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Success)} $buttonTheme={Toast.Success}>
        Success
      </StyledToastButton>
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Info)} $buttonTheme={Toast.Info}>
        Info
      </StyledToastButton>
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Error)} $buttonTheme={Toast.Error}>
        Error
      </StyledToastButton>
    </div>
  );
}

export default App;
