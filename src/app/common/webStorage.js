export
default {
  storage: window.localStorage,

  get: function(itemName) {
    return this.storage.getItem(itemName);
  },

  getCollection: function(itemName) {
    return JSON.parse(this.storage.getItem(itemName));
  },

  set: function(itemName, data) {
    this.storage.setItem(itemName, data);
  },

  setCollection: function(itemName, data) {
    this.storage.setItem(itemName, JSON.stringify(data));
  },

  remove: function(itemName) {
    this.storage.removeItem(itemName);
  },

  clear: function() {
    this.storage.clear();
  }
}
