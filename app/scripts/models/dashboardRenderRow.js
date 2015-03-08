function DashboardWidgetRenderRow(type, data, widgetRow) {
  if (type === 'header' && !widgetRow) {
    throw 'header must have associated widget row!';
  }
  this.type = type;
  this.data = data;
  this.widgetRow = widgetRow;
  this.id = uuid();
}
