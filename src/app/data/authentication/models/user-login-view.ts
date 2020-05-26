export class UserLoginView {
  public email?: string;
  public password?: any;
  public grant_type?: string;
  public remember?: boolean;

  constructor(email?: string, password?: any, grant_type?: string, remember?: boolean) {
    this.email = email;
    this.password = password;
    this.grant_type = grant_type;
    this.remember = remember ? remember : false;
  }
}
