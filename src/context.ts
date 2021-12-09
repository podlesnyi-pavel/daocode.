import React from 'react';
import { Todo } from './types';

export const Context = React.createContext({
  chooseItem: (item: Todo) => {},
  deleteItem: (id: number) => {},
  editItem: (item: Todo) => {},
});
