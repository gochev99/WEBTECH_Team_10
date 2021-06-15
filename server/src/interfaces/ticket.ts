import {Document} from 'mongoose'

interface ITicket extends Document {
    issueName: string,
    issueDescription: string,
    relatedProject: string,
    priority: string,
    targetResolutionDate: Date
}

export default ITicket;