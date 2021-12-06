import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types';
import './workspace.scss';
import { Modal, Button } from 'antd';

type Props = {
  currentItem: Todo,
  deleteItem: (id: number) => void;
  editItem: (item: Todo) => void;
};

export const Workspace: React.FC<Props> = ({ currentItem, deleteItem, editItem }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [userId, setId] = useState(currentItem.userId);
  const [title, setTitle] = useState(currentItem.title);

  const showEdit = () => {
    setIsEditVisible(true);
  };
  const handleOkEdit = () => {
    setIsEditVisible(false);

    editItem({
      ...currentItem,
      userId,
      title,
    })

    // fetch(`https://jsonplaceholder.typicode.com/todos/ + ${currentItem.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     id: currentItem.id,
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    // .then((response) => response.json())
    // .then((json) => console.log(json));
  };

  const handleCancelEdit = () => {
    setIsEditVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    deleteItem(currentItem.id);

    // fetch(`https://jsonplaceholder.typicode.com/todos/ + ${currentItem.id}`, {
    //   method: 'DELETE',
    // });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="workspace">
  
      {currentItem && (
        <div>
          <div>{currentItem.userId}</div>
          <div>{currentItem.title}</div>
  
          <div className="workspace__buttons">
            <Button
                type="primary"
                onClick={showEdit}
              >
              Edit
            </Button>
            <Modal title="Edit" visible={isEditVisible} onOk={handleOkEdit} onCancel={handleCancelEdit}>
              <input
                type="number"
                value={userId} placeholder="id"
                onChange={changeId}
              />
              <input
                type="text"
                value={title} placeholder="title"
                onChange={changeTitle}
              />
            </Modal>
  
            <Button
              type="primary"
              onClick={showModal}
            >
              Delete
            </Button>
            <Modal title="Delete?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};
