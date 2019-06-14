const ICRUD = require("./../interfaces/interfaceCRUD");

class ContextStrategy extends ICRUD {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item, skip, limit) {
    return this._database.read(item, skip, limit);
  }

  update(id, item, upsert = false) {
    return this._database.update(id, item, upsert);
  }

  remove(id) {
    return this._database.remove(id);
  }

  isConnected() {
    return this._database.isConnected();
  }

  static connect() {
    return this._database.connect();
  }
}

module.exports = ContextStrategy;
