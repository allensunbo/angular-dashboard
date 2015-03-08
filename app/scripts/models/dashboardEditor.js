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



