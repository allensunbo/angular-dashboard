function DashboardWidgetRow() {
  this.widgets = [];
  this.rowHeight = 150;
}

DashboardWidgetRow.prototype.addWidget = function (widget) {
  this.widgets.push(widget);
};

DashboardWidgetRow.prototype.removeWidget = function (widget) {
  this.widgets.splice(0, 1);
}


