// console.log because we can
console.log("app_4.js");


// variables for svg width and height
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// create SVG wrapper for holding public-private chart
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// append chart group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


function DrawBubbleChart(architect) {

    console.log(`DrawBarGraph(${architect})`);

    d3.csv("/results/MissRiver_golf_details.csv").then((data) => {

        console.log(data);

        var courseArchitects = data.courseArchitects;

        var resultArray = courseArchitects.filter(c => c.architect === architect);

        var result = resultArray[0];

        var state = result.state;

        var course_id = d3.count(result.course_id);

        var bubbleData = {
            x: state,
            y: course_id,
            text: state,
            mode: 'markers',
            marker: {
                size: course_id,
                color: state
            }
        }

        var bubbleLayout = {
            title: 'Number of Courses per State per Architect',
            xaxis: { title: 'State'}
        }

        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);
    });
}


DrawBubbleChart();






// // import data from CSV
// d3.csv("/results/MissRiver_golf_details.csv").then(function(golfData) {

//     // format data
//     golfData.forEach(function(golf) {
//         golf.public = d3.count(golf.public_private === 'Public');
//         console.log(golf.public);
//     })
// });