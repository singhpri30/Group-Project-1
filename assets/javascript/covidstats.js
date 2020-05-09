var queryURL = "https://api.covid19api.com/summary";
var nhQueryURL = "https://covidtracking.com/api/v1/states/NH/current.json";
countryTotal = "https://covidtracking.com/api/v1/states/current.json";
console.log(countryTotal);
//console.log(countryTotal); // total data 

$.ajax({
    url: countryTotal,
    method: 'GET',
}).then(function (response) {
    var stateEl = $("#states");
    console.log(stateEl);
    console.log(response);
    for (i = 0; i <= 55; i++) {
        // var optionEl = $("<option>")
        // console.log(optionEl);
        // console.log(response[i].state)
        // optionEl.text(response[i].state);
        // stateEl.append(optionEl);


        var tableRowElement = $("<tr>");
        var tabledateEl = $("<td>");
        tabledateEl.text(response[i].state);
        var tableConfirmed = $("<td>");
        tableConfirmed.text(response[i].total);

        tableRowElement.append(tabledateEl, tableConfirmed);
        $("#table-data").append(tableRowElement);

    }

});

$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) {
    // Create a new table row element
    console.log(response.Countries[236]);
    var totalConfirmed = response.Global.TotalConfirmed;
    var totalDeaths = response.Global.TotalDeaths;
    var totalRecovered = response.Global.TotalRecovered;
    var usaTotalConfirmed = response.Countries[236].TotalConfirmed;
    var usaTotalDeaths = response.Countries[236].TotalDeaths;
    var usaTotalRecovered = response.Countries[236].TotalRecovered;

    $("#global-stats").text(totalConfirmed);
    $("#death-stats").text(totalDeaths);
    $("#recovered-stats").text(totalRecovered);
    $("#usa-stats").text(usaTotalConfirmed);
    $("#usa-death-stats").text(usaTotalDeaths);
    $("#usa-recovered-stats").text(usaTotalRecovered);

});

$.ajax({
    url: nhQueryURL,
    method: 'GET',
}).then(function (response) {
    // Create a new table row element
    console.log(response.totalTestResults);
    var nhTotalConfirmed = response.total;
    var nhTotalDeaths = response.death;
    var nhTotalRecovered = response.recovered;

    $("#nh-stats").text(nhTotalConfirmed);
    $("#nh-death-stats").text(nhTotalDeaths);
    $("#nh-recovered-stats").text(nhTotalRecovered);

});

var countryTotal = "https://api.covid19api.com/total/country/united-states";
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
        backgroundColor: [
            'rgba(54, 162, 235)',//blue first data set
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)'

        ],
        borderWidth: 2,
    }, {
        type: 'bar',
        label: 'Active Cases',
        data: activeArray,
        backgroundColor: [
            'rgba(255, 206, 86)',//yellow
            'rgba(255, 206, 86)',
            'rgba(255, 206, 86)',
            'rgba(255, 206, 86)',
            'rgba(255, 206, 86)',
            'rgba(255, 206, 86)',

        ],
        borderWidth: 2

    }, {
        type: 'bar',
        label: 'Recovered cases',
        data: recoveredArray,
        backgroundColor: [
            'rgba(0,128,0)',//green 
            'rgba(0,128,0)',
            'rgba(0,128,0)',
            'rgba(0,128,0)',
            'rgba(0,128,0)',
            'rgba(0,128,0)'
        ],
        borderWidth: 2
    }, {
        type: 'bar',
        label: 'Deaths',
        data: deathsArray,
        backgroundColor: [
            'rgba(255, 0, 0)',//red
            'rgba(255, 0,0)',
            'rgba(255, 0,0)',
            'rgba(255, 0,0)',
            'rgba(255, 0,0)',
            'rgba(255, 0,0)',
            'rgba(255, 0,0)'

        ],
        borderWidth: 2
    }]
};


getData();
function getData() { //getting data from third part
    $.ajax({
        url: countryTotal,
        method: 'GET',
    }).then(function (response) {
        // Create a new table row element
        for (i = 100; i <= 105; i++) {
            var dateEl = response[i].Date;

            //console.log(xLabels);
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

