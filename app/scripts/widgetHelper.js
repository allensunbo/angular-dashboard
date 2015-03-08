function addPortfolioToPage(page) {
  console.log('add portfolio');
  page.columnData.push({name: 'New Portfolio ' + (page.columnData.length + 1), id: uuid()});
  var widgetRows = page.widgetRows;
  for (var i = 0; i < widgetRows.length; i++) {
    var widget = widgetRows[i].widgets[0];
    console.log(widget);
    for (var j = 0; j < widget.rows.length; j++) {
      var lastElem = widget.rows[j].data[widget.rows[j].data.length - 1];
      widget.rows[j].data.push(lastElem);
    }
  }
  setPageFlatRows(page);
}

function addRiskWidget($scope) {
  var page = getActiveEditorPage($scope);
  if (!page) {
    return;
  }
  console.log(page);
  var numberOfPortfolios = page.columnData.length;
  var header = ['Risk'];
  for (var i = 0; i < numberOfPortfolios; i++) {
    header.push('');
  }

  var row21 = new DashboardWidgetRenderRow('header', header);
  var row22 = getRiskWidgetRenderRow(numberOfPortfolios);
  var riskWidget = new DashboardWidget('Risk');
  riskWidget.addRenderRow(row21);
  riskWidget.addRenderRow(row22);

  var widgetRow = new DashboardWidgetRow();
  widgetRow.addWidget(riskWidget);

  page.addWidgetRow(widgetRow);

  setPageFlatRows(page);
  console.log('Risk widget added');
}

function addReturnWidget($scope) {
  var page = getActiveEditorPage($scope);
  if (!page) {
    return;
  }
  console.log(page);
  var numberOfPortfolios = page.columnData.length;

  var header = ['Return'];
  for (var i = 0; i < numberOfPortfolios; i++) {
    header.push('');
  }
  var activeReturn = ['Active Return'];
  for (var i = 0; i < numberOfPortfolios; i++) {
    activeReturn.push(50 - randomData()[0] + '%');
  }

  var row1 = new DashboardWidgetRenderRow('header', header);
  var row2 = new DashboardWidgetRenderRow('text', activeReturn);
  var row3 = getReturnWidgetRenderRow(numberOfPortfolios);

  var returnWidget = new DashboardWidget('Return');
  returnWidget.addRenderRow(row1);
  returnWidget.addRenderRow(row2);
  returnWidget.addRenderRow(row3);

  var widgetRow = new DashboardWidgetRow();
  widgetRow.addWidget(returnWidget);

  page.addWidgetRow(widgetRow);

  setPageFlatRows(page);
  console.log('Return widget added');
}

function getActiveEditorPage($scope) {
  if (!$scope.editors) {
    return;
  }
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

  var row11 = new DashboardWidgetRenderRow('header', ['Summary', '', '']);
  var row12 = new DashboardWidgetRenderRow('text', ['Total Return', '34%', '-67%']);
  var row13 = new DashboardWidgetRenderRow('text', ['Active Return', '7%', '-12%']);
  var summaryWidget = new DashboardWidget('Summary');
  summaryWidget.addRenderRow(row11);
  summaryWidget.addRenderRow(row12);
  summaryWidget.addRenderRow(row13);

  var row21 = new DashboardWidgetRenderRow('header', ['Risk', '', '']);
  var row22 = getRiskWidgetRenderRow();
  var riskWidget = new DashboardWidget('Risk');
  riskWidget.addRenderRow(row21);
  riskWidget.addRenderRow(row22);

  var row31 = new DashboardWidgetRenderRow('header', ['Return', '', '']);
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

function getRiskWidgetRenderRow(num) {
  var data = [''];
  for (var i = 0; i < num; i++) {
    data.push(getRiskSampleData());
  }
  var riskRow = new DashboardWidgetRenderRow('bar', data);
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

function getReturnWidgetRenderRow(num) {
  var data = [''];
  for (var i = 0; i < num; i++) {
    data.push(getReturnSampleData());
  }
  var returnWidget = new DashboardWidgetRenderRow('pie', data);
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
    data.push(Math.ceil(Math.random() * 100));
  }
  return data;
}
