import { ChangeEvent, useEffect, useState, useRef} from 'react';
import './app.scss';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { Todo } from './types';
import { Modal, Button } from 'antd';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentItem, setCurrentItem] = useState<Todo | null>(null);
  const [showWorkspace, setShowWorkspace] = useState(true);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState('');
  // const [db, setDb] = useState<IDBDatabase>({} as any as IDBDatabase);

  const dbRef = useRef<IDBDatabase>();
  
  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(response => response.json())
    // .then(response => setTodos(response));
    
    let openRequest = indexedDB.open('tasks', 1);

    openRequest.onupgradeneeded = function() {
      console.log('open db - onupgradeneeded');
      dbRef.current = openRequest.result;
      

      if (!dbRef.current.objectStoreNames.contains('tasks')) {
        dbRef.current.createObjectStore('tasks', {keyPath: 'task', autoIncrement: true});
      }
    }

    openRequest.onerror = function() {
      console.log('open db request - onerror');
    };

    openRequest.onsuccess = function(event: any) {
      console.log('open db request - onsuccess');

      dbRef.current = event.target.result;
      const transaction = event.target.result.transaction(['tasks']);

      const tasks = transaction.objectStore("tasks");
      // @ts-ignore
      tasks.getAll.onsuccess = function(event: any) {
        console.log(tasks.getAll());
        setTodos(event.target.value);
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
  }

  const editItem = (newObject: Todo) => {
    const positionItemToChange = todos.findIndex((todo: Todo) => todo.id === newObject.id);
    setTodos(todos.map((item1, index) => {
      if (positionItemToChange === index) {
        return newObject;
      }

      return item1;
    }));

    setCurrentItem(newObject);
  };

  const showModal = () => {
    setIsAddVisible(true);
  };

  const handleOkAdd = () => {
    setIsAddVisible(false);

    addTasks1();
  };

  const handleCancelAdd = () => {
    setIsAddVisible(false);
  };

  const addTasks1 = () =>  {
    const transaction: any = dbRef.current?.transaction('tasks', 'readwrite');
    const tasks = transaction.objectStore('tasks');
  
    const task = {
      userId: userId,
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
      console.log('Записано');
    }
  
    request.onerror = function() {
      console.log('Ошибка записи');
    }
  }

  // const addTasks = () =>  {
  //   setTodos([
  //     ...todos,
  //     {
  //       userId: userId,
  //       id: todos.length + 1,
  //       title: title,
  //       completed: false
  //     }
  //   ])
  // }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeUserId = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <Sidebar todos={todos} chooseItem={chooseItem} />
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
            deleteItem={deleteItem}
            editItem={editItem}
          />
        )}
      </div>
    </div>
  );
} 

export default App;
