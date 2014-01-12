javascript:(function(){var popfn=function(){
    var timeout;
    var srch = document.getElementById("nav-search-input");
    
    var loadlink = function(targetlink,nohistory) {
                  var newpg = new XMLHttpRequest();
                  newpg.onreadystatechange=function()  {
                  if (newpg.readyState==4 && newpg.status==200)
                    {
                     
                        var injpg=newpg.responseText.replace("<body","<body onload=\"popfn()\"").replace("</head>","<"+"script>var popfn=" + popfn.toString() +"<"+"/script></head>");
                        if(!nohistory)window.history.pushState({},"",targetlink);
                        document.open();document.write(injpg);document.close();
                    }

                  };
                  
                    newpg.open("GET",targetlink, true);
                    newpg.send(null);
    };
    window.onpopstate = function(event) {
  loadlink(document.location, true);
};
    window.onsubmit = function(e) {
        if(e.target.method=="get") {
            if(e.target.elements.length>0){
                if(e.target.elements[0].name=="q"){
                    var ifrm = document.createElement("iframe");
                    ifrm.width = "1000px";
                    ifrm.src = "http://www.engadget.com/search/?q="+encodeURI(e.target.elements[0].value);
                    document.body.appendChild(ifrm);
                    ifrm.onload = function () {
                    
                    var newpg = ifrm.contentDocument.getElementsByTagName("html")[0].outerHTML;
                        
                    var injpg=newpg.replace("<body","<body onload=\"popfn()\"").replace("</head>","<"+"script>var popfn=" + popfn.toString() +"<"+"/script></head>");
                    
                    
                    window.history.pushState({},"",ifrm.src);
                    document.open();document.write(injpg);document.close();
                    
                    };
                    
                    return false;
                }
            }
        }
    };
    window.onclick = function(e) {
        
        if(e.target.localName=="a" && e.target.id!="toggle-scores" || 
            (e.target.localName=="abbr" && e.target.parentNode.localName=="a") || 
            (e.target.localName=="img" && e.target.parentNode.localName=="a")){
            var ahreforg = ((e.target.localName=="abbr"||e.target.localName=="img" )&& e.target.parentNode.localName=="a")? e.target.parentNode.href:e.target.href;
            var ahref=ahreforg;
            var curloc = window.location.href;
            if(ahref.search("#")!=-1)
                ahref = ahref.substr(0,ahref.search("#"));
            if(curloc.search("#")!=-1)
                curloc = curloc.substr(0,curloc.search("#"));
                
            
            if(ahref!=curloc || (ahref==curloc &&  ahreforg.search("#")==-1 && window.location.href.search("#")==-1)) {
                if(ahref.search("www.engadget.com")==-1)
                    return true;
                console.log(e.target+" curhref:" + window.location.href + " href:" + ahreforg);
                
                console.log("modified curhref: + " + curloc + " href:" + ahref);
                
                loadlink(ahref,false);
                
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
    popres.onmouseleave = function () { closetimer = setTimeout(function(){popres.innerHTML = "";},200);};
    
    srch.oninput = 
        function() { 
            clearTimeout(timeout);
            timeout = setTimeout(
                    function (){
                        console.log("Search now! query: "+srch.value);
                        if(srch.value.trim().length<2) {
                            console.log("Except don't because spaces or not long enough");
                            popres.innerHTML = "";
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
                  
                  
                 
            },200);
        };
}; popfn();}())
