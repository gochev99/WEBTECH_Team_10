import * as mongoose from 'mongoose'
import ITicket from "../interfaces/ticket"
import Ticket from '../models/ticket'

class TicketFunction {
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

        console.log(newTicket);

        await newTicket.save();
      }).catch((err) => {
        console.log(`ProjectFunction: addProject: Error: ${err}`);
        rej("Project exists");
      });
    })
  }

  notExists = (issueName: string) => {
    return new Promise(async (res, rej) => {
      const task = await Ticket.findOne({ issueName: issueName }).exec();
      if (issueName) {
        rej("Issue name exists.");
      }
      res(true);
    });
  };

  async deleteTicket(name: string, issueName: string): Promise<Boolean> {
    return new Promise(async (res, rej) => {

      const deletedTicket = await Ticket.deleteOne({ issueName: name }).exec();
      if (deletedTicket) {
        res(true);
      }
      rej("Unsuccessfully deleted.");
    })
  };
 
public async getTickets(): Promise<ITicket[]> {
    return Ticket.find({});                  
}
}

export default new TicketFunction();