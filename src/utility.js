/** @authors : Aditya Gaur, koushikr */

AR.Utility = {};
/**
 * Finds the maximum value in the data sent for the graph creation.
 * 
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 */
AR.Utility.scale = {
	"linear" : "linear",
	"ordinal" : "ordinal",
	"log" : "log"
};
AR.Utility.findMax = function(data) {
	var max = data[0].value;
	data.forEach(function(data) {
		if (parseInt(data.value, 10) > max) {
			max = parseInt(data.value, 10);
		}
	});
	return max;
};

AR.Utility.findArrayMax = function(data) {
	var max = parseInt(data[0], 10);
	var i = 0;
	for (i = 0 ; i < data.length ; i++){
		var cur = parseInt(data[i], 10); 
		if ( cur > max) {
			max = cur;
		}
	}
	return max;
};

AR.Utility.getDataArray = function(data) {
	var noOfRecords = data.length;
	var arr = [], i;
	for (i = 0; i < noOfRecords; i = i + 1) {
		arr.push(data[i].value);
	}
	return arr;
};

AR.Utility.getImageContentChart = function(data, type) {
	var noOfRecords = data.length;
	var arr, i;
	for (i = 0; i < noOfRecords; i = i + 1) {
		if (data[i].chart.type === type) {
			arr = data[i].chart.content.chart;
		}
	}
	return arr;
};

AR.Utility.getJSONContentChart = function(data, type) {
	var noOfRecords = data.length;
	var arr, i;
	for (i = 0; i < noOfRecords; i = i + 1) {
		if (data[i].chart.type === type) {
			arr = data[i].chart.content.jsoncontent;
		}
	}
	return arr;
};

AR.Utility.Dimension = {
	x : "x",
	y : "y",
	z : "z"
};

// TODO: Combine the following three methods to one just pass the dimensions usr the arguments property of function object
AR.Utility.getSingleDimensionData = function(data, dimension) {
	var noOfRecords = data.length;
	var arr = [];
	for (i = 0; i < noOfRecords; i = i + 1) {
		arr.push(data[i][dimension]);
	}
	return arr;
};

AR.Utility.getTwoDimensionData = function(data) {
	var noOfRecords = data.length;
	var arr = [], innerArr = [], i;
	for (i = 0; i < noOfRecords; i = i + 1) {
		innerArr = [];
		innerArr.push(data[i].x);
		innerArr.push(data[i].y);
		arr.push(innerArr);
	}
	return arr;
};

AR.Utility.getMultiDimensionData = function(data) {
	var noOfRecords = data.length;
	var arr = [], innerArr = [], i;
	for (i = 0; i < noOfRecords; i = i + 1) {
		innerArr = [];
		innerArr.push(data[i].x);
		innerArr.push(data[i].y);
		innerArr.push(data[i].z);
		arr.push(innerArr);
	}
	return arr;
};
AR.Utility.getToolTipText = function(data, index) {
	return (data[index].toolTipText ? data[index].toolTipText : data[index].value);
};

AR.Utility.getPaletteColors = function(graphDef){
	if("custom" !== graphDef.presetPalette ){
		var colors =  AR.Utility.palettes[graphDef.presetPalette];
		return colors;
	}
	else{
		return graphDef.paletteColors;
	}
};
AR.Utility.palettes = {
	"Plain" : [ "#1F77B4" ],
	"Simple": ["#d42f3c","#85b1e6","#FD6D16","#dfe617"],
	"RGB" : [ "#bb2211","#2222bb", "#22aa22",  "#9999aa", "#223322", ],
	"Olive" : [ "#B4AF91", "#787746", "#40411E", "#32331D" ],
	"Soil and Sky" : [ "#928174", "#AA9788", "#BDE4E9", "#A8E1E9", "#90D1DA" ],
	"Candid" : [ "#EADEA1", "#808355", "#4E493D", "#3A301C", "#3F7696" ],
	"Sulphide" : [ "#949993", "#615952", "#343640", "#A15026", "#C7B091" ],
	"New Moon" : [ "#EEE6AB", "#C5BC8E", "#696758", "#45484B", "#36393B" ],
	"Nature" : [ "#EEEFD8", "#BECD8A", "#73880A", "#CCCC33", "#E2EAA3" ],
	"Earth" : [ "#862424", "#D8D1B4", "#B3AB8E", "#F1F0E9", "#353535" ],
	"Sea" : [ "#334433", "#6699aa", "#88aaaa", "#aacccc", "#447799" ],
	"Lemon" : [ "#eebb00", "#ddaa00", "#eecc00", "#ffee11" ],
	"Water" : [ "#2266bb", "#3388dd", "#55aaee", "#bbddee", "#113355" ],
	"Grass" : [ "#00AF64", "#36D729", "#61D7A4", "#007241" ],

};
// TODO create your own palette
AR.Utility.setPalette = function(element, colors) {
	element.fillStyle(function() {
		return colors[this.index % colors.length];
	});

};

AR.Utility.findMaxValue = function(graphDef) {
	if (graphDef.dataset) {
		var dataArray = [];
		for (i = 0; i < graphDef.dataset.length; i++) {
			var max = AR.Utility.findMax(graphDef.dataset[i].data);
			var maxMap = {
				"value" : max
			};
			dataArray.push(maxMap);
		}
		return AR.Utility.findMax(dataArray);
	} else {
		return AR.Utility.findMax(graphDef.data);
	}
};
AR.Utility.setLabelProperties = function(graphDef, labelObj, isHorizontal) {
	var self = this;
	var properties = AR.Graph.labelProperties;
	properties.forEach(function(prop) {
		var upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
		AR.Utility["set" + upcasedProp](graphDef[prop], labelObj, isHorizontal);
	});
};

AR.Utility.setLabelFontSize = function(size, labelObj) {
	if (labelObj) {
		labelObj.font(size + "px Arial");
	}
};
AR.Utility.setLabelFontColor = function(color, labelObj) {
	if (labelObj) {
		labelObj.textStyle(color);
	}
};
AR.Utility.setLabelRotateAngle = function(angle, labelObj, isHorizontal) {
	angle = parseInt(angle,10);
	if (labelObj) {
		labelObj.textAngle(angle / 180 * Math.PI);
		if (isHorizontal) {
			angle < 0 ? labelObj.textBaseline("right") : angle === 0 ? labelObj.textBaseline("center") : labelObj.textBaseline("top");
			(angle === 90 || angle === -90) ? labelObj.textAlign("center") : labelObj.textAlign("right");
		} else {
			angle < 0 ? labelObj.textAlign("right") : angle === 0 ? labelObj.textAlign("center") : labelObj.textAlign("left");
		}

	}
};
AR.Utility.setToolTip = function(graphDef, element, direction) {
	if (graphDef.toolTip) {
		element.event("mouseover", pv.Behavior.tipsy({
			gravity : function() {
				return (direction);
			},
			fade : true
		}));
	}
};
