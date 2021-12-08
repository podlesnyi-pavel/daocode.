import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types';
import { Modal, Button } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

type Props = {
  currentItem: Todo,
  deleteItem: (id: number) => void;
  editItem: (item: Todo) => void;
};

export const Workspace: React.FC<Props> = ({ currentItem, deleteItem, editItem }) => {
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
  };

  const handleCancelEdit = () => {
    setIsEditVisible(false);
  };

  const changeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  
  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItem(currentItem.id);
      },
    });
  }

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
  
            <Button onClick={showDeleteConfirm} type="dashed">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
