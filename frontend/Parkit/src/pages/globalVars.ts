import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  authToken:any;
  constructor() {
    this.authToken = "";
  }

  setAuthToken(value) {
    this.authToken = value;
  }

  getAuthToken() {
    return this.authToken;
  }

}