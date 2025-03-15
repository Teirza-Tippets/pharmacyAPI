const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// ALL MEDICATIONS
router.get('/', async (req, res) => {
    try {
      const db = req.app.locals.db;
      const medicationsCollection = db.collection('drugList'); 
      const medications = await medicationsCollection.find({}).toArray(); 
      res.json(medications);
    } catch (error) {
      console.error('Error fetching medications:', error);
      res.status(500).json({ message: 'Failed to fetch medications' });
    }
  });

//ONE MEDICATION BY ID
router.get('/:id', async (req, res) => {
    try {
      const id = `${req.params.id}`;
      const medicationId = new ObjectId(id);
    
      const db = req.app.locals.db;
      const medicationsCollection = db.collection('drugList'); 
      const medications = await medicationsCollection.findOne({ _id: medicationId }); 
      res.json(medications);
    } catch (error) {
      console.error('Error fetching medications:', error);
      res.status(500).json({ message: 'Failed to fetch medications' });
    }
  });


//CREATE
router.post('/', async (req, res) =>{
    try{
        const {brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class} = req.body;

        const db = req.app.locals.db;
        const drugListCollection = db.collection('drugList');

        const result = await drugListCollection.insertOne({
            brand_name, 
            generic_name, 
            manufacturer, 
            dosage_strengths, 
            dosage_forms, 
            drug_class
        })
        console.log('Inserted medication ID:', result.insertedId);
        res.status(201).json({ id: result.insertedId });
    }
    catch (error) {
        console.error('Error creating medication:', error);
        res.status(500).json({ message: 'Failed to create medication' });
      }
});

//UPDATE
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const medicationId = new ObjectId(id); 
        const { brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class } = req.body;
        const db = req.app.locals.db;
        const drugListCollection = db.collection('drugList');

        const result = await drugListCollection.updateOne(
            { _id: medicationId },
            { $set: { brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Medication not found or no changes made' });
        }

        res.status(200).json({ id: medicationId }); 
    } catch (error) {
        console.error('Error updating medication:', error);
        res.status(500).json({ message: 'Failed to update medication' });
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the ID format is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const db = req.app.locals.db;
      const medicationsCollection = db.collection('drugList'); 
  
      // Attempt to delete the medication by ID
      const result = await medicationsCollection.deleteOne({ _id: new ObjectId(id) });
  
      // If no document is deleted (contact not found)
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Medication not found' });
      }
  
      // Successfully deleted
      res.status(200).json({ message: 'Medication deleted successfully.' });
    } catch (error) {
      console.error('Error deleting medication:', error);
      res.status(500).json({ message: 'Failed to delete medication' });
    }
  });


  module.exports = router;
