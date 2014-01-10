javascript:(function(){
	var timeout;
	srch = document.getElementById("nav-search-input");
	srch.oninput = 
		function() { 
			clearTimeout(timeout);
			timeout = setTimeout(
					function (){
						console.log("Search now! query: "+srch.value);
						if(srch.value.trim.length==0) {
							console.log("Except don't because spaces");
						}
							
					
			},250);
		};
}());
