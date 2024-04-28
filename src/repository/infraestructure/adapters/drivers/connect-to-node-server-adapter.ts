import { ConnectToServer } from "../../../application/connect-to-server";
import { IConnectToServer } from "../../ports/drivers/for-connecto-to-server";

export class ConnectToNodeServerAdapter implements IConnectToServer {
  private readonly connectToServer: ConnectToServer;
  constructor() {
    this.connectToServer = new ConnectToServer();
  }

  async connect(): Promise<Boolean> {
    this.connectToServer.connect();
    return true;
  }
}
