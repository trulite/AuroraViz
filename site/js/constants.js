var ARV = {};

ARV.getChartOptionsHTML = function(chartType) {
    var chartOptionsHTML = {
        bar: [
            '<div class="inline"><label> Type: </label>',
            '<select id="type">',
            '<option value="h">Horizontal</option > ',
            '<option value="v" selected> Vertical </option>',
            '</select></div>',
            '</div>'].join(" "),
        multibar: [
            '<div class="inline"><label> Type: </label>',
            '<select id="mbarChartTypes">',
            '<option value="hor">Horizontal</option > ',
            '<option value = "ver" > Vertical </option>',
            '</select></div>',
            '</div>'].join(" "),    
        line: [
            '<div 	class="inline"><label> Step Graph: </label>',
            '<input type="checkbox" id="isLineStyleStep"></input ></div> <br/>',
            '<label>Dot Size: </label>',
            '<div class="slider" id="dotSizeSlider"></div>',
            '<input size="8" type="text" id="dotSize" value="5" disabled="disabled" /> <br />',
            '<label>Line Width: </label>',
            '<div class="slider" id="lineWidthSlider"></div>',
            '<input size="8" type="text" id="lineWidth" value="2" disabled="disabled" /> <br />',
            '<label>Line Color: </label>',
            '<input value="#2266bb" class="colorPicker" size="8" type="text" id="lineColor" /><br/>',
            '</div>'].join(" "),
       multiLine: [
             '<div 	class="inline"><label> Step Graph: </label>',
             '<input type="checkbox" id="isLineStyleStep"></input ></div> <br/>',
             '<label>Dot Size: </label>',
             '<div class="slider" id="dotSizeSlider"></div>',
             '<input size="8" type="text" id="dotSize" value="2" disabled="disabled" /> <br />',
             '<label>Line Width: </label>',
             '<div class="slider" id="lineWidthSlider"></div>',
             '<input size="8" type="text" id="lineWidth" value="2" disabled="disabled" /> <br />',
             '</div>'].join(" "),
        
        pie: [
            '<label>Radius </label>',
            '<input type="text" id="pieRadius" value="100"   size="5"></input>',
            '</div>'].join(" "),
        bubble: [
            '</div>'].join(" "),
        donut: [
            '<div class="inline"><label>Inner Radius </label>',
            '<input type="text" id="innerRadius" value="100" size="5"></input></div>',
            '<div class="inline"><label>Outer Radius </label>',
            '<input type="text" id="outerRadius" value="50" size="5"></input></div>',
            '</div>'].join(" "),
        area: [
            '<div class="inline"><label> Interpolated </label>',
            '<input type="checkbox" id="interpolated"></input ></div> <br/>',
            '<label>Area Color: </label>',
            '<input value="#1F77B4" class="colorPicker" size="8" type="text" id="areaColor" /><br/>',
            '</div>'].join(" "),
        multiArea: [
              '<div class="inline"><label> Interpolated </label>',
              '<input type="checkbox" id="interpolated"></input ></div> <br/>',
              '</div>'].join(" "),
                   
        tree: [
            '</div>'].join(" "),
        sunburst: [
            '</div>'].join(" "),
        bullet: [
                 '<div class="inline"><label> Bullet Orientation </label>',
                 '<select id="bulletOrientation">',
                 '<option value="left" selected="selected">Left</option>',
                 '<option value="right">Right</option>',
                 '</select></div> <br/>',
                 '<div class="inline"><label> Bullet Orientation </label>',
                 '<select id="markerShape">',
                 '<option value="triangle" selected="selected">Triangle</option>',
                 '<option value="circle">Circle</option>',
                 '<option value="square">Square</option>',
                 '</select></div> <br/>',
                 '<label>Marker Color: </label>',
                 '<input value="#cccccc" class="colorPicker" size="8" type="text" id="markerFillColor" /><br/>',
                 '<label>Measure Color: </label>',
                 '<input value="#cfcfcf" class="colorPicker" size="8" type="text" id="measureFillColor" /><br/>',
                 ].join(" ")
    }[chartType];
    return chartOptionsHTML;
};
ARV.con = {
    canvasWidth: "canvasWidth",
    canvasHeight: "canvasHeight",
    palette: "palette",
    horGrid: "horGrid",
    verGrid: "verGrid",
    chartCaption: "chartCaption",
    yAxisName: "yAxisName",
    xAxisName: "xAxisName",
    toolTip: "toolTip",
    BarChartOptions: ARV.getChartOptionsHTML("bar"),
    MultibarChartOptions: ARV.getChartOptionsHTML("multibar"),
    LineChartOptions: ARV.getChartOptionsHTML("line"),
    MultilineChartOptions: ARV.getChartOptionsHTML("multiLine"),
    PieChartOptions: ARV.getChartOptionsHTML("pie"),
    DonutChartOptions: ARV.getChartOptionsHTML("donut"),
    BubbleChartOptions: ARV.getChartOptionsHTML("bubble"),
    AreaChartOptions: ARV.getChartOptionsHTML("area"),
    MultiAreaChartOptions: ARV.getChartOptionsHTML("multiArea"),
    StackedAreaChartOptions: ARV.getChartOptionsHTML("multiArea"),
    BulletChartOptions: ARV.getChartOptionsHTML("bullet"),
    //treeChartOptions: ARV.getChartOptionsHTML("tree"),
    //sunburstChartOptions: ARV.getChartOptionsHTML("sunburst"),
    BarChartParams: ["barChartTypes"],
    MultibarChartParams: ["mbarChartTypes"],
    LineChartParams: ["lineStep"],
    MultilineChartParams: ["lineStep"],
    PieChartParams: ["pieRadius", "pieAngle", "pieStartAngle", "pieEndAngle"],
    DonutChartParams: ["donutInnerRadius", "donutOuterRadius", "donutAngle"],
    AreaChartParams: ["areaSegmented", "areaInterpolated"],
    commonParams: ["canvasHeight", "canvasWidth", "palette", "horGrid", "verGrid", "chartCaption",
                          "yAxisName", "xAxisName", "toolTip", "showLabels", "showValues"],
    treeChartParams: [],
    bubbleChartParams: [],
    sunBurstChartParams: [],
    goldenRatio: 1.61803399
};
ARV.styles = {
	    captionSize: "20",
	    captionColor: "#000000",
	    canvasFillColor: "#fffff",
	    canvasBorderColor: "#111",
	    canvasBorderThickness: "0",
	    chartFillColor: "#fffff",
	    horAxisLabelColor: "#000000",
	    horAxisLabelSize: "12",
	    horAxisColor: "#000000",
	    horAxisThickness: "0",
	    verAxisLabelColor: "#000000",
	    verAxisLabelSize: "12",
	    verAxisColor: "#000000",
	    verAxisThickness: "0",
	    verGridShow: "checked",
	    verGridColor: "#cccccc",
	    verGridLabelShow: "checked",
	    verGridThickness: "1",
	    horGridShow: "checked",
	    horGridColor: "#cccccc",
	    horGridLabelShow: "checked",
	    horGridThickness: "1"
	};
	ARV.commonProperties = {
	    caption: "Profit (Yearly)",
	    yAxisName: "Amount (in billions)",
	    xAxisName: "Years",
	    width: 600,
	    height: 400,
	    type: "v",
	    toolTip: true,
	    showLabels: true,
	    showValues: true,
	    labelFontSize: "10",
	    labelFontColor: "#000000",
	    labelRotateAngle: "0",
	    palette: "presetPalette",
	    paletteColors: [],
	    presetPalette: "Plain",
	    isLineStyleStep: false,
	    pieRadius: "100",
	    dotSize: "5",
	    lineWidth: "2",
	    lineColor: "#000000",
	    outerRadius: "100",
	    innerRadius: "50",
	    interpolated: false,
	    segmented: true,
	    areaColor: "#1F77B4",
	    showLegends : true

	};
	ARV.defaultData = {
	    BarGraph: [
	        {
	        label: "2005",
	        value: 5},
	    {
	        label: "2006",
	        value: 10},
	    {
	        label: "2007",
	        value: 8},
	    {
	        label: "2008",
	        value: 12},
	    {
	        label: "2009",
	        value: 2}
	    ],
	    BubbleGraph: [
	        {
	        "x": 30,
	        "y": 1.3,
	        "z": 116,
	        "label": "Traders",
	        "toolTipText": "Traders"},
	    {
	        "x": 32,
	        "y": 3.5,
	        "z": 99,
	        "label": "Farmers",
	        "toolTipText": "Farmers"},
	    {
	        "x": 8,
	        "y": 2.1,
	        "z": 33,
	        "label": "Individuals",
	        "toolTipText": "Individuals"},
	    {
	        "x": 62,
	        "y": 2.5,
	        "z": 72,
	        "label": "MBH",
	        "toolTipText": "Medium Business Houses"},
	    {
	        "x": 78,
	        "y": 2.3,
	        "z": 55,
	        "label": "Corporate",
	        "toolTipText": "Corporate Group A"}
	    ],
	    BulletGraph: [
	        {
	        title: "Revenue",
	        toolTipText: "US$, in thousands",
	        ranges: [150],
	        measures: [270],
	        markers: [250]},
	    {
	        title: "Profit",
	        toolTipText: "%",
	        ranges: [20],
	        measures: [23],
	        markers: [26]},
	    {
	        title: "Order Size",
	        toolTipText: "US$, average",
	        ranges: [350],
	        measures: [320],
	        markers: [550]},
	    {
	        title: "New Customers",
	        toolTipText: "count",
	        ranges: [1400, 2000, 2500],
	        measures: [1650],
	        markers: [2100]},
	    {
	        title: "Satisfaction",
	        toolTipText: "out of 5",
	        ranges: [3.5, 4.25, 5],
	        measures: [4.7],
	        markers: [4.4]}
	         ]

	};
	ARV.defaultCategories = [
	    {
	    category: [
	        {
	        label: "Hardware"},
	    {
	        label: "Software"},
	    {
	        label: "Service"},
	    {
	        label: "HR"}
	    ]}
	];
	ARV.defaultDataSet = [
	    {
	    seriesname: "Domestic",
	    color: "8EAC41",
	    data: [
	        {
	        value: "84"},
	    {
	        value: "207"},
	    {
	        value: "116"},
	    {
	        value: "100"}
	    ]},
	{
	    seriesname: "International",
	    color: "607142",
	    data: [
	        {
	        value: "116"},
	    {
	        value: "237"},
	    {
	        value: "83"},
	    {
	        value: "90"}
	    ]}
	];
	ARV.JsonMap = {
	    BarGraph: "BarGraph",
	    LineGraph: "BarGraph",
	    PieGraph: "BarGraph",
	    DonutGraph: "BarGraph",
	    BubbleGraph: "BubbleGraph",
	    MultibarGraph: "MultiBarGraph",
	    MultilineGraph: "MultiBarGraph",
	    AreaGraph: "BarGraph",
	    MultiAreaGraph: "MultiBarGraph",
	    StackedAreaGraph: "MultiBarGraph",
	    BulletGraph: "BulletGraph"
	};
	ARV.ChartTypeMap = {
	    BarGraph: "BarGraph",
	    LineGraph: "LineGraph",
	    PieGraph: "PieGraph",
	    DonutGraph: "DonutGraph",
	    MultibarGraph: "BarGraph",
	    MultilineGraph: "LineGraph",
	    BubbleGraph: "BubbleGraph",
	    AreaGraph: "AreaGraph",
	    MultiAreaGraph: "AreaGraph",
	    StackedAreaGraph: "StackedAreaGraph",
	    BulletGraph: "BulletGraph"
	};
	ARV.singleToMultiMap = {
		BarGraph: "MultibarGraph",
		LineGraph: "MultilineGraph",
		AreaGraph:"MultiAreaGraph",
		PieGraph:"PieGraph",
		DonutGraph:"DonutGraph",
		StackedAreaGraph:"StackedAreaGraph",
		BubbleGraph:"BubbleGraph",
		BulletGraph: "BulletGraph"
	};