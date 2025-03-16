import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    storeName: { type: String, required: true },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true }
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    storeType: { type: String, enum: ['retail', 'warehouse', 'online'] },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    openingHours: {
        Monday: { open: String, close: String },
        // ... other days
    },
    inventoryLastUpdated: Date,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

storeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Store', storeSchema)