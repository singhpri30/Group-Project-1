var usaStateTotal = "https://covidtracking.com/api/v1/states/current.json";
var nhCountyTotal = "https://corona.lmao.ninja/v2/historical/usacounties/new%20hampshire?lastdays=1";
var ctx = document.getElementById('chart').getContext('2d');
var dateArray = [];
var confirmedArray = [];
var deathsArray = [];
var recoveredArray = [];


// *****this code is for creating a table to populate usa states data
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


//**********this code is to display Global data and USA data*/
var queryURL = "https://coronavirus-19-api.herokuapp.com/countries"; //api to fetch the data
$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) {

    //fetching the responses and storing in the variables
    var totalConfirmed = response[0].cases;
    var totalDeaths = response[0].deaths;
    var totalRecovered = response[0].recovered;

    //displaying the responses in different elements
    $("#global-stats").text(totalConfirmed);
    $("#death-stats").text(totalDeaths);
    $("#recovered-stats").text(totalRecovered);
    //fetching the responses and storing in the variables
    var usaTotalConfirmed = response[1].cases;

    var usaTotalDeaths = response[1].deaths;
    var usaTotalRecovered = response[1].recovered;

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
var usaDateWiseData = "https://covidtracking.com/api/us/daily";

$("#months").on("change", function () { //calling change function when the value of dropdown is changed
    $("#months").val(this.value);
    getData(this.value);
})

getData("May");
function getData(month) {
    $.ajax({
        url: usaDateWiseData,
        method: 'GET',
    }).then(function (response) {
        console.log(response);

        if (month === "May") {
            dateArray.length = 0; //emptying all the array before pushing new values
            confirmedArray.length = 0;
            recoveredArray.length = 0;
            deathsArray.length = 0;
            for (i = 0; i <= 14; i++) {   //0 to 11 may

                var dateEl = response[i].date;
                var confirmnedEl = response[i].total;
                var DeathsEl = response[i].death;
                var RecoveredEl = response[i].recovered;
                var dt = moment(dateEl, moment.ISO_8601).format('MM/DD/YYYY'); //changing the date format
                dateArray.push(dt);
                confirmedArray.push(confirmnedEl);
                recoveredArray.push(RecoveredEl);
                deathsArray.push(DeathsEl);
            };
            chartIt();
        }
        if (month === "Jan") {
            dateArray.length = 0;//emptying all the array before pushing new values
            confirmedArray.length = 0;
            recoveredArray.length = 0;
            deathsArray.length = 0;

            for (i = 105; i <= 114; i++) {

                var dateEl = response[i].date;
                var confirmnedEl = response[i].total;
                var DeathsEl = response[i].death;
                var RecoveredEl = response[i].recovered;
                var dt = moment(dateEl, moment.ISO_8601).format('MM/DD/YYYY');
                dateArray.push(dt);
                confirmedArray.push(confirmnedEl);
                recoveredArray.push(RecoveredEl);
                deathsArray.push(DeathsEl);
                chartIt();
            }
        }
        if (month === "Feb") {
            dateArray.length = 0;//emptying all the array before pushing new values
            confirmedArray.length = 0;
            recoveredArray.length = 0;
            deathsArray.length = 0;
            for (i = 76; i <= 104; i++) {

                var dateEl = response[i].date;
                var confirmnedEl = response[i].total;
                var DeathsEl = response[i].death;
                var RecoveredEl = response[i].recovered;
                var dt = moment(dateEl, moment.ISO_8601).format('MM/DD/YYYY');
                dateArray.push(dt);
                confirmedArray.push(confirmnedEl);
                recoveredArray.push(RecoveredEl);
                deathsArray.push(DeathsEl);
                chartIt();
            }
        }
        if (month === "March") {
            dateArray.length = 0;//emptying all the array before pushing new values
            confirmedArray.length = 0;
            recoveredArray.length = 0;
            deathsArray.length = 0;
            for (i = 45; i <= 75; i++) {

                var dateEl = response[i].date;
                var confirmnedEl = response[i].total;
                var DeathsEl = response[i].death;
                var RecoveredEl = response[i].recovered;
                var dt = moment(dateEl, moment.ISO_8601).format('MM/DD/YYYY');
                dateArray.push(dt);
                confirmedArray.push(confirmnedEl);
                recoveredArray.push(RecoveredEl);
                deathsArray.push(DeathsEl);
                chartIt();
            }
        }
        if (month === "April") {
            dateArray.length = 0;//emptying all the array before pushing new values
            confirmedArray.length = 0;
            recoveredArray.length = 0;
            deathsArray.length = 0;
            for (i = 15; i <= 44; i++) {

                var dateEl = response[i].date;
                var confirmnedEl = response[i].total;
                var DeathsEl = response[i].death;
                var RecoveredEl = response[i].recovered;
                var dt = moment(dateEl, moment.ISO_8601).format('MM/DD/YYYY');
                dateArray.push(dt);
                confirmedArray.push(confirmnedEl);
                recoveredArray.push(RecoveredEl);
                deathsArray.push(DeathsEl);
                chartIt();
            }

        }
    });
};

function chartIt() {
    if (window.myChart != null) {//before creating a new chart destroying any existing chart
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dateArray, //dates x-axis
            datasets: [{
                type: 'bar', //chart type
                label: 'Confirmed Cases',
                data: confirmedArray,
                backgroundColor: 'rgba(54, 162, 235)',//dataset one to display confirmed cases

                fill: false,
                borderWidth: 2,
            }, {
                type: 'bar',
                label: 'Recovered cases',
                data: recoveredArray,
                backgroundColor: 'rgba(0,128,0)',//dataset two to display recovered cases
                fill: false,
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Deaths',
                data: deathsArray,
                backgroundColor: 'rgba(255, 0, 0)',//dataset three to display deaths
                fill: false,
                borderWidth: 2
            }]
        }
    });
};


//**********this code is to create nh chart and display data on it */
var countyName = ["Belknap", "Carroll", "Cheshire", "Coos", "Grafton", "Hillsborough", "Merrimack", "Rockingham", "Strafford", "Sullivan"]
var dataCountyArray = [];
var deathDataArray = [];


$.ajax({
    url: nhCountyTotal,
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
    var nhctx = document.getElementById('nhChart').getContext('2d'); // storing canvas element in a variable
    if (window.nhChartEl != null) { //before creating a new chart destroying any existing chart
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

