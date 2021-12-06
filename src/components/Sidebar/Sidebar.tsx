import { Todo } from '../../types';
import './sidebar.scss';
import { ListItems } from '../ListItems';

type Props = {
  todos: Todo[],
  chooseItem: (item: Todo) => void,
};

export const Sidebar: React.FC<Props> = ({ todos, chooseItem }) => (
  <div className="sidebar">
    <ListItems todos={todos} chooseItem={chooseItem} />
  </div>
);
