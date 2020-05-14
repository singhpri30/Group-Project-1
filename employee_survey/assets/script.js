//pulling date from moments and setting as a variable
var todayDate = moment().format("MM" + "-" + "DD" + "-" + "YY");
//adding the date stamp to the survey
$("#dateStamp").text(todayDate);

//Default is employee is cleared for work
// in later functions, a click listener is placed on the "yes" responses
// if the employ answers yes, result will switch to telling them to return home
// and seek medical advice
localStorage.setItem("result", "Employee is cleared to work");

//survey questions set as an array to be looped through
var surveyQuestions = [
  "Have you been in close contact with a confirmed case of Covid-19?",
  "Have you had a fever or felt feverish in the last 72 hours?",
  "Are you experiencing any respiratory symptoms, including a runny nose, sore throat, cough, or shortness of breath?",
  "Are you experiencing any new muscle aches or chills?",
  "Have you experienced any new change in your sense of taste or smell?",
];

var abbreviatedQuestion = [
  "Contact with Covid-19",
  "Fever in last 72 hours",
  "Respiratory symptoms",
  "Muscle aches or chills",
  "Change to taste or smell",
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
  var nameInput = $("<input>")
    .attr({ class: "input", id: "newAdminName" })
    .css({ width: "300px", marginTop: "10px" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewAdmin" })
    .text("Add")
    .css({ width: "100px", height: "40px", marginTop: "10px" });
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
  var nameInput = $("<input>")
    .attr({ class: "input", id: "newEmployeeName" })
    .css({ width: "300px", marginTop: "10px" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewEmployee" })
    .text("Add")
    .css({ width: "100px", height: "40px", marginTop: "10px" });
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
function errorReturnUser() {
  $("#errorReturn").text("");
  var testError = $("<p>").text("Please Select a Name From The Dropdown").css({
    color: "red",
    fontSize: "20px",
    display: "flex",
    margin: " 0 auto",
  });
  setTimeout(function () {
    $("#errorReturn").append(testError);
  }, 50);
}

//when start button is clicked
$("#startBtn").click(function () {
  if ($("#adminName option:selected").val() === "Admin Name") {
    errorReturnUser();
  } else if ($("#employeeName option:selected").val() === "Employee Name") {
    errorReturnUser();
  } else {
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
      Date: todayDate,
      "Admin Name": $("#adminName option:selected").val(),
      "Employee Name": $("#employeeName option:selected").val(),
    };
    //clearing out anything already in session storage
    sessionStorage.clear();
    sessionStorage.setItem("symptoms", "");

    //adding to local storage
    answersObjectJSON = JSON.stringify(answersObject);
    sessionStorage.setItem("answers", answersObjectJSON);

    //asking the first question
    askQuestion();
  }
});

//asks questions in sequential order
function askQuestion() {
  //clearing html
  $("#questionField").text("");
  //creating a paragraph and giving it an id = to its index in the surveyQuesions array
  var question = $("<p>")
    .attr("id", questionNum)
    .css({ fontSize: "20px", paddingTop: "40px" });
  //adding question text
  $(question).text(surveyQuestions[questionNum]);

  //creating the next qusetion button
  var nextBtn = $("<button>")
    .attr({ class: "button", id: "nextBtn" })
    .text("Next")
    .css({ display: "flex", margin: " 0 auto", marginTop: "20px" });
  //appendnig question to field

  //adding yes or no control buttons
  var radioAnswerdiv = $("<div>")
    .attr({
      class: "control",
      id: "askQuestion",
    })
    .css("paddingTop", "20px");
  var yesLabel = $("<label>").attr("class", "radio");
  var inputYes = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "Yes",
    id: "yesBtn",
  });

  var noLabel = $("<label>").attr("class", "radio");
  var inputNo = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "No",
  });
  //appending to field
  $(yesLabel).text("Yes ");
  $(noLabel).text("No ");
  $(yesLabel).append(inputYes);
  $(radioAnswerdiv).append(yesLabel);
  $(noLabel).append(inputNo);
  $(radioAnswerdiv).append(noLabel);

  var returnError = $("<p>");

  $("#questionField").append(question, radioAnswerdiv, nextBtn, returnError);

  //for taking the employee temperature
  function takeTemp() {
    $("#questionField").text("");
    var header = $("<h1>")
      .text("Employee Temperature")
      .css({ paddingBottom: "20px", paddingTop: "40px", fontSize: "20px" });
    var employeeTemp = $("<input>")
      .attr({
        class: "input",
        type: "number",
        id: "employeeTemp",
        max: "105",
        min: "97",
        step: ".1",
      })
      .css({ marginBottom: "20px", fontSize: "20px" });
    var reviewBtn = $("<button>").attr({
      class: "button",
      id: "reviewBtn",
    });
    var tempError = $("<p>").attr("id", "tempError");
    $(reviewBtn).text("Review");
    $("#questionField").append(header, employeeTemp, reviewBtn, tempError);
  }

  //adding answers to session storage
  function addAnswer() {
    var lsAnswers = sessionStorage.getItem("answers");
    var lsAnswersJSON = JSON.parse(lsAnswers);
    var answer = $("#askQuestion input:checked").val();
    if ($("#askQuestion input:checked").val() === "Yes") {
      localStorage.setItem(
        "result",
        "Employee Should Return Home and Seek Advice From a Medical Professional"
      );
    }
    var varName = abbreviatedQuestion[questionNum];
    var answerToAdd = {
      [varName]: answer,
    };
    var superObject = Object.assign(lsAnswersJSON, answerToAdd);
    var STRINGlsAnswersJSON = JSON.stringify(superObject);
    sessionStorage.setItem("answers", STRINGlsAnswersJSON);
  }

  function addTemp() {
    var lsAnswers = sessionStorage.getItem("answers");
    var lsAnswersJSON = JSON.parse(lsAnswers);
    var answer = $("#employeeTemp").val();
    var varName = "Employee Temperature";
    var answerToAdd = {
      [varName]: answer,
    };

    if (parseInt(answer) >= 100) {
      localStorage.setItem(
        "result",
        "Employee Should Return Home and Seek Advice From a Medical Professional"
      );
    }
    var superObject = Object.assign(lsAnswersJSON, answerToAdd);
    var STRINGlsAnswersJSON = JSON.stringify(superObject);
    sessionStorage.setItem("answers", STRINGlsAnswersJSON);
  }

  function askSymptoms() {
    event.preventDefault();
    $("#yesBtn").one("click", function () {
      $("#nextBtn").remove();
      var testPara = $("<p>")
        .text("Please select any symptoms that apply:")
        .css("marginTop", "10px");
      //div
      var symptomsDiv = $("<div>").css({
        marginBottom: "10px",
      });
      //label
      var labelElOne = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Runny Nose")
        .css({ padding: "2px", margin: "2px" });
      var labelElTwo = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Sore Throat")
        .css({ padding: "2px", margin: "2px" });
      var labelElThree = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Cough")
        .css({ padding: "2px", margin: "2px" });
      var labelElFour = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Shortness of Breath")
        .css({ padding: "2px", margin: "2px" });
      //input
      var inputRunnyNose = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox1",
        value: "unchecked",
        title: "Runny Nose",
      });
      //input
      var inputSoreThoat = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox2",
        title: "Sore Throat",
        value: "unchecked",
      });
      //input
      var inputCough = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox3",
        title: "Cough",
        value: "unchecked",
      });
      //input
      var inputShortnessOfBreath = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox4",
        title: "Shortness of Breath",
        value: "unchecked",
      });

      $(labelElOne).append(inputRunnyNose);
      $(labelElTwo).append(inputSoreThoat);
      $(labelElThree).append(inputCough);
      $(labelElFour).append(inputShortnessOfBreath);
      $(symptomsDiv).append(labelElOne, labelElTwo, labelElThree, labelElFour);
      $("#questionField").append(testPara, symptomsDiv, nextBtn);
      $(nextBtn).click(function () {
        addSymptoms();
        addAnswer();
        askQuestion();
        questionNum++;
      });

      for (i = 0; i <= 4; i++) {
        $("#checkbox" + i).change(function () {
          if ($(this).attr("value") === "unchecked") {
            $(this).attr("value", "checked");
          } else if ($(this).attr("value") === "checked") {
            $(this).attr("value", "unchecked");
          }
        });
      }
      function addSymptoms() {
        var symptomsToAdd = [];
        for (i = 0; i <= 4; i++) {
          if ($("#checkbox" + i).attr("value") === "checked") {
            var checkedSymptoms = $("#checkbox" + i).attr("title");
            symptomsToAdd.push(checkedSymptoms);
          }
        }
        var symptomsToAddJSON = JSON.stringify(symptomsToAdd);
        sessionStorage.setItem("symptoms", symptomsToAddJSON);
      }
    });
  }

  //functionality for the next question button
  $("#nextBtn").click(function () {
    if ($("#askQuestion input:checked").val() == null) {
      event.preventDefault();
      $(returnError).text("");
      var errorMessage = $("<p>").text("Please Pick Yes or No").css({
        color: "red",
        fontSize: "20px",
        display: "flex",
        margin: " 0 auto",
      });
      setTimeout(function () {
        $(returnError).append(errorMessage);
      }, 50);
    } else {
      addAnswer();

      questionNum++;
      //the third question (index 2) has a few potential follow-up questions
      if (questionNum === 2) {
        askQuestion();
        askSymptoms();

        //otherwise, just needs to ask questions
      } else if (questionNum < surveyQuestions.length && questionNum != 2) {
        askQuestion();

        //one all questions have been asked, just needs to
      } else {
        takeTemp();
        $("#reviewBtn").click(function () {
          if ($("#employeeTemp").val() == "") {
            $("#tempError").text("");
            var errorTemp = $("<p>")
              .text("Please Enter Employee Temperature")
              .css({
                color: "red",
                fontSize: "20px",
                display: "flex",
                margin: " 0 auto",
                marginTop: "10px",
              });
            setTimeout(function () {
              $("#tempError").append(errorTemp);
            }, 50);
          } else {
            addTemp();
            $("#questionField").text("");
            var header = $("<h1>").text("Review Answers").css({
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "20px",
              fontSize: "30px",
            });
            var resultDiv = $("<div>")
              .text(localStorage.getItem("result"))
              .css({
                textAlign: "center",
                fontSize: "20px",
                color: "red",
                paddingBottom: "20px",
              });
            var answerDisplayDiv = $("<div>").css({
              textAlign: "center",
              paddingBottom: "20px",
            });
            var submitBtn = $("<button>")
              .attr({ class: "button", id: "submitBtn" })
              .text("Submit")
              .css({
                marginTop: "20px",
                display: "flex",
                margin: " 0 auto",
              });

            var answersFromSessStor = sessionStorage.getItem("answers");
            var answersFromSessStorJSON = JSON.parse(answersFromSessStor);

            var answersToLocalStorageObject = [];

            //adding answers from session storage to display on review page
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (let [key, value] of Object.entries(answersFromSessStorJSON)) {
              var answerPara = $("<p>").text(`${key}: ${value}`);
              $(answerDisplayDiv).append(answerPara);

              var answerToLSObj = `${value}`;
              answersToLocalStorageObject.push(answerToLSObj);
            }
            //getting symptoms stored in session storage
            var symptomsToDisplay = sessionStorage.getItem("symptoms");

            //if there is a value to the symptoms key in session storage
            if (symptomsToDisplay.length !== 0) {
              //parse it to an object
              var symptomsToDisplayJSON = JSON.parse(symptomsToDisplay);

              //use .join(", ") to combine into a string with a comma and a space to separate
              //https://www.geeksforgeeks.org/javascript-array-join-method/
              var symptomsString = symptomsToDisplayJSON.join(", ");
              //add a paragraph that will read Symptoms: symptom, symptom (etc.)
              var symptomsParagraph = $("<p>").text(
                "Symptoms: " + symptomsString
              );
              //append to review page results
              $(answerPara).append(symptomsParagraph);

              //if there is no value to the symptoms key
            } else {
              //symptoms string is blank (used later for local storage)
              var symptomsString = "";
              //make a paraghraph that just says "no symptoms"
              var symptomsParagraph = $("<p>").text("Symptoms: None");
              //append
              $(answerPara).append(symptomsParagraph);
            }
            //append everything to the page
            $("#questionField").append(
              header,
              resultDiv,
              answerDisplayDiv,
              submitBtn
            );

            //when submit button is clicked
            $(submitBtn).click(function () {
              //add symptoms to the answersToLocalStorageObject
              var symptomsToLS = symptomsString;
              answersToLocalStorageObject.push(symptomsToLS);

              //if there is no "answers" key in local storage
              if (localStorage.getItem("answers") === null) {
                //add answers to local storage
                answersJSON = JSON.stringify(answersToLocalStorageObject);
                localStorage.setItem("answers", answersJSON);
              } else {
                //if there is an "answers" key pull from local storage
                var answerFromLS = localStorage.getItem("answers");
                answerFromLSJSON = JSON.parse(answerFromLS);

                //loop through the answers from most recent submission
                for (i = 0; i < answersToLocalStorageObject.length; i++) {
                  //and add to the end of the object from local storage
                  answerFromLSJSON.push(answersToLocalStorageObject[i]);
                  //resubmit to local storage
                  answerJSON = JSON.stringify(answerFromLSJSON);
                  localStorage.setItem("answers", answerJSON);
                }
              }

              $("#questionField").text("");
              var finalMessage = $("<p>")
                .text("Thank You! Your Answers Have Been Submitted")
                .css({
                  fontSize: "30px",
                  display: "flex",
                  textAlign: "center",
                  marginTop: "40px",
                });
              var goToEmpData = $("<a>")
                .attr({ class: "button", href: "employeeData.html" })
                .text("Employee Data")
                .css({
                  display: "flex",
                  margin: " 0 auto",
                  width: "200px",
                  marginTop: "10px",
                });
              var newEmpSurvey = $("<button>")
                .attr("class", "button")
                .text("New Employee Survey")
                .css({
                  display: "flex",
                  margin: " 0 auto",
                  width: "200px",
                  marginBottom: "10px",
                  marginTop: "20px",
                });

              $("#questionField").append(
                finalMessage,
                newEmpSurvey,
                goToEmpData
              );

              $(newEmpSurvey).click(function () {
                location.reload();
              });
            });
          }
        });
      }
    }
  });
}
