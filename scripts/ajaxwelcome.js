function welcomeNote(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var cid = "";
      for(var i of dataLayer){
        if (i.exp_cid){
          cid = i.exp_cid);
        }
      }
      document.getElementById("inputTooltip").innerHTML = "Hi there " + cid//getElementById("nameinput").value;
      }
     };
     xhttp.open("GET", "", true);
     xhttp.send();
   }
