const { v4: uuidv4 } = require("uuid");
const EventEmitter = require("events");

class QrService extends EventEmitter {
  constructor() {
    super();
    this.currentUuid = uuidv4();
    this.interval = null;
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      this.currentUuid = uuidv4();
      this.emit("update", this.currentUuid);
    }, 60000);
  }

  stop() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  getCurrent() {
    return this.currentUuid;
  }

  forceRefresh() {
    this.currentUuid = uuidv4();
    this.emit("update", this.currentUuid);
  }
}

module.exports = new QrService();
