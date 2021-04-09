const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must be belongs to user']
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required']
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    },
    taxPrice: {
      type: Number,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email'
  }).populate({
    path: 'product'
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
