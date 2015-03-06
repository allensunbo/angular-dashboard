function Summary() {

}

Summary.prototype = new DashboardWidget();

Summary.prototype.getHeaderText = function () {
  return 'Summary';
}

Summary.prototype.getHeaderIcon = function () {
  return '<div><Button>x</Button></div>';
}


