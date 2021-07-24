import { Request, Response } from 'express'
import IProject from '../interfaces/project';
import Project from '../models/project'
import ProjectFunction from '../functions/project';

export const getProjects = async (req: Request, res: Response) => {
    if (!req.params.projectName) {
        res.status(400).json("error: No project found");
        return;
    }

    await ProjectFunction.getProjectByName(req.params.projectName).then(async(projects) => {
        res.status(200).json({ "projects": projects });
        return;
    }).catch((err: Error) => {
        res.status(404).json({ "error": err });
        return;
    });
}

export const postProject = async (req: Request, res: Response) => {
   const projectName = req.params.projectName;
    let body: IProject = req.body;
    //body.creator = email;

    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !req.body.projectName) {
        res.status(400).json("error: Invalid input");
        return;
    }


    await ProjectFunction.addProject(body).then(() => {
        res.status(200).json("Project added");
        return;
    }).catch((err: Error) => {
        res.status(400).json({ "Error ": err });
    })
};

