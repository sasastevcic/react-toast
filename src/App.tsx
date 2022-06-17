import './App.css';
import { useToastStore } from './hooks/useToast';

function App() {
  const { trigger } = useToastStore();

  return (
    <div className="App">
      <button type="button" onClick={() => trigger('Success')}>Success</button>
      <button type="button" onClick={() => trigger('Error')}>Error</button>
    </div>
  );
}

export default App;
