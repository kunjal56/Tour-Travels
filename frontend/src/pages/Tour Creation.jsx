import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/tourForm.css'; // Optional CSS file for styling

const TourForm = ({ onSubmit }) => {
   const [tourData, setTourData] = useState({
      title: '',
      description: '',
      location: '',
      price: '',
      duration: '',
      maxGroupSize: '',
      featured: false,
      images: [''],
      category: '',
      guide: '',
      startDate: '',
      itinerary: [{ day: 1, activity: '' }],
   });

   // Handle changes in inputs
   const handleChange = (e) => {
      const { id, value, type, checked } = e.target;
      setTourData((prev) => ({
         ...prev,
         [id]: type === 'checkbox' ? checked : value,
      }));
   };

   // Handle changes in dynamic fields (images and itinerary)
   const handleDynamicChange = (e, index, field) => {
      const value = e.target.value;
      setTourData((prev) => {
         const updatedArray = [...prev[field]];
         updatedArray[index] = value;
         return { ...prev, [field]: updatedArray };
      });
   };

   const handleItineraryChange = (e, index, field) => {
      const value = e.target.value;
      setTourData((prev) => {
         const updatedItinerary = [...prev.itinerary];
         updatedItinerary[index][field] = value;
         return { ...prev, itinerary: updatedItinerary };
      });
   };

   // Add new fields for dynamic sections
   const addImageField = () => {
      setTourData((prev) => ({ ...prev, images: [...prev.images, ''] }));
   };

   const addItineraryDay = () => {
      setTourData((prev) => ({
         ...prev,
         itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }],
      }));
   };

   // Remove fields in dynamic sections
   const removeImageField = (index) => {
      setTourData((prev) => {
         const updatedImages = [...prev.images];
         updatedImages.splice(index, 1);
         return { ...prev, images: updatedImages };
      });
   };

   const removeItineraryDay = (index) => {
      setTourData((prev) => {
         const updatedItinerary = [...prev.itinerary];
         updatedItinerary.splice(index, 1);
         return { ...prev, itinerary: updatedItinerary };
      });
   };

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(tourData); // Pass the tourData to the parent component or API
   };

   return (
      <Container>
         <Row>
            <Col lg="8" className="m-auto">
               <h2>Create a Tour</h2>
               <Form onSubmit={handleSubmit}>
                  <FormGroup>
                     <Label for="title">Title</Label>
                     <Input type="text" id="title" value={tourData.title} onChange={handleChange} required />
                  </FormGroup>

                  <FormGroup>
                     <Label for="description">Description</Label>
                     <Input
                        type="textarea"
                        id="description"
                        value={tourData.description}
                        onChange={handleChange}
                        required
                     />
                  </FormGroup>

                  <FormGroup>
                     <Label for="location">Location</Label>
                     <Input type="text" id="location" value={tourData.location} onChange={handleChange} required />
                  </FormGroup>

                  <FormGroup>
                     <Label for="price">Price</Label>
                     <Input type="number" id="price" value={tourData.price} onChange={handleChange} required />
                  </FormGroup>

                  <FormGroup>
                     <Label for="duration">Duration</Label>
                     <Input type="text" id="duration" value={tourData.duration} onChange={handleChange} required />
                  </FormGroup>

                  <FormGroup>
                     <Label for="maxGroupSize">Max Group Size</Label>
                     <Input
                        type="number"
                        id="maxGroupSize"
                        value={tourData.maxGroupSize}
                        onChange={handleChange}
                        required
                     />
                  </FormGroup>

                  <FormGroup>
                     <Label for="category">Category</Label>
                     <Input
                        type="select"
                        id="category"
                        value={tourData.category}
                        onChange={handleChange}
                        required
                     >
                        <option value="">Select a category</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Relaxation">Relaxation</option>
                     </Input>
                  </FormGroup>

                  <FormGroup>
                     <Label for="guide">Tour Guide</Label>
                     <Input type="text" id="guide" value={tourData.guide} onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                     <Label for="startDate">Start Date</Label>
                     <Input type="date" id="startDate" value={tourData.startDate} onChange={handleChange} />
                  </FormGroup>

                  <FormGroup check>
                     <Label check>
                        <Input type="checkbox" id="featured" checked={tourData.featured} onChange={handleChange} /> Featured
                     </Label>
                  </FormGroup>

                  <FormGroup>
                     <Label>Images</Label>
                     {tourData.images.map((image, index) => (
                        <div key={index} className="d-flex mb-2">
                           <Input
                              type="text"
                              value={image}
                              onChange={(e) => handleDynamicChange(e, index, 'images')}
                              placeholder="Image URL"
                              required
                           />
                           <Button color="danger" onClick={() => removeImageField(index)} className="ms-2">
                              Remove
                           </Button>
                        </div>
                     ))}
                     <Button color="primary" onClick={addImageField}>
                        Add Image
                     </Button>
                  </FormGroup>

                  <FormGroup>
                     <Label>Itinerary</Label>
                     {tourData.itinerary.map((day, index) => (
                        <div key={index} className="mb-3">
                           <Input
                              type="number"
                              value={day.day}
                              onChange={(e) => handleItineraryChange(e, index, 'day')}
                              placeholder="Day"
                              required
                           />
                           <Input
                              type="text"
                              value={day.activity}
                              onChange={(e) => handleItineraryChange(e, index, 'activity')}
                              placeholder="Activity"
                              required
                           />
                           <Button color="danger" onClick={() => removeItineraryDay(index)} className="mt-2">
                              Remove Day
                           </Button>
                        </div>
                     ))}
                     <Button color="primary" onClick={addItineraryDay}>
                        Add Day
                     </Button>
                  </FormGroup>

                  <Button color="success" type="submit">
                     Create Tour
                  </Button>
               </Form>
            </Col>
         </Row>
      </Container>
   );
};

export default TourForm;
