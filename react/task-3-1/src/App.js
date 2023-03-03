import './App.css';
import CounterClassComponent from './components/counter-class-component/counter-class-component';
import CounterFunctionalComponent from './components/counter-functional-component/counter-functional-component';

function App() {
  return (
    <div className="app">
      <h1>Counters</h1>
      <CounterClassComponent/>
      <h2>CounterClassComponent</h2>
      <CounterFunctionalComponent/>
      <h2>CounterFunctionalComponent</h2>
    </div>
  );
}

export default App;
