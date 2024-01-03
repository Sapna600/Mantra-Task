import React from 'react';
import PersonCard from './PersonCard';

const AgeGroup = ({ data, ageRange, handleDelete, handleEdit, handleDrag, handleDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{ width: '250px', margin: '10px' }}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, ageRange)}
    >
      <h3>{`Age ${ageRange}`}</h3>
      {data
        .filter((item) => {
          const [lowerBound, upperBound] = ageRange.split('-').map(Number);
          const age = parseInt(item.age);
          return age >= lowerBound && age <= upperBound;
        })
        .map((item) => (
          <PersonCard
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDrag={handleDrag}
          />
        ))}
    </div>
  );
};

export default AgeGroup;
