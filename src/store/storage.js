import LocalForage from 'localforage'
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

class TigoStorage {

  // promise = null

  constructor(config) {
    this.promise = new Promise((resolve, reject) => {
      let db;
      const defaultConfig = this.getDefaultConfig()
      const actualConfig = Object.assign(defaultConfig, config || {})

      LocalForage.defineDriver(CordovaSQLiteDriver)
        .then(() => {
          db = LocalForage.createInstance(actualConfig)
        })
        .then(() =>
          db.setDriver(this.getDriverOrder(actualConfig.driverOrder))
        )
        .then(() => {
          resolve(db)
        })
        .catch(reject)
    })
  }

  ready() {
    return this.promise
  }

  getDriverOrder(driveOrder) {
    return driveOrder.map((driver) => {
      switch(driver) {
        case 'sqlite':
          return CordovaSQLiteDriver._getDriverOrder
        case 'indexeddb':
          return LocalForage.INDEXEDDB
        case 'websql':
          return LocalForage.WEBSQL
        case 'localstorage':
          return LocalForage.LOCALSTORAGE
      }
    })
  }

  getDefaultConfig() {
    return {
      name: '_tigosmartapp',
      storeName: '_tigokv',
      dbKey: '_tigokey',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }
  }

  get(key) {
    return this.promise.then(db => db.getItem(key))
  }

  set(key, value) {
    return this.promise.then(db => db.setItem(key, value))
  }

  remove(key) {
    return this.promise.then(db => db.removeItem(key))
  }

  clear() {
    return this.promise.then(db => db.clear())
  }
}

// Creates a singleton object
const instance = new TigoStorage()
Object.freeze(instance)

export default instance
