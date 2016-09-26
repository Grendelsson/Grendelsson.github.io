function welcomeNote(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      document.getElementById("welcomeNote").innerHTML = this.responseText;
      }
     };
     xhttp.open("POST", "welcome.txt", true);
     xhttp.setRequestHeader("Content-type", "text");
     xhttp.send(document.getElementById("nameinput").value);
   }
