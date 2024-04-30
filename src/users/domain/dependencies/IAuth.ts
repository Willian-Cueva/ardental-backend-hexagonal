export interface IAuth {
  login(): Promise<void>;
  register(): Promise<void>;
}