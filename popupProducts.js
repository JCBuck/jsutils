javascript:(function(){
	var timeout;
	var srch = document.getElementById("nav-search-input");
	var gdgtiframe = document.createElement("iframe");
	gdgtiframe.style.display = "none";
	document.body.appendChild(gdgtiframe);
	
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
						
					    gdgtiframe.src="http://www.engadget.com/search/?q="+encodeURIComponent(srch.value);
					    $(gdgtiframe.contentDocument).bind("DOMNodeInserted", function(e) {
					    	var element = e.target;
						    if(element.id=="gdgt-result"){
						    	console.log(element.innerText);	
						    }
					    }
					    );

						
							
					
			},250);
		};
}());
