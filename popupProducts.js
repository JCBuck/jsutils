javascript:(function(){
	var timeout;
	var srch = document.getElementById("nav-search-input");
	var gdgtiframe = document.createElement("iframe");
	gdgtiframe.style.display = "none";
	gdgtiframe.style.width = "1000px"; /*must be this wide in order to have the gdgtresults...*/
	gdgtiframe.id = "gdgtiframe";
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
					    var gdgtres;
					    var loadtmr = setTimeout(function() { 
					    		gdgtres=gdgtiframe.contentDocument.getElementById("gdgt-result");
					    		console.log(gdgtres.innerText);
					    	
					    	}, 1000);
					
			},250);
		};
}());
