javascript:(function(){var popfnloaded = false; var popfn=function(){
    if(popfnloaded)
        return true;
    popfnloaded = true;
      
    var timeout;
    var srch = document.getElementById("nav-search-input");
    document.styleSheets[0].insertRule("a.popresitem:focus {background: #39c!important;color: #fff!important;}",1);
    var loadlink = function(targetlink,nohistory) {
                  var newpg = new XMLHttpRequest();
                  newpg.onreadystatechange=function()  {
                  if (newpg.readyState==4 && newpg.status==200)
                    {
                     
                        var injpg=newpg.responseText.replace("<body","<body onload=\"popfn()\"").replace("</head>","<"+"script>var popfnloaded=false;var popfn=" + popfn.toString() +"\nwindow.addEventListener(\"DOMContentLoaded\", popfn);<"+"/script></head>");
                        if(!nohistory)window.history.pushState({},"",targetlink);
                        
                        document.open();document.write(injpg);document.close();
                    }

                  };
                  
                    newpg.open("GET",targetlink, true);
                    
                    newpg.send(null);
    };
    window.onpopstate = function(event) {
        
    if(event.state){
        loadlink(document.location, true);
    }
};


document.body.onkeypress = function (e) { if(e.keyCode == 96) {srch.focus(); return false;} };
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
                        
                    var injpg=newpg.replace("<body","<body onload=\"popfn()\"").replace("</head>","<"+"script>var popfnloaded=false;var popfn=" + popfn.toString() +"<"+"/script></head>");
                    
                    
                    window.history.pushState({},"",ifrm.src);
                    document.open();document.write(injpg);document.close();
                    
                    };
                    
                    return false;
                }
            }
        }
    };
    
      
    var shiftdt =   function (e) {
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            var fsta = document.querySelectorAll("#popres a");
            if(fsta.length>0)
                if(e.shiftKey)
                    fsta[fsta.length-1].focus();
                else
                    fsta[0].focus();
            if(e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
    };
        srch.onkeydown = function(e) { if(e.keyCode==27) if(popres.innerHTML!="") popres.innerHTML=""; else srch.blur(); shiftdt(e) };
    
    

    window.onclick = function(e) {
        if(e.shiftKey || e.ctrlKey || e.which!=1)
            return true;
        if(e.target.localName=="a" && e.target.id!="toggle-scores" && e.target.id!="add-publisher-review-button" && e.target.parentNode.className!="login-register" 
            && e.target.className!="add-edit-link edit auth"|| 
            ((e.target.localName=="abbr" || e.target.localName=="img" ||
            e.target.localName=="i" || e.target.localName=="strong" ||
            e.target.localName=="span") && e.target.parentNode.localName=="a") ||
            (e.target.localName=="span" && e.target.parentNode.parentNode.localName=="a")) 
            {
                if(e.target.parentNode && e.target.parentNode.id.search("-tab") !=-1)
                    return true;
            var ahreforg = ((e.target.localName=="span"||e.target.localName=="abbr" || e.target.localName=="img" || e.target.localName=="i" || e.target.localName=="strong" )&& e.target.parentNode.localName=="a")? e.target.parentNode.href:e.target.href;
            if (e.target.localName=="span" && e.target.parentNode.parentNode.localName=="a")
                ahreforg = e.target.parentNode.parentNode.href;
            var ahref=ahreforg;
            var curloc = window.location.href;
            if(ahref.search("#")!=-1)
                ahref = ahref.substr(0,ahref.search("#"));
            if(curloc.search("#")!=-1)
                curloc = curloc.substr(0,curloc.search("#"));
                    console.log(e.target+" curhref:" + window.location.href + " href:" + ahreforg);
                
                console.log("modified curhref: + " + curloc + " href:" + ahref);
            
            if(ahref!=curloc || (ahref==curloc &&  ahreforg.search("#")==-1 && window.location.href.search("#")==-1)) {
                
            
                if(ahref.search("www.engadget.com")==-1)
                    return true;
                window.stop(); /*sometimes links navigate anyway other js nav contention?*/
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
    /*popres.onmouseenter = function () { if(closetimer!=null) clearTimeout(closetimer); };
    srch.onmouseenter = popres.onmouseenter;
    popres.onmouseleave = function () { closetimer = setTimeout(function(){popres.innerHTML = "";},200);};*/
    popres.onmouseenter = function () { closetimer = false };
    popres.onmouseleave = function () {closetimer = true };
    document.body.onclick = function () { if(closetimer) popres.innerHTML=""};
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
                  
                  popres.innerHTML = "<div class=\"categories-modal-left dropdown-container\" style=\"overflow: overlay; width: 420px\">"+gdgtresult.replace("<ul>","<ul style=\"padding: 0\">").replace(/<img/g, "<img style=\"vertical-align: middle; height: 32px; width: 32px\" ").replace(/<a/g, "<a style=\"height: 40px; width:400px \" tabindex=1337 class=\"popresitem\" ").replace(/<span data/g, "<span style=\"position:absolute; left:2px\" data") + "</div>";
                  
                  var refs =popres.getElementsByTagName("a");
                  
                  popres.onkeydown = function(e){
                      if(e.keyCode==27) {srch.focus(); popres.innerHTML="";}
                      else if(e.keyCode==38){
                           
                        
                         var i = 0;
                         while(document.activeElement != refs[i]) i++;
                         if(i>0)
                             refs[i-1].focus();
                         else
                             refs[refs.length-1].focus();
                                
                            
                         
                          e.preventDefault();
                          return false;
                      }
                      else if(e.keyCode==40){
                                
                         var i = 0;
                         while(document.activeElement != refs[i]) i++;
                         
                         if(i<refs.length-1)
                            refs[i+1].focus(); 
                         else
                            refs[0].focus();
                                
                          e.preventDefault();
                      return false;
                      }
                      else if((e.keyCode>=32 && e.keyCode <= 126) || e.keyCode==8) {srch.focus();/*srch.dispatchEvent(new e.constructor(e.type, e));*/}
                      };
                      
                  if(refs.length==1)
                    refs[0].addEventListener("keydown", shiftdt,false);
                    else{
                        refs[0].addEventListener("keydown", function(e){ if(e.shiftKey) shiftdt(e);},false);
                        refs[refs.length-1].addEventListener("keydown", function(e){ if(!e.shiftKey) shiftdt(e);},false);
                    }
                    
                  }
                    }
                  };
                  xhr.open("GET", "http://www.engadget.com/search/?q="+encodeURIComponent(srch.value)+"&rail=rail", true);  
                  xhr.send(null);
            },125);
        };
}; popfn();}())
