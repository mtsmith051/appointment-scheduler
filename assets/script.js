// Makes the save button operable
$(document).ready(function () {
  var saveButton = $(".saveBtn")
  var inputArr = JSON.parse(localStorage.getItem('savedText')) || []
  

  saveButton.on("click", saveEvent) 

  function saveEvent(event) {
    var inputBtn = event.target
    
    var saveHour = $(inputBtn).parent().prop('id').split("-")[1];
    
    var textInput = $(inputBtn).siblings('.description').val();
    
    var textObject = {
      hour: saveHour, 
      text: textInput
    };
    
    inputArr = inputArr.filter(({ hour }) => hour !== saveHour )
    inputArr.push(textObject);
    localStorage.setItem('savedText', JSON.stringify(inputArr));
    
  };

  //Assigns different color to identify past present and future time slots.
  function blockColor(){
    let currentTime = dayjs().format('HH');
    $(".time-block").each(function(index) {
      if (index > (currentTime - 9))
        $(this).attr("class", "row time-block future");
      if (index < (currentTime - 9))
        $(this).attr("class", "row time-block past");
      if (index == (currentTime - 9))
        $(this).attr("class", "row time-block present");
    });
  }; 
  blockColor();

//Saves text input to local storage
  function userInput() {
    inputArr.forEach(function(key){
      $(".time-block").get(key.hour - 9).children[1].textContent = key.text;
    });
  };
  userInput();

// Adds a functioning date and time to header to identify correct date/time 
function setTimeHeader() {
  var currentDate = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
  $('#currentDay').text(currentDate);

  function updateTime(){
    currentDate = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
    $('#currentDay').text(currentDate);
  };
  
  setInterval(updateTime, 1000);
};
setTimeHeader();

});
