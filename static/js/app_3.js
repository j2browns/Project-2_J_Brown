// console.log because we can
console.log("app_3.js for Course Search");

// create variable for table data
var golfData;

// get reference to table body
var tbody = d3.select("tbody");
console.log("tbody");


// read in data and add to table
d3.json("/test").then(function(data) {
//d3.csv("/results/MissRiver_golf_details.csv").then(function(data) {
    golfData = data;
    console.log(golfData);
   
    golfData.forEach(function(courseData) {
        

        var row = tbody.append("tr");

        Object.entries(courseData).forEach(function([key, value]) {

            var cell = row.append("td");
            cell.text(value);

        });
    });
});





// select the button
var button = d3.select("#filter-btn");
var handicapButton = d3.select("#filter-btn-handicap");

// select the form
var form = d3.select("#form");
var handicapForm = d3.select("#h-form");


//event handlers for clicking button or pressing enter
button.on("click", runEnter);
form.on("submit", runEnter);

handicapButton.on("click", runEnterHandicap);
handicapForm.on("submit", runEnterHandicap);

// function to run for both events for search form(button click or pressing enter)
function runEnter() {

    // prevent the page from refreshing
    d3.event.preventDefault();

    // select input element
    var courseInputElement = d3.select("#coursename.form-control");


    // get value out of input element
    var inputValue = courseInputElement.property("value");

    // print input value to console
    console.log(`The course name entered was: ${inputValue}`);

    // create variable for filtered data 
    var filteredData = golfData.filter(golfData => {
        return (
            golfData.course.includes(inputValue) ||
            golfData.hole.includes(inputValue) ||
            golfData.public_private.includes(inputValue)
        );
    });


    // clear all current values in table so new table with filtered results can be loaded
    d3.select("tbody").selectAll("tr").remove();

    filteredData.forEach(function(golf) {

        var row = tbody.append("tr");

            // append cell for table data 'td' and append values to cell
        Object.entries(golf).forEach(function([key, value]) {
            console.log(key, value);

            // append a cell to the row for each value
            var cell = row.append("td");

            // append value to each cell
            cell.text(value);

        });

    });

};

//function to run to calculate handicap

function runEnterHandicap() {

    //prevent page from refresh
    d3.event.preventDefault();

    // select input elements
    var handicapIndexInputElement = d3.select("#score.form-control");
    var gcourseInputElement = d3.select("#course-rating.form-control");
    var slopeInputElement = d3.select("#slope.form-control");

    // get value from input elements
    var handicapIndexInputValue = handicapIndexInputElement.property("value");
    var courseInputValue = gcourseInputElement.property("value");
    var slopeInputValue = slopeInputElement.property("value");
    
    
    console.log(`Handicap index entered" ${handicapIndexInputValue}`); 
    console.log(`Course rating entered: ${courseInputValue}`);   
    console.log(`Slope entered ${slopeInputValue}`);

    var output = (handicapIndexInputValue * slopeInputValue) / 113
    console.log(`Handicap output: ${output}`);

    document.getElementById("output").innerHTML = "<h5>Your Course Handicap: </h5>" + output.toFixed(1);

}



