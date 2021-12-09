import { ChangeEvent, useEffect, useState, useRef} from 'react';
import './app.scss';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { Todo } from './types';
import { Modal, Button } from 'antd';
import { Context } from './context';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentItem, setCurrentItem] = useState<Todo | null>(null);
  const [showWorkspace, setShowWorkspace] = useState(true);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState('');

  const dbRef = useRef<IDBDatabase>();
  
  useEffect(() => {
    let openRequest = indexedDB.open('tasks', 1);

    openRequest.onupgradeneeded = function() {
      dbRef.current = openRequest.result;
      
      if (!dbRef.current.objectStoreNames.contains('tasks')) {
        dbRef.current.createObjectStore('tasks', {keyPath: 'task', autoIncrement: true});
      }
    }

    openRequest.onerror = function() {
      alert('Не удалось получить доступ к IndexedDB');
    };

    openRequest.onsuccess = function(event: any) {
      dbRef.current = event.target.result;
      const transaction = event.target.result.transaction('tasks', 'readonly');
      const tasks = transaction.objectStore("tasks").getAll();
      tasks.onsuccess = function(event: any) {
        setTodos(event.target.result);
      }
    }
  }, []);

  const chooseItem = (item: Todo) => {
    setCurrentItem(item);
    setShowWorkspace(true);
  }

  const deleteItem = (id: number = 0) => {
    setTodos(todos.filter((item: Todo) => item.id !== id));
    setShowWorkspace(false);

    let transaction = dbRef.current?.transaction("tasks", "readwrite");
    let tasks = transaction?.objectStore("tasks");
    tasks?.delete(id);
    console.log('delete');
  }

  const editItem = (newObject: Todo) => {
    const positionItemToChange = todos.findIndex((todo: Todo) => todo.id === newObject.id);
    setTodos(todos.map((item, index) => {
      if (positionItemToChange === index) {
        return newObject;
      }

      return item;
    }));

    setCurrentItem(newObject);

    let openRequest = indexedDB.open('tasks', 1);

    openRequest.onupgradeneeded = function() {
      dbRef.current = openRequest.result;
      
      if (!dbRef.current.objectStoreNames.contains('tasks')) {
        dbRef.current.createObjectStore('tasks', {keyPath: 'task', autoIncrement: true});
      }
    }

    openRequest.onerror = function() {
      alert('Не удалось получить доступ к IndexedDB');
    };

    openRequest.onsuccess = function(event: any) {
      dbRef.current = event.target.result;
      const transaction = event.target.result.transaction('tasks', 'readwrite');
      const tasks = transaction.objectStore("tasks");
      tasks.clear();
      const positionToChange = todos.findIndex(item => item.id === newObject.id);

      const newTodos = todos.map((todo, index) => {
        if (index === positionToChange) {
          return newObject;
        }
        return todo;
      }); 

      newTodos.forEach(item => tasks.add(item));
      setTodos(newTodos);
    }
  };

  const showModal = () => {
    setIsAddVisible(true);
  };

  const handleOkAdd = () => {
    setIsAddVisible(false);

    addTasks();
  };

  const handleCancelAdd = () => {
    setIsAddVisible(false);
  };

  const addTasks = () =>  {
    if (title !== '') {
      const transaction: any = dbRef.current?.transaction('tasks', 'readwrite');
      const tasks = transaction.objectStore('tasks');
    
      const task = {
        userId: userId,
          // id: uuidv4(),
          id: todos.length + 1,
          title: title,
          completed: false
      };
    
      const request = tasks.add(task);
      setTodos([
        ...todos,
        task,
      ])
    
      request.onsuccess = function() {
        setUserId(1);
        setTitle('');
      }
    
      request.onerror = function() {
        alert('Не удалось добавить заметку');
      }
    } else {
      showModal();
    }
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeUserId = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(+event.target.value);
  };

  return (
    <Context.Provider value={{
      chooseItem, deleteItem, editItem,
    }}>
      <div className="App">
        <Sidebar todos={todos} />
        <div className="App__work">
          <Modal title="Новая заметка" visible={isAddVisible} onOk={handleOkAdd} onCancel={handleCancelAdd}>
            <form action="#" method="GET">
              <input
                type="number"
                value={userId} placeholder="userId"
                onChange={handleChangeUserId}
                required={true}
              />
              <input
                type="text"
                value={title} placeholder="Заметка"
                onChange={handleChangeTitle}
                required={true}
              />
            </form>
          </Modal>
  
          <Button
            type="primary"
            onClick={showModal}
          >
            Новая заметка
          </Button>
          {currentItem && showWorkspace && (
            <Workspace
              currentItem={currentItem}
            />
          )}
        </div>
      </div>
    </Context.Provider>
  );
} 

export default App;
