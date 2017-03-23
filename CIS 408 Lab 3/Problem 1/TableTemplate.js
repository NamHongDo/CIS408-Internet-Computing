function TableTemplate(){
}

TableTemplate.fillIn=function(id,dictionary,columnName){
  var columnTemp = columnName;
  var noRows=document.getElementById(id).rows.length;
  var table=document.getElementById(id).rows[2].cells[0].innerHTML;
//  var row1cell=table[0].innerHTML;
  var headerRow=document.getElementById(id).rows[0].cells;
  var headerEleLength = headerRow[0].innerHTML.length; //string length of header element
  for(var i = 0; i < headerRow.length;i++){ //loop through entire header row
    var t = headerRow[i].innerHTML.substring(2,headerRow[i].innerHTML.length-2); //substring of string in header cell, exclude "{{" and "}}"
    if( t in dictionary){ //check if the header element exist in dictionary object
      headerRow[i].innerHTML=headerRow[i].innerHTML.replace(headerRow[i].innerHTML,dictionary[t]); //replace with appropriate key value, {{PartNumber}} --> Part Number
    }
    if(columnName==headerRow[i].innerHTML && t in dictionary){
      for(var g=1; g<noRows;g++){
        var temp=document.getElementById(id).rows[g].cells[i].innerHTML;
        var temp1=temp.substring(2,temp.length-2);
        document.getElementById(id).rows[g].cells[i].innerHTML=document.getElementById(id).rows[g].cells[i].innerHTML.replace(document.getElementById(id).rows[g].cells[i].innerHTML,dictionary[temp1]);
      }
    }else if(columnName==undefined){
      for(var g=1; g<noRows;g++){
        var temp=document.getElementById(id).rows[g].cells[i].innerHTML;
        var temp1=temp.substring(2,temp.length-2);
        document.getElementById(id).rows[g].cells[i].innerHTML=document.getElementById(id).rows[g].cells[i].innerHTML.replace(document.getElementById(id).rows[g].cells[i].innerHTML,dictionary[temp1]);
      }
    }else if(!columnName in dictionary){ //case when columnName is not a property defined in dictionary, do nothing to column rows
        continue;
    }else{
      continue;
    }
  }
}
