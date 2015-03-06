function DashboardEditor() {
  this.pages = [];
}
DashboardEditor.prototype.addPage = function (page) {
  this.pages.push(page);
};

DashboardEditor.prototype.removePage = function (page) {
  this.pages.splice(0, 1);
};
DashboardEditor.prototype.serialize = function () {

};

