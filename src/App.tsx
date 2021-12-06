import './app.scss';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';

const App: React.FC = () => (
  <div className="App">
    <Sidebar />
    <Workspace />
  </div>
);

export default App;
