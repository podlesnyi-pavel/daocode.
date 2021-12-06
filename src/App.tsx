import { useEffect, useState } from 'react';
import './app.scss';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentItem, setCurrentItem] = useState<Todo | null>(null);
  const [showWorkspace, setShowWorkspace] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(response => setTodos(response));
  }, []);

  const chooseItem = (item: Todo) => {
    setCurrentItem(item);
    setShowWorkspace(true);
  }

  const deleteItem = (id: number = 0) => {
    setTodos(todos.filter((item: Todo) => item.id !== id));
    setShowWorkspace(false);
  }

  const editItem = (item: Todo) => {
    console.log(todos);
    console.log(item);
    const newTodos = [...todos];
    const index = todos.findIndex((todo: Todo) => todo.id === item.id);
    setTodos(newTodos.splice(index, 1, item));
  };

  return (
    <div className="App">
      <Sidebar todos={todos} chooseItem={chooseItem} />
      {currentItem && showWorkspace && (
        <Workspace
          currentItem={currentItem}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      )}
    </div>
  );
} 

export default App;
