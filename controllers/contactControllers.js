const { validationResult } = require('express-validator');
const Contact = require('../models/contact');

// GET /contacts
exports.getContacts = (req, res, next) => {
  Contact.find({})
    .then(contacts => res.json(contacts))
    .catch(err => next(err));
};

// GET /contacts/:id
exports.getContactById = (req, res, next) => {
  const id = req.params.id;

  Contact.findById(id)
    .then(contact => {
      if (!contact) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.json(contact);
      }
 })
    .catch(err => next(err));
};

// POST /contacts
exports.createContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }

  const contact = new Contact(req.body);

  Contact.findOne({ $or: [{ email: contact.email }, { phone: contact.phone }] })
  .then(duplicateContact => {
    if (duplicateContact) {
      res.status(400).json({ error: 'Contact with the same email and phone already exists' });
    } else {
      console.log(contact)
      contact.save().then(savedContact => res.json(savedContact));
    }
  })
  .catch(err => next(err));

};

// PUT /contacts/:id
exports.updateContact = (req, res, next) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }

  const updatedContact = req.body;

  Contact.findByIdAndUpdate(id, updatedContact, { new: true })
    .then(contact=>{
      if (!contact) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.json(contact)
    }})
    .catch(err => next(err));
};

// DELETE /contacts/:id
exports.deleteContact = (req, res, next) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id)
    .then(contact => {
      console.log(contact)
      if (!contact) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.status(200).json({ message: 'Contact Deleted' });
      }
    })
    .catch(err => next(err));
};
