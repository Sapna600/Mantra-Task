// App.js
import React, { useState } from 'react';
import { Modal, Button, Input, Form, Select } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import AgeGroup from './AgeGroup';

const { Search } = Input;
const { Option } = Select;

const initialData = [
  { id: '1', name: 'Person 1', age: 16, email: 'person1@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Person 2', age: 18, email: 'person2@example.com', phone: '987-654-3210' },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  const handleSort = (value) => {
    const validSortOptions = ["name-asc", "name-desc", "age-asc", "age-desc"];
    if (!validSortOptions.includes(value)) {
      console.error("Invalid sort option");
      return;
    }

    const [sortOption, sortOrder] = value.split('-');
    setSortOption(sortOption);
    setSortOrder(sortOrder);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    const personToEdit = data.find((person) => person.id === id);
    form.setFieldsValue(personToEdit);
    setEditingPersonId(id);
    setIsModalVisible(true);
  };

  const handleDrag = (id) => {
    setEditingPersonId(id);
  };

  const handleDrop = (index, targetAgeRange) => {
    const draggedItemIndex = data.findIndex((item) => item.id === editingPersonId);
    const updatedData = [...data];
    const [draggedItem] = updatedData.splice(draggedItemIndex, 1);
    const [targetStartAge, targetEndAge] = targetAgeRange.split('-');
    const newAge = Math.max(parseInt(targetStartAge), Math.min(draggedItem.age, parseInt(targetEndAge)));
  
    if (newAge !== draggedItem.age) {
      draggedItem.age = newAge;
      updatedData.splice(index, 0, draggedItem);
    }
  
    setData(updatedData);
    setEditingPersonId(null);
    setIsModalVisible(false);
    form.resetFields();
  };
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingPersonId) {
        const updatedData = data.map((person) =>
          person.id === editingPersonId ? { ...person, ...values } : person
        );
        setData(updatedData);
        setEditingPersonId(null);
      } else {
        const newData = [
          ...data,
          { ...values, id: (data.length + 1).toString() }
        ];
        setData(newData);
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingPersonId(null);
  };

  const getSortedData = () => {
    if (!sortOption) {
      return data;
    }

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[sortOption];
      const valueB = b[sortOption];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return sortedData;
  };

  const filteredData = getSortedData().filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={{ marginTop: "20px", padding: "20px", background: "#f0f0f0" }}>
      <Search
        placeholder="Search by name"
        allowClear
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Select
        placeholder="Sort by"
        style={{ width: 120, marginBottom: 16, marginRight: 16 }}
        onChange={handleSort}
      >
        <Option value="name-asc">Name (A-Z)</Option>
        <Option value="name-desc">Name (Z-A)</Option>
        <Option value="age-asc">Age (Ascending)</Option>
        <Option value="age-desc">Age (Descending)</Option>
      </Select>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal title={editingPersonId ? 'Edit Person' : 'Add Person'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingPersonId ? 'Save' : 'Add'}
          </Button>
        </Form>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <AgeGroup
          data={filteredData}
          ageRange="1-18"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <AgeGroup
          data={filteredData}
          ageRange="19-24"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <AgeGroup
          data={filteredData}
          ageRange="25-45"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <AgeGroup
          data={filteredData}
          ageRange="46-100"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
    </div>
  );
};

export default App;
