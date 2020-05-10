

var usaStateTotal = "https://covidtracking.com/api/v1/states/current.json";



// *****this code is for creating a table to populate usa state data
$.ajax({
    url: usaStateTotal,
    method: 'GET',
}).then(function (response) {

    for (i = 0; i <= 55; i++) { //looping over states

        var tableRowElement = $("<tr>"); //creating a table row

        var tabledateEl = $("<td>"); //creating a table cell
        tabledateEl.text(response[i].state); // setting table cell text to state name 

        var tableConfirmed = $("<td>");//creating a table cell
        tableConfirmed.text(response[i].total); // setting table cell text to state name 

        var tableDeath = $("<td>");//creating a table cell
        tableDeath.text(response[i].death);// setting table cell text to state name 

        tableRowElement.append(tabledateEl, tableConfirmed, tableDeath); //appending data to the table row
        $("#table-data").append(tableRowElement); //appending table data to the table

    }

})








//var countryTotal = "https://api.covid19api.com/total/country/united-states";
//console.log(countryTotal);
// var usaStatesArray = ["Belknap", "Carroll", "Strafford", "Rockingham", "Merrimack", "Cheshire", "Coos", "Grafton", "Hillsborough", "Sullivan"];

// var usaConfirmedArray = [];
// var usaDeathsArray = [];
// var usaRecoveredArray = [];

// var usaChartData = {
//     labels: usaStatesArray, //dates x-axis
//     datasets: [{
//         type: 'bar', //chart type
//         label: 'Confirmed',
//         data: usaConfirmedArray,
//         backgroundColor: [
//             'rgba(54, 162, 235)',//blue first data set
//             // 'rgba(54, 162, 235)',
//             // 'rgba(54, 162, 235)',
//             // 'rgba(54, 162, 235)',
//             // 'rgba(54, 162, 235)',
//             // 'rgba(54, 162, 235)'

//         ],
//         borderWidth: 2,
//         options: {
//             scales: {}
//         }
//     }]
// };

// usaChart();
// function usaChart() {
//     $.ajax({
//         url: usaStateTotal,
//         method: 'GET',
//     }).then(function (response) {

//         // var stateEl = $("#states");
//         // console.log(stateEl);
//         // console.log(response);
//         for (i = 0; i < usaStatesArray.length; i++) { //looping over states array
//             var usaStatesEl = response[i].state;
//             // console.log(usaStatesEl);

//             var usaConfirmnedEl = response[i].total;
//             console.log(usaConfirmnedEl);

//             var usaDeathsEl = response[i].death;
//             console.log(usaDeathsEl);

//             var usaRecoveredEl = response[i].recovered;
//             console.log(usaRecoveredEl);

//             usaStatesArray.push(usaStatesEl);

//             usaConfirmedArray.push(usaConfirmnedEl);
//             usaDeathsArray.push(usaDeathsEl);
//             usaRecoveredArray.push(usaRecoveredEl);
//             usaChartIt();
//         }


//     })
// }




// function usaChartIt() {

//     var ctx1 = document.getElementById('usachart').getContext('2d');
//     //clear chart
//     if (window.newChart != null) {
//         window.newChart.destroy();
//     }

//     window.newChart = new Chart(ctx1, {
//         type: 'bar',
//         data: usaChartData

//     });

// };



//**********this code is to display Global and USA data */
var queryURL = "https://api.covid19api.com/summary"; //api to fetch the data
$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) {

    //fetching the responses and storing in the variables
    var totalConfirmed = response.Global.TotalConfirmed;
    var totalDeaths = response.Global.TotalDeaths;
    var totalRecovered = response.Global.TotalRecovered;
    var usaTotalConfirmed = response.Countries[236].TotalConfirmed;
    var usaTotalDeaths = response.Countries[236].TotalDeaths;
    var usaTotalRecovered = response.Countries[236].TotalRecovered;

    //displaying the responses in different elements
    $("#global-stats").text(totalConfirmed);
    $("#death-stats").text(totalDeaths);
    $("#recovered-stats").text(totalRecovered);
    $("#usa-stats").text(usaTotalConfirmed);
    $("#usa-death-stats").text(usaTotalDeaths);
    $("#usa-recovered-stats").text(usaTotalRecovered);

});


//**********this code is to display NH data */
var nhQueryURL = "https://covidtracking.com/api/v1/states/NH/current.json"; //api to fetch NH data
$.ajax({
    url: nhQueryURL,
    method: 'GET',
}).then(function (response) {

    //fetching the responses and storing in the variables
    var nhTotalConfirmed = response.total;
    var nhTotalDeaths = response.death;
    var nhTotalRecovered = response.recovered;

    //displaying the responses in different elements
    $("#nh-stats").text(nhTotalConfirmed);
    $("#nh-death-stats").text(nhTotalDeaths);
    $("#nh-recovered-stats").text(nhTotalRecovered);

});


//**********this code is to create chart and display data on it */
var countryTotal = "https://api.covid19api.com/total/country/united-states"; //api to fetch the data
console.log(countryTotal);
// var janData = "https://api.covid19api.com/country/united-states?from=2020-01-01T00:00:00Z&to=2020-01-31T00:00:00Z";
// console.log(janData);
var dateArray = [];
var confirmedArray = [];
var activeArray = [];
var deathsArray = [];
var recoveredArray = [];

var chartData = {
    labels: dateArray, //dates x-axis
    datasets: [{
        type: 'bar', //chart type
        label: 'Confirmed Cases',
        data: confirmedArray,
        backgroundColor: 'rgba(54, 162, 235)',//blue first data set
        borderWidth: 2,
    }, {
        type: 'bar',
        label: 'Active Cases',
        data: activeArray,
        backgroundColor: 'rgba(255, 206, 86)',//yellow
        borderWidth: 2,

    }, {
        type: 'bar',
        label: 'Recovered cases',
        data: recoveredArray,
        backgroundColor: 'rgba(0,128,0)',//green 
        borderWidth: 2,
    }, {
        type: 'bar',
        label: 'Deaths',
        data: deathsArray,
        backgroundColor: 'rgba(255, 0, 0)',//red
        borderWidth: 2,
    }]
};


getData();
function getData() { //getting data from third part
    $.ajax({
        url: countryTotal,
        method: 'GET',
    }).then(function (response) {
        //console.log(response);
        // Create a new table row element
        for (i = 101; i < 106; i++) { //for jan for (i = 0; i <= 10; i++) for (i = 10; i <= 38; i++)

            var dateEl = response[i].Date;
            // console.log(dateEl);
            var confirmnedEl = response[i].Confirmed;
            var DeathsEl = response[i].Deaths;
            var RecoveredEl = response[i].Recovered;
            var ActiveEl = response[i].Active;
            var dt = moment(dateEl).format("MMMM Do");
            //console.log(dt);
            dateArray.push(dt);
            confirmedArray.push(confirmnedEl);
            //console.log(yLables);
            activeArray.push(ActiveEl);
            recoveredArray.push(RecoveredEl);
            deathsArray.push(DeathsEl);
            //console.log(xLabels1);

            chartIt();

        }

    });
};
function chartIt() {

    var ctx = document.getElementById('chart').getContext('2d');
    //clear chart
    if (window.myChart != null) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData

    });

};


(function () {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

