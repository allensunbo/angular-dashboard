'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function ($scope) {

  $scope.addWidget = function (event) {
    console.log('widget added');
    console.log(event.target.innerText);
    var idx = 0;
    switch (event.target.innerText) {
      case 'Summary':
        idx = 0;
        break;
      case 'Risk':
        idx = 1;
        addRiskWidget($scope);
        break;
      case 'Returns':
        idx = 2;
        addReturnWidget($scope);
        break;
      default:
        idx = 0;
        break;
    }

  }

  $scope.showDemo = function () {
    var editor = getSampleEditor();
    var editors = new DashboardEditors();
    editors.addEditor(editor);

    var editorCopy = getSampleEditor();
    editorCopy.name = 'Another Dashboard!';
    editorCopy.pages[0].name = 'Portfolio Summary';
    editorCopy.pages[1].name = 'Risk Decomposition';

    editors.addEditor(editorCopy);

    console.log(editors);
    $scope.editors = editors;

  };

  $scope.addPortfolio = function () {

  };

  $scope.removeRow = function (row) {

  }
});

function addRiskWidget($scope) {
  var page = getActiveEditorPage($scope);
  console.log(page);
  var row21 = new DashboardWidgetRenderRow('text', ['Risk', '', '']);
  var row22 = getRiskWidgetRenderRow();
  var riskWidget = new DashboardWidget('Risk');
  riskWidget.addRenderRow(row21);
  riskWidget.addRenderRow(row22);

  var widgetRow = new DashboardWidgetRow();
  widgetRow.addWidget(riskWidget);

  page.addWidgetRow(widgetRow);

  setPageFlatRows(page);
}

function addReturnWidget($scope) {
  var page = getActiveEditorPage($scope);
  console.log(page);
  var row1 = new DashboardWidgetRenderRow('text', ['Return', '-5%', '4.8%']);
  var row2 = new DashboardWidgetRenderRow('text', ['Active Return', '-15%', '14.8%']);
  var row3 = getReturnWidgetRenderRow();

  var returnWidget = new DashboardWidget('Return');
  returnWidget.addRenderRow(row1);
  returnWidget.addRenderRow(row2);
  returnWidget.addRenderRow(row3);

  var widgetRow = new DashboardWidgetRow();
  widgetRow.addWidget(returnWidget);

  page.addWidgetRow(widgetRow);

  setPageFlatRows(page);
}

function getActiveEditorPage($scope) {
  for (var i = 0; i < $scope.editors.editors.length; i++) {
    var editor = $scope.editors.editors[i];
    if (!editor.active) {
      continue;
    }
    for (var j = 0; j < editor.pages.length; j++) {
      var page = editor.pages[j];
      if (page.active) {
        return page;
      }
    }
  }
}

function getSampleEditor() {

  var row11 = new DashboardWidgetRenderRow('text', ['Summary', '', '']);
  var row12 = new DashboardWidgetRenderRow('text', ['Total Return', '34%', '-67%']);
  var row13 = new DashboardWidgetRenderRow('text', ['Active Return', '7%', '-12%']);
  var summaryWidget = new DashboardWidget('Summary');
  summaryWidget.addRenderRow(row11);
  summaryWidget.addRenderRow(row12);
  summaryWidget.addRenderRow(row13);

  var row21 = new DashboardWidgetRenderRow('text', ['Risk', '', '']);
  var row22 = getRiskWidgetRenderRow();
  var riskWidget = new DashboardWidget('Risk');
  riskWidget.addRenderRow(row21);
  riskWidget.addRenderRow(row22);

  var row31 = new DashboardWidgetRenderRow('text', ['Return', '-5%', '4.8%']);
  var row32 = new DashboardWidgetRenderRow('text', ['Active Return', '-15%', '14.8%']);
  var row33 = getReturnWidgetRenderRow();
  var returnWidget = new DashboardWidget('Return');
  returnWidget.addRenderRow(row31);
  returnWidget.addRenderRow(row32);
  returnWidget.addRenderRow(row33);

  // var row31 = getReturnWidgetRenderRow();

  var widgetRow1 = new DashboardWidgetRow();
  var widgetRow2 = new DashboardWidgetRow();
  var widgetRow3 = new DashboardWidgetRow();
  widgetRow1.addWidget(summaryWidget);
  widgetRow2.addWidget(riskWidget);
  widgetRow3.addWidget(returnWidget);

  var page1 = new DashboardEditorPage('Page 1');
  page1.addWidgetRow(widgetRow1);
  page1.addWidgetRow(widgetRow2);
  page1.addWidgetRow(widgetRow3);

  page1.columnData.push('2012 Portfolio');
  page1.columnData.push('High Risk');

  setPageFlatRows(page1);
  console.log(page1);

  var page2 = new DashboardEditorPage('page 2');
  page2.addWidgetRow(widgetRow2);
// page2.addWidgetRow(widgetRow3);

  var editor = new DashboardEditor('First Dashboard');
  editor.addPage(page1);
  editor.addPage(page2);

  return editor;
}

function setPageFlatRows(page) {
  page.flatRows = [];
  for (var i = 0; i < page.widgetRows.length; i++) {
    var widgetRow = page.widgetRows[i];
    for (var j = 0; j < widgetRow.widgets.length; j++) {
      var widget = widgetRow.widgets[j];
      for (var p = 0; p < widget.rows.length; p++) {
        page.flatRows.push(widget.rows[p]);
      }
    }
  }
}

function getRiskWidgetRenderRow() {
  var riskRow = new DashboardWidgetRenderRow('bar', ['', getRiskSampleData(), getRiskSampleData()]);
  return riskRow;
}

function getRiskSampleData() {
  return {
    options: {
      chart: {
        type: 'bar',
        height: 200
      }
    },
    plotOptions: {
      bar: {
        size: '100%'
      }
    },
    series: [{
      data: randomData()
    }],
    title: {
      text: 'Risk',
      style: {
        display: 'none'
      }
    },
    loading: false,
    xAxis: {
      labels: {
        formatter: function () {
          return ['Size', 'Momentum', 'Growth', 'Country', 'Currency'][this.value];
        }
      }
    }
  };
}

function getReturnWidgetRenderRow() {
  var returnWidget = new DashboardWidgetRenderRow('pie', ['', getReturnSampleData(), getReturnSampleData()]);
  return returnWidget;
}

function getReturnSampleData() {
  return {
    options: {
      chart: {
        type: 'pie',
        height: 200,
        options3d: {
          enabled: false,
          alpha: 45,
          beta: 0,
          depth: 100
        }
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '100%',
        depth: 35
      }
    },
    series: [{
      data: randomData()
    }],
    title: {
      text: 'Return',
      style: {
        display: 'none'
      }
    },
    loading: false
  };
}

function randomData() {
  var data = [];
  for (var i = 0; i < 5; i++) {
    data.push(Math.ceil(Math.random() * 20));
  }
  return data;
}
