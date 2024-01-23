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

input=document.getElementById("msg")
room_name=localStorage.getItem("Room Name")
user_name=localStorage.getItem("User Name")

function getUserName() {
  user_id = localStorage.getItem("user_db")
  var user_ref = database.ref('/' + user_id)
  user_ref.on('value', function (snapshot) {
    var data = snapshot.val()
    username = data.user_name
    localStorage.setItem("User Name", username)
    username_ls = localStorage.getItem("User Name")  
    document.getElementById("add-text-un").innerHTML = "Welcome to Chat Vista " + username_ls
    document.getElementById("name").innerHTML = username_ls
  })

  if(localStorage.getItem("Room Name")!=null){
    document.getElementById("hide-later").classList.add("hidden")
    document.getElementById("chat-main").classList.remove("hidden")
    document.getElementById("display_rn").innerHTML="Room Number: "+localStorage.getItem("Room Name")
}
else{
  document.getElementById("chat-main").classList.add("hidden")

}
  getRoomData()

}

function newChat() {
  new_room = document.getElementById("new_input_chat").value
  if (validate_room(new_room) == true) {
    user_db=localStorage.getItem("user_db")
    firebase.database().ref('/' + user_db + "/Room_Numbers").on('value', function (snapshot) {
      document.getElementById("add_room_fromdb").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childSnapshot.val();
        //Start code
        //End code
      });
    });

    
    if (new_room==Room_names){
      alert("Room already exists")
    }
    else{
      const auth = firebase.auth()
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Push to Firebase Database
      firebase.database().ref("/").child(new_room).update({
        Purpose: "Add Room"
      });
      database_ref.child('/' + user.uid + "/Room_Numbers").push(new_room)
      document.getElementById("new_input_chat").value = null
  
    }

  

  } else {
    alert("Enter 6 Digit Room Number")
    document.getElementById("new_input_chat").value = null
  }
  getRoomData()
}

function validate_room(field) {
  if (field == null) {
    return false
  }

  if (field.length != 6) {
    return false
  } else {
    return true
  }
}

function getRoomData() {
  user_db = localStorage.getItem("user_db")
  firebase.database().ref('/' + user_db + "/Room_Numbers").on('value', function (snapshot) {
    document.getElementById("add_room_fromdb").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childSnapshot.val();
      //Start code
      row = "<li class='room_name text-white text-sm mt-5 cursor-pointer' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + Room_names + "</li>"
      document.getElementById("add_room_fromdb").innerHTML += row;
      //End code
    });
  });
}

function redirectToRoomName(roomName) {
  document.getElementById("display_rn").innerHTML="Room Number: "+roomName
  localStorage.setItem("Room Name", roomName)
  if(localStorage.getItem("Room Name")!=null){
    document.getElementById("hide-later").classList.add("hidden")
    document.getElementById("chat-main").classList.remove("hidden")


}
else{
  document.getElementById("chat-main").classList.add("hidden")

}
getData()
}

function getData() {
  room_name=localStorage.getItem("Room Name")
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              childData = childSnapshot.val();
              if (childKey != "Purpose") {
                    firebase_message_id = childKey;
                    message_data = childData;

                    //Start code
                    named = message_data["name"];
                    message = message_data["message"];
                    like = message_data["like"];
                    timed = message_data['time']


                    row = "<div><h4 class='name_msg text-white text-xl font-extrabold font-sohne justify-between flex px-5 pb-2'> " + named + "<b class='time text-sm'> " + timed + "</b>" + "</h4><h4 class='message_h4 text-white text-left font-sohne px-5 text-lg'>" + message + "</h4></div>";
                    document.getElementById("output").innerHTML += row;


                    //End code    
                    var objDiv = document.getElementById("output");
                    objDiv.scrollTop = objDiv.scrollHeight;

              }
        });
  });
}
getData()


function delete_roomdata() {
  input=document.getElementById("msg")
room_name=localStorage.getItem("Room Name")
user_name=localStorage.getItem("User Name")
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              childData = childSnapshot.val();
              if (childKey != "Purpose") {
                    firebase_message_id = childKey;
                    message_data = childData;

              firebase.database().ref("/"+room_name).remove()
              window.location = window.location.href
              firebase.database().ref("/").child(room_name).update({
                    Purpose: "Add Room"
              });
              
              
              }
        });
  });

        ;
    
}


function send() {
  input=document.getElementById("msg")
room_name=localStorage.getItem("Room Name")
user_name=localStorage.getItem("User Name")
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          time: time
    })
    document.getElementById("msg").value = ""
}

function send_image() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    image_url = document.getElementById("url").value;

    firebase.database().ref(room_name).push({
          name: user_name,
          message: '<img src=' + image_url + '>',
          time: time
    })
    document.getElementById("url").value = ""
}
//like_click = 0


input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    send()
  }
})

function vc(){
  input=document.getElementById("msg")
room_name=localStorage.getItem("Room Name")
user_name=localStorage.getItem("User Name")
  window.open("https://talky.io/NirChat_"+room_name, "_blank")
}

function isImage() {
  input=document.getElementById("msg")
room_name=localStorage.getItem("Room Name")
user_name=localStorage.getItem("User Name")
  var image = new Image();
  image_url=document.getElementById("url").value;
  image.onload = function() {
    if (this.width > 0) {
      console.log("image exists");
      send_image(image_url)
    }
  }
  image.onerror = function() {
    console.log("image doesn't exist");
    alert("Enter a valid URL")
  }
  image.src =  document.getElementById("url").value;}

function send_image(url) {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  firebase.database().ref(room_name).push({
    name: user_name,
    message: '<img src=' + url + '>',
    like: 0,
    time: time
})
document.getElementById("url").value = ""

}

