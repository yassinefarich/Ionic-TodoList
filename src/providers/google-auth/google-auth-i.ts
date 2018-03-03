

export interface GoogleAuthInterface {
  logIn(): Promise<any>;
  logOut(): Promise<any>;
}
