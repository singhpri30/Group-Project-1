var employeeData = localStorage.getItem("answers");
var employeeDataJSON = JSON.parse(employeeData);

console.log(employeeDataJSON);

var rows = 10;
var columns = employeeDataJSON.length / 10;

for (i = 0; i < employeeDataJSON.length; i++) {
  var dataEntry = $("<div>").text(employeeDataJSON[i]).css({
    border: "solid 1px black",
    background: "white",
    color: "black",
    width: "400px",
  });
  for (x = i * 10; x < rows; x++) {
    for (y = 0; y < columns; y++) {}
  }
  $("#dataGrid").append(dataEntry);
}
