function DashboardEditor(name, type) {
  this.id = uuid();
  this.name = name;
  this.type = type;
  this.pages = [];
  this.active = false;
}
DashboardEditor.prototype.addPage = function (page) {
  this.pages.push(page);
};

DashboardEditor.prototype.removePage = function (page) {
  this.pages.splice(0, 1);
};
DashboardEditor.prototype.serialize = function () {

};

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

