const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medications
 *   description: pharmacyAPI medication database
 */

/**
 * @swagger
 * /medications:
 *   get:
 *     summary: Get all medications
 *     tags: [Medications]
 *     responses:
 *       200:
 *         description: A list of medications
 *       500:
 *         description: Failed to fetch medications
 */
router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const medicationsCollection = db.collection('drugList'); 
        const medications = await medicationsCollection.find({}).toArray(); 
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medications' });
    }
});

/**
 * @swagger
 * /medications/{id}:
 *   get:
 *     summary: Get a medication by ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Medication ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medication data
 *       500:
 *         description: Failed to fetch medication
 */
router.get('/:id', async (req, res) => {
    try {
        const id = `${req.params.id}`;
        const medicationId = new ObjectId(id);
        const db = req.app.locals.db;
        const medicationsCollection = db.collection('drugList'); 
        const medications = await medicationsCollection.findOne({ _id: medicationId }); 
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medications' });
    }
});

/**
 * @swagger
 * /medications:
 *   post:
 *     summary: Create a new medication
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *               generic_name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               dosage_strengths:
 *                 type: string
 *               dosage_forms:
 *                 type: string
 *               drug_class:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medication created
 *       500:
 *         description: Failed to create medication
 */
router.post('/', async (req, res) => {
    try {
        const { brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class } = req.body;
        const db = req.app.locals.db;
        const drugListCollection = db.collection('drugList');
        const result = await drugListCollection.insertOne({ brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class });
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create medication' });
    }
});

/**
 * @swagger
 * /medications/{id}:
 *   put:
 *     summary: Update a medication
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *               generic_name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               dosage_strengths:
 *                 type: string
 *               dosage_forms:
 *                 type: string
 *               drug_class:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medication updated
 *       404:
 *         description: Medication not found
 *       500:
 *         description: Failed to update medication
 */
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const medicationId = new ObjectId(id); 
        const { brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class } = req.body;
        const db = req.app.locals.db;
        const drugListCollection = db.collection('drugList');
        const result = await drugListCollection.updateOne({ _id: medicationId }, { $set: { brand_name, generic_name, manufacturer, dosage_strengths, dosage_forms, drug_class } });
        res.status(200).json({ id: medicationId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update medication' });
    }
});

/**
 * @swagger
 * /medications/{id}:
 *   delete:
 *     summary: Delete a medication
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medication deleted
 *       404:
 *         description: Medication not found
 *       500:
 *         description: Failed to delete medication
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const db = req.app.locals.db;
        const medicationsCollection = db.collection('drugList');
        const result = await medicationsCollection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Medication deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete medication' });
    }
});

module.exports = router;

