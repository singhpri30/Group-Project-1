var employeeData = localStorage.getItem("answers");
var employeeDataJSON = JSON.parse(employeeData);

console.log(employeeDataJSON);

var rows = 10;
var columns = employeeDataJSON.length / 10;

for (x = 0; x < columns; x++) {
  //columnDiv is equal to table row
  var columnDiv = $("<tr>");
  for (y = 0; y < rows; y++) {
    //dataEntry is equal to row input
    var dataEntry = $("<td>").text(employeeDataJSON[y + x * 10]);
    //append input to row
    $(columnDiv).append(dataEntry);
  }
  //append row
  $("#dataGrid").append(columnDiv);
}