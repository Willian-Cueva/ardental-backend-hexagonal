export interface IConnectToServer {
  connect(): Promise<Boolean>;
}