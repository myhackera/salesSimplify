const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const contactSchema = new Schema({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, required: true, minlength: 3 },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHERS'], required: true },
  address: {
    line1: { type: String, required: true, minlength: 8 },
    line2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true, uppercase: true },
    zipCode: { type: String, required: true, maxlength: 10 },
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  other: { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);

