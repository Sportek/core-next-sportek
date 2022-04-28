import axios, { Axios } from "axios";
import Logger from "@leadcodedev/logger";

export default class Http {

  private static $instance: Http;

  public auth: { type: string, token: string } | undefined;

  public static getInstance() {
    if(!this.$instance) {
      this.$instance = new Http();
    }
    return this.$instance;
  }

  public axios: Axios = axios.create({
    baseURL: "http://localhost:3333/api"
  })

  public setAuth(auth: { type: string, token: string }) {
    this.auth = auth
  }

  private async checkIfAuthentificated() {
    const http = Http.getInstance()
    const request = await http.axios.get("/authentification/me");
    if(!request) {
      await this.login("", "")
    }
  }


  public async getAuth() {
    if(!this.auth) await this.login("", "")
    await this.checkIfAuthentificated()
    return this.auth
  }

  public async login(email: string, password: string) {
    const http = Http.getInstance()
    const {data} = await http.axios.post("/authentification/login", {
      email: email,
      password: password,
    })
    if(data.token && data.type) {
      http.axios.defaults.headers.common['Authorization'] = `${ data.type } ${ data.token }`
      this.setAuth(data)
      Logger.send("success", "Connexion effectuée avec succès.")
    }
  }

  public async isConnected() {
    if(!this.auth) {
      await this.getAuth()
      return true;
    }
    return true;
  }

  public async logout() {
    const http = Http.getInstance()
    if(this.auth) await http.axios.post("/authentification/logout");
    this.auth = undefined;
    console.log("Vous avez été déconnecté de l'API");
  }
}