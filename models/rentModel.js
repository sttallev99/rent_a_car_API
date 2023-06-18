import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({

    car: {type: mongoose.Schema.Types.ObjectId, ref: 'cars'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    bookingTimeSlot: {
        from: { type: String },
        to : { type: String }
    },
    totalDays : {type: Number},
    total: {type: Number},
    driverRequired: {type: Boolean}

}, {
    timestamps: true
});

const Rent = mongoose.model('Rent', rentSchema);

export default Rent;