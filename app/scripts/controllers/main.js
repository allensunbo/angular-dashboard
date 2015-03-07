'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function ($scope, TestData) {

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
        break;
      case 'Returns':
        idx = 2;
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

  for (var i = 0; i < page1.widgetRows.length; i++) {
    var widgetRow = page1.widgetRows[i];
    for (var j = 0; j < widgetRow.widgets.length; j++) {
      var widget = widgetRow.widgets[j];
      for (var p = 0; p < widget.rows.length; p++) {
        page1.flatRows.push(widget.rows[p]);
      }
    }
  }
  console.log(page1);

  var page2 = new DashboardEditorPage('page 2');
  page2.addWidgetRow(widgetRow2);
// page2.addWidgetRow(widgetRow3);

  var editor = new DashboardEditor('First Dashboard');
  editor.addPage(page1);
  editor.addPage(page2);

  return editor;
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
        height: 200
      }
    },
    plotOptions: {
      pie: {
        size: '100%'
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

app.factory('TestData', function () {
  function randomData() {
    var data = [];
    for (var i = 0; i < 5; i++) {
      data.push(Math.ceil(Math.random() * 20));
    }
    return data;
  }

  // data is widget-based, each widget has multiple rows, in general
  return [{
    header: {
      name: 'Summary',
      template: '<div>Summary</div>'
    },
    value: {
      type: 'text',
      data: '4'
    }
  }, {
    name: "Risk",
    value: {
      type: 'bar',
      options: {
        chart: {
          type: 'bar'
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
      /* title: {
       text: 'Risk',
       style: {
       display: 'none',
       },
       },*/
      loading: false
    }
  }, {
    name: "Returns",
    value: {
      type: 'pie',
      options: {
        chart: {
          type: 'pie',
          margin: [-30, 30, 30, 30]
        }
      },
      plotOptions: {
        pie: {
          size: '100%'
        }
      },
      series: [{
        data: randomData()
      }],
      title: {
        text: 'Returns',
        style: {
          display: 'none'
        }
      },
      loading: false
    }
  }];

});
