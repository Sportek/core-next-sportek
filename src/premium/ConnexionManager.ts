export class ConnexionManager {
  private identifiant: string | undefined;
  private password: string | undefined;


  private static $instance: ConnexionManager

  public static getInstance() {
    if(!this.$instance){
      this.$instance = new ConnexionManager()
    }
    return this.$instance
  }

  public login(identifiant: string, password: string) {
    this.identifiant = identifiant;
    this.password = password;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public logout() {

  }

}