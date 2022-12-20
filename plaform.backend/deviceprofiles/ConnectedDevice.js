class ConnectedDevice extends Device {
  #token

  constructor(token, id, state) {
    super(token, id, state);

    this.#token = token;
  }

  get connectionInfo() {
    return connio.getPropertyDatapoint(this.#token, this.id, "connectionInfo").value;
  }
  get connectionStatus() {
    return connio.getPropertyDatapoint(this.#token, this.id, "connectionStatus").value;
  }

  get async() {
    let obj = super.async;
    return Object.assign(obj, {
      connectionInfo: {
        get: () =>{
          return connio.getPropertyDatapointAsync(this.#token, this.id, "connectionInfo")
        }
      },
      connectionStatus: {
        get: () =>{
          return connio.getPropertyDatapointAsync(this.#token, this.id, "connectionStatus")
        }
      }
    })
  }
}