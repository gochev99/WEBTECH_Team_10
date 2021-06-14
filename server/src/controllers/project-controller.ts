import * as mongoose from 'mongoose'
import * as express from 'express';
import IProject from '../interfaces/project';
import Project from '../models/project';
import * as _ from 'lodash';


class ProjectFunctions {
    constructor() { }

    private notExists = (projectName: string) => {
        return new Promise(async (res, rej) => {
            const project = await Project.findOne({ projectName: projectName }).exec();
            if (project) {
                rej("Project exists.");
            }
            res(true);
        });
    };

    async deleteProject(projectName: string): Promise<Boolean> {
        return new Promise(async (res, rej) => {
            const deletedProject = await Project.deleteOne({ projectName: projectName }).exec();
            if (deletedProject) {
                res(true);
            }
            rej("Project is deleted.");
        })
    };


    async addProject(project: IProject) {
        return new Promise(async (res, rej) => {
            this.notExists(project.projectName).then(async () => {
                const newProject = new Project({
                    _id: new mongoose.Types.ObjectId(),
                    projectName: project.projectName,
                    startDate: project.startDate,
                    targetEndDate: project.targetEndDate
                });
                await newProject.save();

                res(true);
            }).catch((err) => {
                console.log(`ProjectFunctions: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }
}
export const getProjects = async (req: Request, res: Response) => {
    return Project.find({})
            .sort({projectName:1 })
};

export default ProjectFunctions;
