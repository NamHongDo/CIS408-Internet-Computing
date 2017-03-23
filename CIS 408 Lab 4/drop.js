/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function drop() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function drop1(){
    document.getElementById("menu1").classList.toggle("show1");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches(".dropmenu")) {
    var dropdowns = document.getElementsByClassName("menu-drop");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*class getData with get.Data.JSON and getData.XML functions */
function getData(){
}
/* for name, business, service, address buttons, data is extracted from .json fle, hence separate function to access json*/
getData.JSON=function(select){ /* depend on which button is click, the button id is passed to this function*/
  var lol;
  var x=1;
  var final=select+1;
  var display = document.getElementById(final);
  var ajaxhttp = new XMLHttpRequest();
  var url="YelpOneBusinessJasonData.json";
  ajaxhttp.open("GET",url,true);
  ajaxhttp.setRequestHeader("CONTENT-type","application/json");
  ajaxhttp.onreadystatechange=function(){
    if(ajaxhttp.readyState == 4 && ajaxhttp.status ==200){
      var jcontent = JSON.parse(ajaxhttp.responseText);
      console.log(jcontent);
      console.log("lol is "+jcontent.name);
      console.log( "display" +display);
      if(select=="name"){	/* if name is clicked */
        display.innerHTML=jcontent.name;
      }else if(select=="address"){
        display.innerHTML=jcontent.full_address;
      }else if(select=="business"){	/* if business is clicked*/
        display.innerHTML="<b>HOURS</b>";
        display.innerHTML+="<br>";
        display.innerHTML+="Monday &emsp; &emsp; &emsp;" + jcontent.hours.Monday.open +"&ensp; am &emsp; - &emsp;" + jcontent.hours.Monday.close+"&ensp; pm";
        display.innerHTML+="<br>";
        display.innerHTML+="Tuesday &emsp; &emsp; &emsp;" + jcontent.hours.Tuesday.open +"&ensp; am &emsp; - &emsp;" + jcontent.hours.Tuesday.close+"&ensp; pm";
        display.innerHTML+="<br>";
        display.innerHTML+="Wednesday  &emsp; &emsp;" + jcontent.hours.Wednesday.open +"&ensp; am &emsp; - &emsp;" + jcontent.hours.Wednesday.close+"&ensp; pm";
        display.innerHTML+="<br>";
        display.innerHTML+="Thursday &ensp; &emsp; &emsp;" + jcontent.hours.Thursday.open +"&ensp; am &emsp; - &emsp;" + jcontent.hours.Thursday.close+"&ensp; pm";
        display.innerHTML+="<br>";
        display.innerHTML+="Friday &ensp; &emsp; &emsp; &emsp;" + jcontent.hours.Friday.open +"&ensp; am &emsp; - &emsp;" + jcontent.hours.Friday.close+"&ensp; pm";
        display.innerHTML+="<br>";
      }else if(select=="service"){	/* if service is clicked*/
        display.innerHTML= " ";
        for(var objKey in jcontent.attributes){
          if(jcontent.attributes[objKey] ===true){
              display.innerHTML+=objKey;
              display.innerHTML+="<br>";
          }
        }
      }
    }
  }
  ajaxhttp.send(null);
  console.log("lol is"+lol);
}
/* function to extract data from XML file */
/* select hold the reference value to which button of menu is clicked – breakfast, brunch, lunch, dinner or drinks */
getData.XML=function(select){
 var xhttp = new XMLHttpRequest();
  var url="restaurant_menu.xml";
  xhttp.open("GET", url, true); /* open xml file */
  xhttp.send();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          showResult(xhttp.responseXML); /* extract and show appropriate data */
      }
  };

  function showResult(xml) {
      var itemName = " ";
      var itemPrice=" ";
      var listName=" ";
/* constructing appropriate XPATH to extract wanted nodes, in this case any node under childNode of MENU’s child nodes */
        var path="MENU/";
        path=path+select;
        path=path+"//*";
/* path structure example: ”MENU/BREAKFAST//*” */
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        var count=0;
        while (result) {	 /*loop through entire document*/
          if(result.childNodes[0].nodeValue==null | result.tagName=="FROM" )	/* skip any null value or <FROM>*/
            result = nodes.iterateNext(); 	/* proceeding to next node */
          if(count==0){
            listName+=result.parentNode.tagName +": <br> <br> <br>";	/* extract section that food items belong to */
            itemName += result.childNodes[0].nodeValue+" <br> <br> <br>";		/* extract <NAME> */
            count++;
          }else{
            itemPrice += result.childNodes[0].nodeValue+" <br> <br> <br>";		/* extract <PRICE> */
          count--;
          }
        result = nodes.iterateNext();	/* proceeding to next node */
        }
      document.getElementById("menu4").innerHTML = listName;		/* display to web page */
      document.getElementById("menu2").innerHTML = itemName;
      document.getElementById("menu3").innerHTML = itemPrice;
  }
}
