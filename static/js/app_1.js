//loading data into system
// console.log("golf data imported");
// console.log(golf);

//Importing data from Flask Endpoing
d3.json("/test").then(function(courseData) {
    courseSelect = 643;
    initPlotCreate(courseData, courseSelect);
    mapCreate(courseData);
});  

//creates initial plot with a manually selected course.
//In this function all the data is passed to the routine and must
//be filtered to find desired function.
function initPlotCreate(courseData, courseSelect) {
  console.log(`returned course data`);
  console.log(courseData);

  //passing through array to find course and then grab specific data for plots
  for (var i=0; i < courseData.length; i++) {
      var course = courseData[i];
      //console.log(course);
      console.log(`the course selected is ${courseSelect}`);
      console.log(course.course_id);
      if (parseInt(course.course_id) === courseSelect) {
        console.log(course);
        var courseHole = parseInt(course.hole);
        var forwardYards = parseInt(course.forward_yards);
        var forwardSlope = parseInt(course.forward_slope);
        var middleYards = parseInt(course.middle_yards);
        var middleSlope = parseInt(course.middle_slope);
        var championshipYards = parseInt(course.championship_yards);
        var championshipSlope = parseInt(course.championship_slope);
        var courseName = course.course
        var openMonth = parseInt(course.beg_mnth);
        console.log(openMonth);
        var closeMonth = parseInt(course.end_mnth);
        console.log(closeMonth);
      }
  };
  //******************************************************************************************************************************** */
  // Code below generates a doughnut plot to visualize golf season
  // Months will be used as labels for plot
  var months = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  //setting open and close month and performing logic to create array of months
  //This is required because can have months that are closed in summer so opening month is numerically higher
  //than closing month.
  var openClose = [false, false, false, false, false, false, false, false, false, false, false, false];
  for (i=0;i<12;i++) {
    if ((closeMonth-openMonth)<0) {
      if ((i+1 >= openMonth) || (i+1 <= closeMonth)) { // || is same as or, && same as and
        openClose[i] = true;
      } 
    };
    if ((closeMonth-openMonth)>=0) {
      if ((i+1 >= openMonth) && (i+1<=closeMonth)) {
        openClose[i] = true;
      } 
    };

    }

    //all months will have same size wedge.  Information conveyed by color
  var fraction = [1,1,1,1,1,1,1,1,1,1,1,1];//all months have equal size in plot
  var colorBar = openClose.map(setColor);

  //function below is used to set color based on open (green) or closed (red)
  function setColor(month) {
      if (month){
          return "rgba(0,255,0,1)"//open month is green
      }
      else {
          return "rgba(255,0,0,1)"//close month is red
      };
  };

   //setting up data set and details for plot
  data = {
      datasets:[{
          data: fraction,
          backgroundColor: colorBar
      }],
      labels: months

  }
  //charting library for doughnut comes from Chart.js

  //plug in below is required to have data labels (i.e. months) display in plot
  Chart.defaults.global.plugins.datalabels.display = true;

  // Creating doughnut chart
  var ctx = document.getElementById('doughnut');//locate ID doughnut where chart to be placed in DOM
  //creating new chart
  var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
          title:{display: true,
                  position:"center",
                  padding: 0,
                  //text: ["Course", "Season"],
          },
          legend:{display: false},
          //plug in used to place data labels (month) in charts
          plugins: {
              datalabels: {
                  formatter: function(value,context) {
                      return context.chart.data.labels[context.dataIndex];
                  }
              }
          },
          // maintainAspectRatio: false,
          rotation:Math.PI,//used to start graph at 180 degrees
          circumference: Math.PI,//chart is half of arc - extends from 180 to 0 degrees
          animation: {animateScale: true}, //animates drawing of graph
          
          layout: {
          padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
              }
          }
      }
  });

  //******************************************************************************************************************************** */
  //Code for parallel coordinate plot 
  //is a great plot for showing values with widely different scales.

  //setting yardage based on number of holes on course.  Have some over 18 and also odd numbers 
  //such as less than nine.
  switch (true) {
    case courseHole < 15:
      yardageTick = [1000,2000,3000,4000,5000];
      yardageRange = [1000,5000];
      break;
    case courseHole < 20:
      yardageTick = [4000,5000,6000,7000,8000];
      yardageRange = [4000,8000];
      break;
    default:
      yardageTick = [5000,6000,7000,8000];
      yardageRange = [5000,8000];
  }
//selecting plot type
  var trace = {
      type: 'parcoords',
      line: {
        color: 'red'
      },
//setting axis parameters  
      dimensions: [{
        range: yardageRange,
        //constraintrange: [1, 2],
        label: 'Forward<br>Yards',
        values: [forwardYards],
        tickvals: yardageTick
        
      }, {    
        range: [70,160],
        label: 'Forward<br>Slope',
        values: [forwardSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      }, {
        range: yardageRange,
        label: 'Middle<br>Yards',
        values: [middleYards],
        tickvals: yardageTick,
        
      }, {
        range: [70,160],
        label: 'Middle<br>Slope',
        values: [middleSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      },
      {
        range: yardageRange,
        label: 'Champion<br>Yards',
        values: [championshipYards],
        tickvals: yardageTick,
      },
      {
        range: [70,160],
        label: 'Champion<br>Slope',
        values: [championshipSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      },
    ]
    };

    layout = {
      title: {text:courseName},
      paper_bgcolor: "rgba(0,0,0,0)" //to create transparent background
    };
    
    var data = [trace]
    
    Plotly.newPlot('radar', data, layout);
 
  };
     

  //this function creates the updated plots based on clicks from the user of the site
  //only receives row containing course of interest - different than original plot
  // below is routine for generating updated plots
  function plotCreate(courseData, courseSelect) {
    //courseData = getData();
    console.log(`returned course data`);
    console.log(courseData);
    console.log(`the course selected is ${courseSelect}`);
    //if (parseInt(courseData.course_id) === courseSelect) {
    var courseHole = parseInt(courseData.hole);
    var forwardYards = parseInt(courseData.forward_yards);
    var forwardSlope = parseInt(courseData.forward_slope);
    var middleYards = parseInt(courseData.middle_yards);
    var middleSlope = parseInt(courseData.middle_slope);
    var championshipYards = parseInt(courseData.championship_yards);
    var championshipSlope = parseInt(courseData.championship_slope);
    var courseName = courseData.course;
    var openMonth = parseInt(courseData.beg_mnth);
    console.log(openMonth);
    var closeMonth = parseInt(courseData.end_mnth);
    console.log(closeMonth);
    //}
     
  //******************************************************************************************************************************** */
  // Code below generates a doughnut plot to visualize golf season
  // Setting up initial variables for demonstration.  these will need to be replaced with data from Flask
  var months = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  //setting open and close month and performing logic to create array of months
  //logic below is to account for regions where courses are closed in summer due to extreme heat
  var openClose = [false, false, false, false, false, false, false, false, false, false, false, false];
  for (i=0;i<12;i++) {
    if ((closeMonth-openMonth)<0) {
      if ((i+1 >= openMonth) || (i+1 <= closeMonth)) { // || is same as or, && same as and
        openClose[i] = true;
      } 
    };
    if ((closeMonth-openMonth)>=0) {
      if ((i+1 >= openMonth) && (i+1<=closeMonth)) {
        openClose[i] = true;
      } 
    };

    }
  // console.log(openClose);

  //setting all wedges to have same size - information contained in color
  var fraction = [1,1,1,1,1,1,1,1,1,1,1,1];//all months have equal size in plot
  var colorBar = openClose.map(setColor);

  //function below is used to set color based on open (green) or closed (red)
  function setColor(month) {
      if (month){
          return "rgba(0,255,0,1)"//open or true is green
      }
      else {
          return "rgba(255,0,0,1)"//close or false is red
      };
  };


  //setting up data set
  data = {
      datasets:[{
          data: fraction,
          backgroundColor: colorBar
      }],
      labels: months

  }

  //plug in below is required to have data labels (i.e. months) display in plot
  //plot for doughnut uses Chart.js
  Chart.defaults.global.plugins.datalabels.display = true;
  // Creating doughnut chart

  var ctx = document.getElementById('doughnut');//locate ID doughnut where chart to be placed in DOM
  //creating new chart
  var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
          title:{display: true,
                  position:"center",
                  padding: 0,
                  //text: ["Course", "Season"],
          },
          legend:{display: false},
          //plug in used to place data labels (month) in charts
          plugins: {
              datalabels: {
                  formatter: function(value,context) {
                      return context.chart.data.labels[context.dataIndex];
                  }
              }
          },
          // maintainAspectRatio: false,
          rotation:Math.PI,//used to start graph at 180 degrees
          circumference: Math.PI,//chart is half of arc - extends from 180 to 0 degrees
          animation: {animateScale: true}, //animates drawing of graph
          
          layout: {
          padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
              }
          }
      }
  });

  //******************************************************************************************************************************** */
  //Code Below for Parallel Coordinate Plot.  Coordinate plot comes from Plotly library
  //Below sets up ranges for inidividual axis for conveying information.
  //Need filtering because scale of yardage should change with number of holes.
  switch (true) {
    case courseHole < 15:
      yardageTick = [1000,2000,3000,4000,5000];
      yardageRange = [1000,5000];
      break;
    case courseHole < 20:
      yardageTick = [4000,5000,6000,7000,8000];
      yardageRange = [4000,8000];
      break;
    default:
      yardageTick = [5000,6000,7000,8000];
      yardageRange = [5000,8000];
  }

  var trace = {
      type: 'parcoords',
      line: {
        color: 'red'
      },
      
      dimensions: [{
        range: yardageRange,
        //constraintrange: [1, 2],
        label: 'Forward<br>Yards',
        values: [forwardYards],
        tickvals: yardageTick
        
      }, {    
        range: [70,160],
        label: 'Forward<br>Slope',
        values: [forwardSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      }, {
        range: yardageRange,
        label: 'Middle<br>Yards',
        values: [middleYards],
        tickvals: yardageTick,
        
      }, {
        range: [70,160],
        label: 'Middle<br>Slope',
        values: [middleSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      },
      {
        range: yardageRange,
        label: 'Champion<br>Yards',
        values: [championshipYards],
        tickvals: yardageTick,
      },
      {
        range: [70,160],
        label: 'Champion<br>Slope',
        values: [championshipSlope],
        tickvals: [70,80,90,100,110,120,130,140,150,160]
      },
    ]
    };

    layout = {
      title: {text:courseName},
      paper_bgcolor: "rgba(0,0,0,0)" //to create transparent background
    };
    
    var data = [trace]
    
    Plotly.newPlot('radar', data, layout);
 
  };
  