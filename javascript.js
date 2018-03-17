// Initialize Firebase
console.log("linking...");
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDx5pZsnBlkNEeQuM-CVbS9nn1Pgp_IrYw",
  authDomain: "train-schedule-69eb4.firebaseapp.com",
  databaseURL: "https://train-schedule-69eb4.firebaseio.com",
  projectId: "train-schedule-69eb4",
  storageBucket: "",
  messagingSenderId: "503604208795"
};
firebase.initializeApp(config);
var Truth = true;
var startTime;
  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var name = "";
  var Destination = "";
  var firstTrain ;
  var Frequency ;
  var now;
  var sv;
  var minutesAway;
  var increment;
  var count = 0;
    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

    // Grabbed values from text boxes
    // Grabbed values from text boxes
    name = $("#Train-name").val().trim();
    Destination = $("#Destination").val().trim();
    firstTrain = $("#First-Train").val();   
    Frequency = $("#Frequency").val();
    console.log(firstTrain);
    
    // Code for handling the push
    lastPushed = database.ref().push({
      name: name,
      Destination: Destination,
      firstTrain: firstTrain,
      Frequency: Frequency,
    });
  });

  
  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
    // storing the snapshot.val() in a variable for convenience

    now = moment().format("HH:mm");
    sv = snapshot.val();
    
    firstTrain = moment(sv.firstTrain, "HH:mm");
    Frequency = moment(sv.Frequency, "m");

    minutesAway = moment(firstTrain).diff(moment(), "minutes");
    increment = moment(firstTrain).add(sv.Frequency, "minutes").format("HH:mm");

    console.log("now: " + now);
    console.log("firstTrain: " + sv.firstTrain);
    console.log("Freq: " + sv.Frequency);
    console.log("minutesAway: " + minutesAway);
    console.log("Increment: " + increment);
    
    
    count +=1;
    
    console.log("name: "+ sv.name);
    console.log(sv.Destination);
    $('tbody').append(`<tr id="row${count}"><td>${sv.name}</td><td>${sv.Destination}</td>
    <td>${sv.Frequency}</td><td>${sv.firstTrain}</td><td>${minutesAway}</td></tr>`);
    
    
     if (minutesAway<=0){
      Tens = Math.floor((minutesAway*-1)/parseInt(sv.Frequency));
      Tens = Tens * parseInt(sv.Frequency);
      minutesAwayPos = Tens + parseInt(sv.Frequency);
      console.log("positive: " + minutesAwayPos+" "+ typeof(minutesAwayPos));
      firstTrain = moment(firstTrain).add(minutesAwayPos, "minutes").format("HH:mm");
      console.log("while: " + firstTrain);
      firstTrain = moment(firstTrain, "HH:mm");
      minutesAway01 = moment(firstTrain).diff(moment(), "minutes");
      firstTrain = firstTrain.format("HH:mm");
      $('#row'+ count).html("");
      $('#row'+ count).append(`<td>${sv.name}</td><td>${sv.Destination}</td>
      <td>${sv.Frequency}</td><td>${firstTrain}</td><td>${minutesAway01}</td>`)
     }else{
      Truth = false;
      console.log("else: " + firstTrain);
     }
    
    
    

    
    

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    
  });
  setInterval('window.location.reload()', 60000);

