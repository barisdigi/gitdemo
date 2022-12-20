class Device extends ConnioEntity {
  #token
  #profileId
  #apps
  #status
  #period
  #customIds
  #timezone
  #annotateWithLoc
  #annotateMeta
  #location

  constructor(token, id, state) {
    super(token, id, state);

    this.#token = token;
    this.#profileId = state.profileId;
    this.#apps = state.apps;
    this.#status = state.status;
    this.#period = state.period;
    this.#customIds = state.customIds;
    this.#timezone = state.timezone;
    this.#annotateWithLoc = state.annotateWithLoc;
    this.#annotateMeta = state.annotateMeta;
    this.#location = state.location;
  }

  get profileId() {
    return this.#profileId;
  }
  get apps() {
    return this.#apps;
  }
  get status() {
    return this.#status;
  }
  get period() {
    return this.#period;
  }
  get customIds() {
    return this.#customIds;
  }
  get timezone() {
    return this.#timezone;
  }
  get annotateWithLoc() {
    return this.#annotateWithLoc;
  }
  get annotateMeta() {
    return this.#annotateMeta;
  }
  get location() {
    return this.#location;
  }

  get active() {
    return connio.getPropertyDatapoint(this.#token, this.id, "active").value;
  }
  get lastIn() {
    return connio.getPropertyDatapoint(this.#token, this.id, "lastIn").value;
  }
  get lastOut() {
    return connio.getPropertyDatapoint(this.#token, this.id, "lastOut").value;
  }

  get async() {
    let obj = super.async;
    return Object.assign(obj, {
      active: {
        get: () =>{
          return connio.getPropertyDatapointAsync(this.#token, this.id, "active")
        }
      },
      lastIn: {
        get: () =>{
          return connio.getPropertyDatapointAsync(this.#token, this.id, "lastIn")
        }
      },
      lastOut: {
        get: () =>{
          return connio.getPropertyDatapointAsync(this.#token, this.id, "lastOut")
        }
      },
    })
  }
}