export class ResetPassword {
    public usr_password : string;

    constructor(init?: Partial<ResetPassword>) {
      Object.assign(this, init);
  }
  
}