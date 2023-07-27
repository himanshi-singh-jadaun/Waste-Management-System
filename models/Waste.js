const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        // file: { type: Number, required: true },
        contact: { type: String, required: true },
        email: { type: String},
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
        address: { type: String , required: true },
        color: { 
            type: String,
            default: '#ffc720'
        },
        status: { 
            type: String,
            default: 'Pending'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Waste', WasteSchema); 