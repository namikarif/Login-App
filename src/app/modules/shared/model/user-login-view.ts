export class UserLoginView {
  public username?: string;
  public password?: any;
  public grant_type?: string;
  public remember?: boolean;

  constructor(username?: string, password?: any, grant_type?: string, remember?: boolean) {
    this.username = username;
    this.password = password;
    this.grant_type = grant_type;
    this.remember = remember ? remember : false;
  }
}
