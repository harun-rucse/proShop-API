const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Username is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: 'Please enter a valid email'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password not the same'
      }
    },
    photo: {
      type: String,
      default: config.DEFAULT_USER_PHOTO
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    passwordChangeAt: Date
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangeAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const passwordChangeTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return passwordChangeTimestamp > JWTTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
