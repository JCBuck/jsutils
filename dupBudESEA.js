if((bl=document.querySelector("#getBuddies a"))!=null) bl.onclick();

function getBLArr() { 
  var bl = document.querySelectorAll("table#buddyList tbody tr a.buddy-link"); 
  for(var i =0, buds = []; i < bl.length; i++) 
    buds.push(bl[i].text); 
    return buds;
  };
  
setTimeout(
      function(){
        buds = getBLArr();
        document.querySelector("#getBuddied a").onclick();
        setTimeout(function(){budd = getBLArr()},250);
        console.log(buds.filter(function(b,i){return budd.indexOf(b)==-1;}));
      },250);
