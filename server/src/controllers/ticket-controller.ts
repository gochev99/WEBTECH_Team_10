import * as mongoose from 'mongoose'
import ITicket from "../interfaces/ticket"
import Ticket from '../models/ticket'

class TicketFunctions {
    async addTicket(name: string, ticket: ITicket) {
        return new Promise((res, rej) => {
            this.notExists(ticket.issueName).then(async () => {
                const newTicket = new Ticket({
                    _id: new mongoose.Types.ObjectId(),
                    issueName: ticket.issueName,
                    issueDescription: ticket.issueDescription,
                    relatedProject: ticket.relatedProject,
                    priority: ticket.priority,
                    targetResolutionDate: ticket.targetResolutionDate
                });

                await newTicket.save();
                res(true);

            })//.catch((err) => {
                //console.log(`ProjectFunctions: addProject: Error: ${err}`);
                //rej("Project exists");
           // });
        })
    }

    notExists = (issueName: string) => {
        return new Promise(async (res, rej) => {
            const issue = await Ticket.findOne({ issueName: issueName }).exec();
            if (issue) {
                rej("Issue exists.");
            }
            res(true);
        });
    };

    private exists = (issueName: string) => {
        return new Promise(async (res, rej) => {
            const issue = await Ticket.findOne({ issueName: issueName }).exec();
            if (issue) {
                res(true);
            }
            rej("Issue doesn't exist.");
        })
    };

    async deleteTicket(name: string, issueName: string): Promise<Boolean> {
        return new Promise(async (res, rej) => {

            const deletedTicket = await Ticket.deleteOne({ issueName: name }).exec();
            if (deletedTicket) {
                res(true);
            }
            rej("Ticket is deleted.");
        })
    };
}

export default new TicketFunctions();