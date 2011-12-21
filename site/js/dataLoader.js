
ARV.dataJSON = {
		id: "4ed630d8ed9be9723687620d",
		columns:[
					{id:"company", name:"Company", field:"company",   editor:TextCellEditor},
		            {id:"sales", name:"Sales", field:"sales",   editor:TextCellEditor},
					{id:"revenue", name:"Revenue", field:"revenue",  editor:TextCellEditor},
					{id:"profit", name:"Profit", field:"profit",  editor:TextCellEditor},
				],
		data:[
		      {
		    	company:"LG",
		    	sales:41,
		    	revenue:22,
		    	profit:10
		      },
		      {
			    company:"Samsung",
			    sales:24,
			    revenue:12,
			    profit:20
			   },
			   {
			    company:"Philips",
			    sales:20,
			    revenue:15,
			    profit:7
			   },
			   {
			    company:"GE",
			    sales:55,
			    revenue:34,
			    profit:25
			   },
			 ]
};
ARV.editableGridOptions = {
		editable: true,
		enableAddRow: true,
		enableCellNavigation: true,
		enableColumnReorder:true,
		asyncEditorLoading: false,
        autoEdit: false,
        autoHeight:true
	};
ARV.gridOptions = {
	enableCellNavigation: true,
	enableColumnReorder:true,
	autoHeight:true,
	forceFitColumns:true
};

ARV.createDataForTable = function() {
	var i,label;
	var categoryLabel = $("#categoryAxisList option:selected").val();
	var measureLabels = $("#measureAxisList option:selected");
	var columns = ARV.dataJSON.columns;
	ARV.TableColumns = [];
	ARV.TableData = [];
//	for(i=0; i<ARV.dataJSON.columns.length; i++){
//		ARV.TableColumns.push(ARV.dataJSON.columns[i]);
//	}
	for(i=0; i<ARV.dataJSON.data.length; i++){
		ARV.TableData.push(ARV.dataJSON.data[i]);
	}
	ARV.TableColumns.push(jlinq.from(columns).equals("field",categoryLabel).select()[0]);
	for(i = 0 ;i< measureLabels.length ;i++){
		label = $(measureLabels[i]).val();
		ARV.TableColumns.push(jlinq.from(columns).equals("field",label).select()[0]);
	}
};

var data = ARV.dataJSON.data;
var columns = ARV.dataJSON.columns;
var i = 0;
var option;
ARV.grid = new Slick.Grid("#dataGrid", data, columns, ARV.editableGridOptions);
ARV.grid.setSelectionModel(new Slick.CellSelectionModel());
ARV.grid.onAddNewRow.subscribe(function(e, args) {
    var item = args.item;
    var column = args.column;
    ARV.grid.invalidateRow(data.length);
    data.push(item);
    ARV.grid.updateRowCount();
    ARV.grid.render();
});
var i = 0; 
for(i=0;i<columns.length;i++){
	option = $('<option />').val(columns[i].field).append(columns[i].name);
	if(i === 1)	{
		option.attr("selected","selected");
	}
	$("#measureAxisList").append(option);
}
$("#measureAxisList").chosen();
for(i=0;i<columns.length;i++){
	option = $('<option />').val(columns[i].field).append(columns[i].name);
	if(i === 0)	{
		option.attr("selected","selected");
	}
	$("#categoryAxisList").append(option);	
}
$("#categoryAxisList").chosen();
ARV.initializeDialog = function(){
	$( "#dialog-illegal-data" ).dialog({
		modal:true,
		autoOpen: false,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
};
ARV.initializeDialog();
ARV.modifyDataForSingleSeries = function(){
	var dataArr = [];
	var selected = $("#measureAxisList option:selected");
		var field = $(selected[0]).val();
		labelField = $("#categoryAxisList option:selected").val();
		for (i=0;i<data.length;i++){
			var dataElement = data[i];
			var value = parseInt(dataElement[field],10);
			if(isNaN(value)){
				$( "#dialog-illegal-data" ).dialog( "open" );
				return;
			}
			label = dataElement[labelField];
			obj = {
					value:value,
					label:label
				}
			dataArr.push(obj);
		}
		ARV.defaultData.BarGraph = dataArr;
};
ARV.updateCategoryArray =function(){
	ARV.defaultCategories[0].category = [];
	var labelField = $("#categoryAxisList option:selected").val();
	var obj = {};
	var i = 0; 
	for(i=0;i<ARV.dataJSON.data.length;i++){
		var dataElement = ARV.dataJSON.data[i];
		category = dataElement[labelField];
		obj ={
			label:category
		}
		ARV.defaultCategories[0].category.push(obj);
	};
};
ARV.getDataArrayForSeries = function(seriesname){
	var dataArr = [];
	var obj ={};
	var index = 0; 
	for(index=0;index<ARV.dataJSON.data.length;index++){
		var dataElement = ARV.dataJSON.data[index]; 
		var value = parseInt(dataElement[seriesname]);
		if(isNaN(value)){
			$( "#dialog-illegal-data" ).dialog( "open" );
			return undefined;
		}
		obj = {
			value:value
		};
		dataArr.push(obj);
	}
	return dataArr;
};
ARV.updateDatasetArray = function(){
	var dataSet = [];
	var obj = {},seriesname;
	var selected = $("#measureAxisList option:selected");
	var index = 0; 
	for(index=0;index<selected.length;index++){
		seriesname = $(selected[index]).val();
		var data = ARV.getDataArrayForSeries(seriesname);
		if(!data){
			return;
		}
		obj ={
			seriesname : seriesname,
			data : data
		}
		dataSet.push(obj);
	}
	ARV.defaultDataSet = dataSet;
};
ARV.modifyDataForMultiSeries = function(){
	ARV.updateCategoryArray();
	ARV.updateDatasetArray();
};
ARV.modifyDataForBubbleChart = function(){
	ARV.defaultData.BubbleGraph = [];
	var obj = {};
	var index = 0;
	var selected = $("#measureAxisList option:selected");
	var x = $(selected[0]).val();
	var y = $(selected[1]).val();
	var z = $(selected[2]).val();
	var	labelField = $("#categoryAxisList option:selected").val();
	for(index=0;index<ARV.dataJSON.data.length;index++){
		var dataItem = ARV.dataJSON.data[index];
		obj={
			x: dataItem[x],
			y: dataItem[y],
			z: dataItem[z],
			label: dataItem[labelField]
		}
		ARV.defaultData.BubbleGraph.push(obj);
	}
};
$("#dataUpdater").click(function(){
	var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
	try{
	if(noOfSelected === 1){
		ARV.modifyDataForSingleSeries();
	}
	if(noOfSelected>1){
		ARV.modifyDataForSingleSeries();
		ARV.modifyDataForMultiSeries();
		if(noOfSelected === 3){
			ARV.modifyDataForBubbleChart();
		}
	} 
	}
	catch(e){
		alert(e);
	}
	ARV.createDataForTable();
	ARV.refreshTable();
	ARV.refreshGraph();
});
