import { useContext } from 'react';
import { Todo } from '../../types';
import './ListItems.scss';
import { Context } from '../../context';

type Props = {
  todos: Todo[],
};

export const ListItems: React.FC<Props> = ({ todos }) => {
  const { chooseItem } = useContext<any>(Context)
  
  return (
    <ul className="list">
    {todos.map((todo: Todo) => {
      return (
        <li
          key={todo.id}
          className="list__item"
          onClick={() => {
            const result: Todo | undefined = todos.find(item => item.id === todo.id);
            result !== undefined && chooseItem(result);
          }}
        >
          <h3>{todo.id}</h3>
          <div>{todo.title}</div>
        </li>
      );
    })}
  </ul>
  );
};
