const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');

// GET /contacts
router.get('/', contactController.getContacts);

// GET /contacts/:id
router.get('/:id', contactController.getContactById);

// POST /contacts
router.post('/', contactController.createContact);

// PUT /contacts/:id
router.put('/:id', contactController.updateContact);

// DELETE /contacts/:id
router.delete('/:id', contactController.deleteContact);

module.exports = router;
