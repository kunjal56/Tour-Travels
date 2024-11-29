import React from 'react';
import TourForm from './TourForm';

const AddTour = () => {
   const handleFormSubmit = (data) => {
      console.log(data); // Log or send data to the server
      // Example: POST request to your backend API
      fetch('http://localhost:8000/api/v1/tours', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
      })
         .then((response) => response.json())
         .then((result) => console.log('Tour Created:', result))
         .catch((err) => console.error('Error:', err));
   };

   return (
      <div>
         <h1>Add a New Tour</h1>
         <TourForm onSubmit={handleFormSubmit} />
      </div>
   );
};

export default AddTour;
