import * as mongoose from 'mongoose'
import IProject from '../interfaces/project'
import User from '../interfaces/user'
import Project from '../models/project'


class ProjectFunction {
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

    async getProjectByName(projectName: string) {
        return new Promise(async (res, rej) => {
            const projectArr = await Project.findOne({ projectName: projectName }).select('projects').exec();
            const currentProject = projectArr.get('projects', null, { getters: false });
            if (currentProject) {
                res(currentProject);
                return;
            }
            rej("No project found");
        });
    }

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
            }).catch((err) => {
                console.log(`ProjectFunction: addProject: Error: ${err}`);
                rej("Project exists.");
            });
        })
    }
}

export default new ProjectFunction();