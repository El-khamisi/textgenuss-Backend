const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//configuration
const { TOKENKEY } = require('../../config/env');
const roles = require('../../config/roles');
const membership = require('../../config/membership');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, required: [true, 'Email is required'], unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: [true, 'Password is required'] },
    thumbnail: { type: String },
    role: { type: String, enum: [Object.values(roles), 'Invalid role title'] },
    membership: { type: String, enum: [Object.values(membership), 'Invalid membership plan'] },
    inprogress: [{ course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' } }],
    completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { strict: false }
);

userSchema.methods.generateToken = function (res) {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.firstName + ' ' + this.lastName,
      email: this.email,
      photo: this.thumbnail,
      role: this.role,
      membership: this.membership,
    },
    TOKENKEY,
    { expiresIn: '24h' }
  );

  res.cookie('authorization', token, {
    maxAge: 24 * 60 * 60 * 1000, //24 Hours OR Oneday
  });
  return token;
};

userSchema.pre('save', function (next) {
  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } else {
    throw new Error('Email and password are REQUIRED');
  }
});

//Exclude findOne for Login password
userSchema.post(['save', 'find', 'findByIdAndUpdate', 'findByIdAndDelete'], function (doc, next) {
  if (!doc) {
    next();
  } else if (doc.length && doc.length > 0) {
    doc.forEach((e, i) => {
      doc[i].password = undefined;
    });
  } else {
    doc.password = undefined;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
