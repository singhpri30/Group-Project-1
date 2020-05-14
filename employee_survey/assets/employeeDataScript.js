var employeeData = localStorage.getItem("answers");
var employeeDataJSON = JSON.parse(employeeData);

var rows = 10;
var columns = employeeDataJSON.length / 10;

for (x = 0; x < columns; x++) {
  //columnDiv is equal to table row
  var columnDiv = $("<tr>");
  for (y = 0; y < rows; y++) {
    //dataEntry is equal to row input
    var dataEntry = $("<td>").text(employeeDataJSON[y + x * 10]);
    if (dataEntry.html() === "Yes") {
      dataEntry.css("backgroundColor", "red");
    } else if (dataEntry.html() >= 100) {
      dataEntry.css("backgroundColor", "red");
    }
    //append input to row
    $(columnDiv).append(dataEntry);
  }
  //append row
  $("#dataGrid").prepend(columnDiv);
}
