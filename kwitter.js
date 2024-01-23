function addUser() {
    user_name = document.getElementById("user_name").value;
    if (user_name == "") {
        window.alert("Enter User Name")
    }else{
    console.log(user_name)
    localStorage.setItem("User Name", user_name)
    window.location = "kwitter_room.html"}
}