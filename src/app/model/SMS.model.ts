import { SmsRecipient } from "./SmsRecipient.model";

export class SMS {
    public signature: string;
    public content : string;
    public subject : string;
    public recipients: SmsRecipient[];

    constructor(init?: Partial<SMS>) {
        Object.assign(this, init);
    }
  } 