function Cis408TemplateProcessor(template){
  if(typeof template!='string'){
    throw new Error('String expected');
  }
  this.template=template;
}
Cis408TemplateProcessor.prototype.fillIn=function(dictionary){
  var dictLength=Object.keys(dictionary).length;
  for( var x=0; x<3; x++){
    var str1="{{";
    var target=str1.concat(Object.keys(dictionary)[x],"}}");
    template = template.replace(target,dictionary[Object.keys(dictionary)[x]]);
  }
  return template;
}
