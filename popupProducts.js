javascript:(function(){
    var timeout;
    var srch = document.getElementById("nav-search-input");
    srch.style.backgroundColor = "#DFD";
    var popres = document.getElementById("popres");
    if(!(popres && popres.id=="popres")) {
  
    popres = document.createElement("div");
    popres.id="popres";
    document.body.appendChild(popres);
    }
    popres.style.position = "fixed";
    popres.style.left = "50%";
    popres.style.marginLeft = "0px";
    popres.style.zIndex = "999999999";
    popres.style.top = "38px";
    popres.innerHTML = "";
    
    srch.oninput = 
        function() { 
            clearTimeout(timeout);
            timeout = setTimeout(
                    function (){
                        console.log("Search now! query: "+srch.value);
                        if(srch.value.trim().length<2) {
                            console.log("Except don't because spaces or not long enough");
                            return;
                        }
                        
                       
                  var xhr = new XMLHttpRequest();
                  xhr.onreadystatechange=function()  {
                  if (xhr.readyState==4 && xhr.status==200)
                    {
                     var mys=xhr.responseText;
                  var parser=new DOMParser();
                  var xmlDoc=parser.parseFromString(mys,"text/html");
                 var gdgtresult = xmlDoc.getElementById("gdgt-result").innerHTML;
                  if(gdgtresult.trim().length == 0) {
                    
                    srch.style.backgroundColor = "#FDD";
                    popres.innerHTML = "";
                  } else{
                      srch.style.backgroundColor = "#DFD";
                  
                  popres.innerHTML = "<div class=\"categories-modal-left hover-white\" style=\"overflow: overlay; width: 420px\">"+gdgtresult.replace("<ul>","<ul style=\"padding: 0\">").replace(/<img/g, "<img style=\"vertical-align: middle; height: 32px; width: 32px\" ").replace(/<a/g, "<a style=\"height: 40px; width:400px \" ").replace(/<span data/g, "<span style=\"position:absolute; left:2px\" data") + "</div>";
                  }
                    }
                  };
                  xhr.open("GET", "http://www.engadget.com/search/?q="+encodeURIComponent(srch.value)+"&rail=rail", true);  
                  xhr.send(null);
                  
                  
                 
            },250);
        };
}());
