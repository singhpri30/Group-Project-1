var usaStateTotal = "https://covidtracking.com/api/v1/states/current.json";
var nhCountyTotal = "https://corona.lmao.ninja/v2/historical/usacounties/new%20hampshire?lastdays=1";


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
        tableConfirmed.text(response[i].total); // setting table cell text to total confirmed cases

        var tableDeath = $("<td>");//creating a table cell
        tableDeath.text(response[i].death);// setting table cell text to total deaths

        tableRowElement.append(tabledateEl, tableConfirmed, tableDeath); //appending data to the table row
        $("#table-data").append(tableRowElement); //appending table data to the table

    }

})

// *****this code is for creating a table to populate nh county data
$.ajax({
    url: nhCountyTotal,
    method: 'GET',
}).then(function (response) {

    for (var i = 0; i <= 9; i++) {

        var countyName = response[i].county; //getting county names
        var confirmedCounty = response[i].timeline.cases; //getting total cases
        var deathCounty = response[i].timeline.deaths; //getting total deaths
        for (x in confirmedCounty) {
            var countyCases = confirmedCounty[x];
        }
        for (y in deathCounty) {
            var countyDeaths = deathCounty[y];
        }

        var tableRowElement = $("<tr>"); //creating a table row

        var tabledateEl = $("<td>"); //creating a table cell
        tabledateEl.text(countyName.toUpperCase()); // setting table cell text to county name 

        var tableConfirmed = $("<td>");//creating a table cell
        tableConfirmed.text(countyCases); // setting table cell text to confirmed cases

        var tableDeath = $("<td>");//creating a table cell
        tableDeath.text(countyDeaths);// setting table cell text to total deaths

        tableRowElement.append(tabledateEl, tableConfirmed, tableDeath); //appending data to the table row
        $("#nhTable-data").append(tableRowElement); //appending table data to the table
    };

})


//**********this code is to display Global data */
var queryURL = "https://api.covid19api.com/summary"; //api to fetch the data
$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) {

    //fetching the responses and storing in the variables
    var totalConfirmed = response.Global.TotalConfirmed;
    var totalDeaths = response.Global.TotalDeaths;
    var totalRecovered = response.Global.TotalRecovered;

    //displaying the responses in different elements
    $("#global-stats").text(totalConfirmed);
    $("#death-stats").text(totalDeaths);
    $("#recovered-stats").text(totalRecovered);

});

//**********this code is to display USA data */
var usaQueryURL = "https://covidtracking.com/api/v1/us/current.json"; //api to fetch the data
$.ajax({
    url: usaQueryURL,
    method: 'GET',
}).then(function (response) {

    //fetching the responses and storing in the variables
    var usaTotalConfirmed = response[0].total;
    console.log(usaTotalConfirmed);
    var usaTotalDeaths = response[0].death;
    var usaTotalRecovered = response[0].recovered;

    //displaying the responses in different elements
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


//**********this code is to create usa chart and display data on it */
var countryTotal = "https://api.covid19api.com/total/country/united-states"; //api to fetch the data


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



//**********this code is to create nh chart and display data on it */
var countyURL = "https://corona.lmao.ninja/v2/historical/usacounties/new%20hampshire?lastdays=1";
var countyName = ["Belknap", "Carroll", "Cheshire", "Coos", "Grafton", "Hillsborough", "Merrimack", "Rockingham", "Strafford", "Sullivan"]
var dataCountyArray = [];
var deathDataArray = [];


$.ajax({
    url: countyURL,
    method: "GET",
}).then(function (response) {

    for (var i = 0; i < countyName.length; i++) {

        var countyCases = response[i].timeline.cases;
        var countyDeaths = response[i].timeline.deaths;
        for (x in countyCases) {
            var countyCasesTotal = countyCases[x];

        }
        for (y in countyDeaths) {
            var countryDeathTotal = countyDeaths[y];

        }
        dataCountyArray.push(countyCasesTotal);
        deathDataArray.push(countryDeathTotal);

        nhChartIt(); //calling this function to create chart
    }

})

// this code will create nh county chart
function nhChartIt() {
    var nhctx = document.getElementById('nhChart').getContext('2d'); // storing canvan element in a variable
    if (window.nhChartEl != null) {
        window.nhChartEl.destroy();
    }

    window.nhChartEl = new Chart(nhctx, {
        type: 'line',
        data: {
            labels: countyName, //x-axis data
            datasets: [{
                label: 'Total Cases', //dataset one to display total cases
                data: dataCountyArray,
                borderColor: 'rgba(0,128,0)',
                pointBorderWidth: 7,
                borderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
                fill: false,
            }, {

                label: 'Total Deaths', //dataset two to display total deaths
                data: deathDataArray,
                borderColor: 'rgba(255,0,0)',
                pointBorderWidth: 7,
                borderWidth: 2,
                pointRadius: 3,
                borderWidth: 4,
                fill: false,
            }]
        }
    });
}














//this code to make navbar responsive
(function () {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

