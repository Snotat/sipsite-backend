import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        priceAtSale: Number
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card', 'online'] },
    customerInfo: {
        type: { type: String, enum: ['walk-in', 'member', 'online'] },
        id: String
    },
    salesDate: { type: Date, default: Date.now },
    salesPerson: String,
    transactionId: { type: String, unique: true }
});

module.exports = mongoose.model('Sale', saleSchema);