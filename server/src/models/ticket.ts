import * as mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    issueName: {
        type: String,
        required: [true, 'Issue name is required field.'],
        maxlength:  [30, 'Issue name must be less than  30 characters.']
    },
    issueDescription: {
        type: String,
        required: [true, 'Description is required field.'],
        minlength: [10, 'Description must be at least 10 characters.'],
        maxlength: [200, 'Description must be less then 200 characters.']
    },
    relatedProject: {
        type: String,
        required: [true, 'Related project is required field.']
    },
    priority: {
        type: String,
        required: [true, 'Priority is required field.'],
        enum: ['Low', 'Medium', 'High'],
    },
     targetResolutionDate: {
        type: Date,
        required: [true, 'Target resolution date is required field.']
        }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export { ticketSchema };

export default Ticket;