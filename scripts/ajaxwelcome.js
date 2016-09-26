function welcomeNote(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      document.getElementById("inputTooltip").innerHTML = document.getElementById("nameinput").value;
      }
     };
     xhttp.open("POST", "welcome.txt", true);
     xhttp.send();
   }
