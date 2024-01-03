import React from 'react';
import { Card, Button } from 'antd';

const PersonCard = ({ item, handleEdit, handleDelete, handleDrag }) => {
  return (
    <Card style={{ marginBottom: '10px' }} onDragStart={() => handleDrag(item.id)} draggable>
      <Button type="link" onClick={() => handleEdit(item.id)}>
        Edit
      </Button>
      <Button type="link" danger onClick={() => handleDelete(item.id)}>
        Delete
      </Button>
      <p>Name: {item.name}</p>
      <p>Age: {item.age}</p>
      <p>Email: {item.email}</p>
      <p>Phone: {item.phone}</p>
    </Card>
  );
};

export default PersonCard;
