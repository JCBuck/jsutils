javascript:(function(){var popfn=function(){
    var timeout;
    var srch = document.getElementById("nav-search-input");
    var loadlink = function(targetlink) {
        var newpg = new XMLHttpRequest();
        newpg.open("GET", targetlink, false);
        newpg.send(null);
        document.getElementsByTagName("HTML")[0].outerHTML=newpg.responseText;
        popfn();
    
    };
    window.onclick = function(e) {
        if(e.target.localname=="a")
            var ahref = e.target.href;
            var curloc = window.location.href;
            if(ahref.search("#")!=-1)
                ahref = ahref.substr(0,ahref.search("#"))
            if(curloc.search("#")!=-1)
                curloc = curloc.substr(0,curloc.search("#"))
            if(ahref!=curloc) {
                loadlink(ahref);
                console.log(e.target+" localname:" + e.target.localName + " href:" + e.target.href);
                return false;
            }
        }
        };
    var closetimer;
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
    popres.onmouseenter = function () { if(closetimer!=null) clearTimeout(closetimer); };
    srch.onmouseenter = popres.onmouseenter;
    popres.onmouseleave = function () { closetimer = setTimeout(function(){popres.innerHTML = "";},125);};
    
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
                  
                  
                 
            },125);
        };
}; popfn();}())
