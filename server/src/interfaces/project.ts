interface IProject extends Document {
    creator: any;
    projectName: string,
    startDate: Date,
    targetEndDate: Date
}

export default IProject;