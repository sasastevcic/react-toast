import "./App.css";
import { StyledToastButton } from "./App.styles";
import { Toast, useToastStore } from "./hooks/useToast";

function App() {
  const { dispatch } = useToastStore();

  return (
    <div className="App" style={{ backgroundImage: 'url("/background.jpg")'}}>
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Success, { title: 'Some random title' })} $buttonTheme={Toast.Success}>
        Success
      </StyledToastButton>
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Info, { description: 'Some description' })} $buttonTheme={Toast.Info}>
        Info
      </StyledToastButton>
      <StyledToastButton type="button" onClick={() => dispatch(Toast.Error, { isPersistent: true })} $buttonTheme={Toast.Error}>
        Error
      </StyledToastButton>
    </div>
  );
}

export default App;
