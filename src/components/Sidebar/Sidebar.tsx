import { Todo } from '../../types';
import './sidebar.scss';
import { ListItems } from '../ListItems';

type Props = {
  todos: Todo[]
};

export const Sidebar: React.FC<Props> = ({ todos }) => (
  <div className="sidebar">
    <ListItems todos={todos} />
  </div>
);
