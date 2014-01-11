javascript:(function(){
    var timeout;
    var srch = document.getElementById("nav-search-input");
    var popres = document.getElementById("popres");
    if(!(popres && popres.id=="popres")) {
  
    popres = document.createElement("div");
    popres.id="popres";
    document.body.appendChild(popres);
    }
    popres.style.position = "fixed";
    popres.style.left = "50%";
    popres.style.marginLeft = "0px";
    popres.style.zIndex = "999999";
    popres.style.top = "38px";
    popres.innerHTML = "";
    
    srch.oninput = 
        function() { 
            clearTimeout(timeout);
            timeout = setTimeout(
                    function (){
                        console.log("Search now! query: "+srch.value);
                        if(srch.value.trim().length==0) {
                            console.log("Except don't because spaces");
                            return;
                        }
                        
                       
                  var xhr = new XMLHttpRequest();
                  xhr.open("GET", "http://www.engadget.com/search/?q="+encodeURIComponent(srch.value)+"&rail=rail", false);  
                  xhr.send(null);
                  var mys=xhr.responseText;
                  var parser=new DOMParser();
                  var xmlDoc=parser.parseFromString(mys,"text/html");
                  popres.innerHTML = "<div class=\"categories-modal-left hover-white\" style=\"overflow: overlay; width: 420px\">"+xmlDoc.getElementById("gdgt-result").innerHTML.replace("<ul>","<ul style=\"padding: 0\">").replace(/<img/g, "<img style=\"vertical-align: middle; height: 32px; width: 32px\" ").replace(/<a/g, "<a style=\"height: 40px; \" ") + "</div>";
            },250);
        };
}());
