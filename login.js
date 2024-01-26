// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBB805nW41aCopPfz9E0e1f6p1zHyZOB28",
  authDomain: "chat-web-1.firebaseapp.com",
  databaseURL: "https://chat-web-1-default-rtdb.firebaseio.com",
  projectId: "chat-web-1",
  storageBucket: "chat-web-1.appspot.com",
  messagingSenderId: "677534835645",
  appId: "1:677534835645:web:ec1a5c461665c544e668d4"
  };

  // Initialize Firebase
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
function reset(){
  email = document.getElementById('email').value

  auth.sendPasswordResetEmail(email)
  .then(() =>{
    console.log("password done")
  })
  .catch(error=>{
    alert(error.message)
  })
}

  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value  
    user_name=document.getElementById('name').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect!')
      return
      // Don't continue running the code
    }

    if (validate_field(user_name) == false){
      alert('Enter username!')
      return
    }
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        password : password,
        user_name: user_name,
      }
  
      // Push to Firebase Database
      database_ref.child('/' + user.uid).set(user_data)
  
      // DOne
      sendVerificationEmail()
        })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  


  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now(),
      }
  
      // Push to Firebase Database
      database_ref.child('/' + user.uid).update(user_data)
  
      // DOne
      localStorage.setItem("user_db", user.uid)
      alert('User Logged In!!')
      window.location="chat.html"
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
const sendVerificationEmail=()=>{
  auth.currentUser.sendEmailVerification()
  .then(()=>{
    alert("User Created!")
    window.location="index.html"
  } )
  .catch(error=>{
    alert(error.message)
  })
}
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
}