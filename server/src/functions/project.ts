import * as mongoose from 'mongoose'
//import ITicket from "../interfaces/ticket"
import IProject from '../interfaces/project'
import User from '../interfaces/user'
import Project from '../models/project'


class ProjectService {
    constructor() { }

    private notExists = (name: string) => {
        return new Promise(async (res, rej) => {
            const project = await Project.findOne({ name: name }).exec();
            if (project) {
                rej("Project exists.");
            }
            res(true);
        });
    };

    async deleteProject(name: string): Promise<Boolean>{
        return new Promise(async (res, rej) => {
            const deletedProject = await Project.deleteOne({ name: name }).exec();
            if (deletedProject) {
                res(true);
            }
            rej("Project successfully deleted.");
        })
    };

    async addProject(project: IProject) {
        return new Promise((res, rej) => {
            this.notExists(project.projectName).then(async () => {
                const newProject = new Project({
                    _id: new mongoose.Types.ObjectId(),
                    projectName: project.projectName,
                    startDate: project.startDate,
                    targetEndDate: project.targetEndDate,
                });

                await newProject.save();

                User.updateOne({email: project.creator}, {$push: {projects: newProject}}).exec();

                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists.");
            });
        })
    }


}

export default new ProjectService();