import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: [true, 'Project name is required field.'],
        minlength: [3, 'Project name must be at least 3 characters.'],
        maxlength: [15, 'Project name must be less then 15 characters.']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required field.']
    },
    targetEndDate: {
        type: Date,
        required: [true, 'Target end date is required field.']
    }
});

const Project = mongoose.model('Project', projectSchema);

export { projectSchema };

export default Project;