// signUp selecttors 
var signUpUserName = document.getElementById("sign-up-username")
var signUpEmail = document.getElementById("sign-up-email")
var signUpPassword = document.getElementById("sign-up-password")
// login selectors 
var loginEmail = document.getElementById("login-email")
var loginPassword = document.getElementById("login-password")


// var firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };

const firebaseConfig = {
  apiKey: "AIzaSyC7ku8T7utFnwLHGkdpCicVEmyl7V6qeqQ",
  authDomain: "quiz-app-005.firebaseapp.com",
  databaseURL: "https://quiz-app-005-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-app-005",
  storageBucket: "quiz-app-005.firebasestorage.app",
  messagingSenderId: "635671281783",
  appId: "1:635671281783:web:0d8a033aac2aabfb270672"
};

var app = firebase.initializeApp(firebaseConfig);



function signUp() {

    
  try {

      firebase.auth().createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
          .then((userCredential) => {
              // Sign up 
              var user = userCredential.user;
              localStorage.setItem(signUpEmail.value,`users-${signUpUserName.value}-quiz`)
              window.location.href = "./signin.html"
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              
              console.log(errorMessage);

              
          });

  } catch (error) {
      console.log(error);


  }
}



function login(){

  try {
      
      firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
.then((userCredential) => {
  // Signed in
  var user = userCredential.user;

  
  document.cookie = "email="+ user.email + "; path=/; max-age="+(60*60*24)  
      window.location.href = "./quiz.html"
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;

  Swal.fire({
      icon: "error",
      title: "Oops! &#128556;",
      text: "username or password is wrong!",
    });    
});


  } catch (error) {
      console.log(error);
      
      
  }
}




function getCookie(naam){
  var cookieValue = `; ${document.cookie}`
  var parts = cookieValue.split(`; ${naam}=`)
  if(parts.length === 2) {
      return parts.pop().split(";").shift()
  }
  
}

var userCookie = getCookie("email")

var userid = localStorage.getItem(userCookie)



// -------------- quiz app work start ------------------
var questions = [
    {
      question: "Q1: HTML Stands for ?",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "Q2: CSS Stands for ?",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Q3: Which tag is used for most large heading ?",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Q4: Which tag is used to make element unique ?",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Q5: Any element assigned with id, can be get in css ?",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "Q6: CSS can be used with ______ methods ?",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "Q7: In JS variable types are ____________ ?",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "Q8: In array we can use key name and value ?",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "Q9: toFixed() is used to define length of decimal ?",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "Q10: push() method is used to add element in the start of array ?",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];





var question = document.getElementById("question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");

var selectOps = document.getElementsByClassName("selectOps")

var timerElement = document.getElementById("timer")

var btn = document.getElementById("btn-next");

var index = 0;
var score = 0;

var min = 1;
var sec = 59;

function timer(){
  timerElement.innerText = `${min}:${sec}`
  sec--

  if(sec < 0){
    min--;
    sec = 59
    if(min < 0){
      min = 1
      nextQuestion()
    }
  }
}

var startTime = new Date()


function nextQuestion(){

var clearAll = setInterval(timer,1000)
 
  
  // clearInterval(clear)
  for(var i = 0; i < selectOps.length; i++){

    if(selectOps[i].checked){
      
      clearInterval(clearAll)
      min = 2;
      sec = "00";
      parseInt(sec)
      
      var selectOptionValue = selectOps[i].value
      var getOptions = questions[index -1][`option${selectOptionValue}`]
      var corrAnswer = questions[index -1]["corrAnswer"]

      if(getOptions === corrAnswer){
        score++

      
      }
      
      
    }
    selectOps[i].checked = false
    selectOps[i].nextElementSibling.classList.remove("bg-green-400")
  }

  btn.disabled = true

    if(index > questions.length -1){

  

      if(((score/questions.length)*100).toFixed(2) < 40.00){

        Swal.fire({
          title: "Fail",
          text: `Your Score is: ${((score/questions.length)*100).toFixed(2)}`,
          icon: "error"
        }).then(function(result){
          if(result.isConfirmed){
            
          var endTime = new Date()
          var timeTaken = endTime - startTime
          var minutesTaken = Math.floor(timeTaken/(1000 * 60))
          var secondsTaken = Math.floor(timeTaken/(1000))
          var userObj = {
            message: `Your Score: ${((score/questions.length)*100).toFixed(2)}%`,
            timeStampsMinutes : minutesTaken,
            timeStampsSeconds: secondsTaken
    
          }
          firebase.database().ref(userid).push(userObj)

          // firebase.database().ref(userid).on("child_added", function(quiz){

          //   var showQuiz = document.getElementById("socreData")

          //   var pTag = document.createElement("h1")
          //   var pTagText = document.createTextNode(`${quiz.val().message} and complete time to ${quiz.val().timeStampsMinutes} mintues : ${quiz.val().timeStampsSeconds} seconds`)

          //   pTag.appendChild(pTagText)
          //   showQuiz.appendChild(pTag)
          //   console.log(quiz.val());
            
          // })


          }
        })
        
      }else{


    
      var a = Swal.fire({
        title: "Passed.",
        text: `Your Score is: ${((score/questions.length)*100).toFixed(2)}`,
        icon: "success"
      }).then(function(result){
        if(result.isConfirmed){

          var endTime = new Date()
            var timeTaken = endTime - startTime
            var minutesTaken = Math.floor(timeTaken/(1000 * 60))
            var secondsTaken = Math.floor(timeTaken/(1000))
            var userObj = {
              message: `Your Score: ${((score/questions.length)*100).toFixed(2)}%`,
              timeStampsMinutes : minutesTaken,
              timeStampsSeconds: secondsTaken
      
            }
            firebase.database().ref(userid).push(userObj)

            // firebase.database().ref(userid).on("child_added", function(quiz){

            //   var showQuiz = document.getElementById("socreData")

            //   var pTag = document.createElement("h1")
            //   var pTagText = document.createTextNode(`${quiz.val().message} and complete time to ${quiz.val().timeStampsMinutes} mintues : ${quiz.val().timeStampsSeconds} seconds`)

            //   pTag.appendChild(pTagText)
            //   showQuiz.appendChild(pTag)
            //   console.log(quiz.val());
              
            // })
        
        }
      })
    }
      
    }else{

        
        question.innerText = questions[index].question
        option1.innerText = questions[index].option1
        option2.innerText = questions[index].option2
        option3.innerText = questions[index].option3
        
    }
    
    index++
}

function selectRadio(){

  for(var i = 0; i < selectOps.length; i++){

    if (selectOps[i].checked) {
      
      selectOps[i].nextElementSibling.classList.add("bg-green-400")
    }else{
      selectOps[i].nextElementSibling.classList.remove("bg-green-400")
    }
  }
   btn.disabled = false
    
}

firebase.database().ref(userid).on("child_added", function(quiz){

  var showQuiz = document.getElementById("socreData")

  var pTag = document.createElement("h1")
  var pTagText = document.createTextNode(`${quiz.val().message} and complete time to ${quiz.val().timeStampsMinutes} mintues : ${quiz.val().timeStampsSeconds} seconds`)

  pTag.appendChild(pTagText)
  showQuiz.appendChild(pTag)
  console.log(quiz.val());
  
})