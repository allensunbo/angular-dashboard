function DashboardWidget(name) {
  this.name = name;
  this.rows = [];
}

DashboardWidget.prototype.addRenderRow = function (row) {
  this.rows.push(row);
};

DashboardWidget.prototype.removeRenderRow = function (row) {
  this.rows.splice(0, 1);
};
