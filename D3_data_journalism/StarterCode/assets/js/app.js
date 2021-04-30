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
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from the data csv file
d3.csv("assets/data/data.csv").then(function (StateData) {
  console.log(StateData);

  // sort through the data
  StateData.forEach(function (data) {
    // Parse data as numbers
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // create scales

  // compare 
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(StateData, d => d.poverty)-5,d3.max(StateData, d => d.poverty)+5])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(StateData, d => d.healthcare)])
    .range([height, 0]);

  // create axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(StateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("class", function (d) {
      return "stateCircle" + d.abbr;
    })
    .attr("fill", "blue")
    .attr("opacity", ".5")
    .text(datum => datum['abbr']);

  var textGroup = chartGroup.append("g")
  .selectAll('.stateText')
  .data(StateData)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.healthcare))
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "central");


  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  textGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 5)
    .attr("x", 0 - (height / 2) - 50)
    // .attr("dx", d => xLinearScale(d.poverty))
    // .attr("dy", d => yLinearScale(d.healthcare))
    .attr("class", "axisText")
    .text("People without Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty (%)");
}).catch(function (error) {
  console.log(error);

});
