javascript:(function(){
	var timeout;
	srch = document.getElementById("nav-search-input");
	srch.oninput = 
		function() { 
			clearTimeout(srch);
			timeout = setTimeout(
					function (){
						console.log("Search now! query: "+srch.value);
					
			},250);
		};
}());
