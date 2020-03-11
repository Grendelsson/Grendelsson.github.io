function welcomeNote(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var cid = "";
      for(var i of dataLayer){
        if (i.exp_cid != null){
          cid = i.exp_cid;
          //console.log(cid);
        }
      }
      document.getElementById("inputTooltip").innerHTML = "CID: " + cid;//getElementById("nameinput").value;
      }
     };
     xhttp.open("GET", "", true);
     xhttp.send();
   }
