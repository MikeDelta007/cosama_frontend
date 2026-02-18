export class SmsRecipient 
{
    public id: number;
    public value : string;

    constructor(init?: Partial<SmsRecipient>) {
        Object.assign(this, init);
    }
}