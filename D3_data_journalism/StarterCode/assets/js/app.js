// @TODO: YOUR CODE HERE!
// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`

// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Import data from the data csv file
d3.csv("assets/data/data.csv").then(function(StateData) {
    console.log(StateData);
    console.log([StateData]);

    // sort through the data
    StateData.forEach(function(data) {

    })
    
    // create scales
    // compare income levels vs obesity levels
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(StateData, d => d.income))
        .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(StateData, d => d.obesity)])
        .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xLinearScale).ticks(10);
    var yAxis = d3.axisLeft(yLinearScale).ticks(10);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);
});