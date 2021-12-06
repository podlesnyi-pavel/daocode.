import { useEffect, useState } from 'react';
import { Todo } from '../../types';
import './ListItems.scss';

export const ListItems: React.FC = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(response => setTodos(() => response));
      
  }, []);

  return (
    <ul className="list">
    {todos.map((todo: Todo) => {
      return (
        <li key={todo.id} className="list__item">
          <h3>{todo.id}</h3>
          <div>{todo.title}</div>
        </li>
      );
    })}
  </ul>
  );
};

