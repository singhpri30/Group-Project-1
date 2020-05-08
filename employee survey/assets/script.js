var date = moment().format("MM" + "-" + "DD" + "-" + "YY");
$("#dateStamp").text(date);

var surveyQuestions = [
  "Have you been in close contact with a confirmed case of Covid-19?",
  "Have you had a fever or felt feverish in the last 72 hours?",
  "Are you experiencing any respiratory symptoms, including a runny nose, sore throat, cough, or shortness of breath?",
  "Are you experiencing any new muscle aches or chills?",
  "Have you experienced any new change in your sense of taste or smell?",
];

var questionNum = -1;

var adminEntryListJSON = localStorage.getItem("admin-json");
var adminEntryList = JSON.parse(adminEntryListJSON);

var employeeEntryListJSON = localStorage.getItem("employee-json");
var employeeEntryList = JSON.parse(employeeEntryListJSON);

if (adminEntryList == null) {
} else {
  for (i = 0; i < adminEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(adminEntryList[i]);
    $("#adminName").append(addNameToSelector);
  }
}
if (employeeEntryList == null) {
} else {
  for (i = 0; i < employeeEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(employeeEntryList[i]);
    $("#employeeName").append(addNameToSelector);
  }
}

function askQuestion() {
  $("#questionField").text("");
  var question = $("<p>").attr("id", questionNum);
  $(question).text(surveyQuestions[questionNum]);
  var btnDiv = $("<div>");
  var nextBtn = $("<button>")
    .attr({ class: "button", id: "nextBtn" })
    .text("Next");
  $(btnDiv).append(nextBtn);
  $("#questionField").append(question.text());
  var radioAnswerdiv = $("<div>").attr({
    class: "control",
    id: "q" + questionNum,
  });
  var yesLabel = $("<label>").attr("class", "radio");
  var inputYes = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "yes",
  });
  $(yesLabel).text("yes ");
  var noLabel = $("<label>").attr("class", "radio");
  var inputNo = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "no",
  });
  $(noLabel).text("no ");
  $(yesLabel).append(inputYes);
  $(radioAnswerdiv).append(yesLabel);
  $(noLabel).append(inputNo);
  $(radioAnswerdiv).append(noLabel);
  $("#questionField").append(radioAnswerdiv);

  $("#questionField").append(btnDiv);

  function takeTemp() {
    $("#questionField").text("");
    var header = $("<h1>").text("Employee Temperature");
    var employeeTemp = $("<input>").attr({
      class: "input",
      id: "employeeTemp",
    });
    var submitBtn = $("<button>").attr({
      class: "button",
      id: "submitBtn",
    });
    $(submitBtn).text("Submit");
    $("#questionField").append(header, employeeTemp, submitBtn);
  }

  $("#nextBtn").click(function () {
    questionNum++;
    if (questionNum === 2) {
      askQuestion();
      var testPara = $("<p>");
      $(testPara).text("test");
      $("#questionField").append(testPara);
    } else if (questionNum < surveyQuestions.length && questionNum != 2) {
      askQuestion();
    } else {
      takeTemp();
    }
  });
}

// .one() function:
//https://stackoverflow.com/questions/2323948/disabling-the-button-after-once-click
$("#addAdmin").one("click", function () {
  var nameInput = $("<input>").attr("class", "input");
  var addNameButton = $("<button>").attr("class", "btn").text("Add");
  var addNameToSelector = $("<option>");
  $(addNameButton).attr("id", "addNewAdmin");
  $(nameInput).attr("id", "newAdminName");
  $("#employeeAdmin").append(nameInput);
  $("#employeeAdmin").append(addNameButton);

  $("#addNewAdmin").click(function () {
    var newAdminToAdd = $("#newAdminName").val();
    $(addNameToSelector).text(newAdminToAdd);
    $("#adminName").append(addNameToSelector);
    $(nameInput).hide();
    $(addNameButton).hide();
  });
});

$("#addEmployee").one("click", function () {
  var nameInput = $("<input>").attr("class", "input");
  var addNameButton = $("<button>").attr("class", "btn").text("Add");
  var addNameToSelector = $("<option>");
  $(addNameButton).attr("id", "addNewEmployee");
  $(nameInput).attr("id", "newEmployeeName");
  $("#newEmployee").append(nameInput);
  $("#newEmployee").append(addNameButton);

  $("#addNewEmployee").click(function () {
    var newEmployeeToAdd = $("#newEmployeeName").val();
    $(addNameToSelector).text(newEmployeeToAdd);
    $("#employeeName").append(addNameToSelector);
    $(nameInput).hide();
    $(addNameButton).hide();
  });
});

$("#startBtn").click(function () {
  questionNum++;
  var adminList = $("#adminName > option");
  var adminArrayLS = [];

  var employeeList = $("#employeeName > option");
  var employeeArrayLS = [];

  for (i = 1; i < adminList.length; i++) {
    var adminItemText = $(adminList[i]).val();
    adminArrayLS.push(adminItemText);
  }
  for (i = 1; i < employeeList.length; i++) {
    var employeeItemText = $(employeeList[i]).val();
    employeeArrayLS.push(employeeItemText);
  }
  adminArrayLSJSON = JSON.stringify(adminArrayLS);
  employeeArrayLSJSON = JSON.stringify(employeeArrayLS);
  localStorage.setItem("admin-json", adminArrayLSJSON);
  localStorage.setItem("employee-json", employeeArrayLSJSON);

  askQuestion();
});
