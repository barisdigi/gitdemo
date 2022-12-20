class Gateway extends ConnectedDevice {
  #token

  constructor(token, id, state) {
    super(token, id, state);

    this.#token = token;
  }

  queryDevices(query) {
    return connio.queryDevices(this.#token, this.id, query);
  }

  get async() {
    let self = this;
    let obj = super.async;
    return Object.assign(obj, {
      queryDevices(query) {
        return connio.queryDevicesAsync(self.#token, self.id, query);
      }
    })
  }

  /* Legacy */

  findDevices(filter) {
    return connio.findDevices(this.#token, this.id, filter);
  }
  setDeviceProperty(device, ref, dp) {
    if (connio.Profiles[device.profileId] == undefined)
      throw `Device profile [${device.profileId}] cannot be found. Make sure that your object model is up-to-date`
    return connio.Profiles[device.profileId](this.#token, device.id, device.state).setProperty(ref, dp);
  }
  getDeviceProperty(device, ref) {
    if (connio.Profiles[device.profileId] == undefined)
      throw `Device profile [${device.profileId}] cannot be found. Make sure that your object model is up-to-date`
    return connio.Profiles[device.profileId](this.#token, device.id, device.state).getProperty(ref);
  }
  executeDeviceMethod(device, ref, arg) {
    if (connio.Profiles[device.profileId] == undefined)
      throw `Device profile [${device.profileId}] cannot be found. Make sure that your object model is up-to-date`
    return connio.Profiles[device.profileId](this.#token, device.id, device.state)[ref](arg);
  }
}