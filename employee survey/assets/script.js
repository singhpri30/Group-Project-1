//pulling date from moments and setting as a variable
var todayDate = moment().format("MM" + "-" + "DD" + "-" + "YY");
//adding the date stamp to the survey
$("#dateStamp").text(todayDate);

//survey questions set as an array to be looped through
var surveyQuestions = [
  "Have you been in close contact with a confirmed case of Covid-19?",
  "Have you had a fever or felt feverish in the last 72 hours?",
  "Are you experiencing any respiratory symptoms, including a runny nose, sore throat, cough, or shortness of breath?",
  "Are you experiencing any new muscle aches or chills?",
  "Have you experienced any new change in your sense of taste or smell?",
];

//for looping through questions
var questionNum = 0;

//pulls the list of admins from local storage as a string
var adminEntryListJSON = localStorage.getItem("admin-json");
//parses it be displayed in the select drop down
var adminEntryList = JSON.parse(adminEntryListJSON);

//same thing as above, but for employees
var employeeEntryListJSON = localStorage.getItem("employee-json");
var employeeEntryList = JSON.parse(employeeEntryListJSON);

//landing spot for answers after pulled from session storage
// will then be used to add to local storage for further use
var answerObject = {};

//looping through admin names in local storage to add to
// select drop down
//if there are no names in local storage, nothin happens
if (adminEntryList == null) {
} else {
  for (i = 0; i < adminEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(adminEntryList[i]);
    $("#adminName").append(addNameToSelector);
  }
}
//same as above, but for employee list
if (employeeEntryList == null) {
} else {
  for (i = 0; i < employeeEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(employeeEntryList[i]);
    $("#employeeName").append(addNameToSelector);
  }
}

// .one() function:
//https://stackoverflow.com/questions/2323948/disabling-the-button-after-once-click

//on click, an input field and add button appear
//survey taker can add a name to the list
$("#addAdmin").one("click", function () {
  var nameInput = $("<input>").attr({ class: "input", id: "newAdminName" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewAdmin" })
    .text("Add");
  var addNameToSelector = $("<option>");
  $("#employeeAdmin").append(nameInput);
  $("#employeeAdmin").append(addNameButton);

  //when add button is clicked, name is appended to dom
  $("#addNewAdmin").click(function () {
    var newAdminToAdd = $("#newAdminName").val();
    $(addNameToSelector).text(newAdminToAdd);
    $("#adminName").append(addNameToSelector);
    $(nameInput).hide();
    $(addNameButton).hide();
  });
});

//same as above, but for employee field
$("#addEmployee").one("click", function () {
  var nameInput = $("<input>").attr({ class: "input", id: "newEmployeeName" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewEmployee" })
    .text("Add");
  var addNameToSelector = $("<option>");
  $(addNameButton).attr("id", "addNewEmployee");
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

//when start button is clicked
$("#startBtn").click(function () {
  //for looping through the admins in local storage
  var adminList = $("#adminName > option");
  var adminArrayLS = [];

  //looping through employees in ls
  var employeeList = $("#employeeName > option");
  var employeeArrayLS = [];

  //looping through admins and adding them to an array
  for (i = 1; i < adminList.length; i++) {
    var adminItemText = $(adminList[i]).val();
    adminArrayLS.push(adminItemText);
  }
  //looping through employees and adding to an array
  for (i = 1; i < employeeList.length; i++) {
    var employeeItemText = $(employeeList[i]).val();
    employeeArrayLS.push(employeeItemText);
  }
  //adding both lists to local storage so they can be accessed again
  adminArrayLSJSON = JSON.stringify(adminArrayLS);
  employeeArrayLSJSON = JSON.stringify(employeeArrayLS);
  localStorage.setItem("admin-json", adminArrayLSJSON);
  localStorage.setItem("employee-json", employeeArrayLSJSON);

  //creating an object to commit to session storage
  //object contains answers provided on this table
  var answersObject = {
    date: todayDate,
    adminName: $("#adminName option:selected").val(),
    employeeName: $("#employeeName option:selected").val(),
  };
  //clearing out anything already in session storage
  sessionStorage.clear();

  //adding to local storage
  answersObjectJSON = JSON.stringify(answersObject);
  sessionStorage.setItem("answers", answersObjectJSON);

  //asking the first question
  askQuestion();
});

//asks questions in sequential order
function askQuestion() {
  //clearing html
  $("#questionField").text("");
  //creating a paragraph and giving it an id = to its index in the surveyQuesions array
  var question = $("<p>").attr("id", questionNum);
  //adding question text
  $(question).text(surveyQuestions[questionNum]);

  //creating the next qusetion button
  var nextBtn = $("<button>")
    .attr({ class: "button", id: "nextBtn" })
    .text("Next");
  //appendnig question to field
  $("#questionField").append(question);

  //adding yes or no control buttons
  var radioAnswerdiv = $("<div>").attr({
    class: "control",
    id: "askQuestion",
  });
  var yesLabel = $("<label>").attr("class", "radio");
  var inputYes = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "yes",
  });

  var noLabel = $("<label>").attr("class", "radio");
  var inputNo = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "no",
  });
  //appending to field
  $(yesLabel).text("yes ");
  $(noLabel).text("no ");
  $(yesLabel).append(inputYes);
  $(radioAnswerdiv).append(yesLabel);
  $(noLabel).append(inputNo);
  $(radioAnswerdiv).append(noLabel);

  $("#questionField").append(radioAnswerdiv);
  $("#questionField").append(nextBtn);

  //for taking the employee temperature
  function takeTemp() {
    $("#questionField").text("");
    var header = $("<h1>").text("Employee Temperature");
    var employeeTemp = $("<input>").attr({
      class: "input",
      type: "number",
      id: "employeeTemp",
    });
    var submitBtn = $("<button>").attr({
      class: "button",
      id: "submitBtn",
    });
    $(submitBtn).text("Submit");
    $("#questionField").append(header, employeeTemp, submitBtn);
  }

  //functionality for the next question button
  $("#nextBtn").click(function () {
    if ($("#askQuestion input:checked").val() == null) {
      event.preventDefault();
      var pleaseAnswer = $("<p>")
        .text("Please Pick Yes or No")
        .css("color", "red");
      $("#questionField").append(pleaseAnswer);
    } else {
      questionNum++;
      //the third question (index 2) has a few potential follow-up questions
      if (questionNum === 2) {
        askQuestion();
        var testPara = $("<p>");
        $(testPara).text("test");
        $("#questionField").append(testPara);

        //otherwise, just needs to ask questions
      } else if (questionNum < surveyQuestions.length && questionNum != 2) {
        askQuestion();

        //one all questions have been asked, just needs to
      } else {
        takeTemp();
      }
    }
  });
}
