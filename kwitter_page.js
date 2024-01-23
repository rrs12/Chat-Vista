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
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("User Name");
  room_name = localStorage.getItem("Room Name");


  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;

  input=document.getElementById("msg")

  
  function getData() {
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


                          row = "<h4 class='name_msg'> " + named + "<b class='time'> " + timed + "</b>" + "</h4><h4 class='message_h4'>" + message + "</h4><button class='btn' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>  Like: " + like + "</span></button><hr>";
                          document.getElementById("output").innerHTML += row;


                          //End code    
                          var objDiv = document.getElementById("output");
                          objDiv.scrollTop = objDiv.scrollHeight;

                    }
              });
        });
  }
  getData();

  function room_no(){
      document.getElementById("room_no").innerHTML+= room_name
  }
room_no();

  function delete_roomdata() {
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
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        msg = document.getElementById("msg").value;

        firebase.database().ref(room_name).push({
              name: user_name,
              message: msg,
              like: 0,
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
              like: 0,
              time: time
        })
        document.getElementById("url").value = ""
  }
  //like_click = 0

  function updateLike(message_id) {
        button_id = message_id
        likes = document.getElementById(button_id).value
        likes++
        firebase.database().ref(room_name).child(message_id).update({
              like: likes
        })

  }

  function logOut() {
        localStorage.removeItem("User Name");
        localStorage.removeItem("Room Name");
        window.location.replace("index.html")
  }

  input.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        send()
      }
    })

function vc(){
      window.open("https://talky.io/NirChat_"+room_name, "_blank")
}