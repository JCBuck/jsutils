javascript:(function(){
	var timeout;
	var srch = document.getElementById("nav-search-input");
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
				    xhr.open("GET", "http://www.engadget.com/search/?q="+encodeURIComponent(srch.value)+"&rail=rail", false);  // synchronous request
				    xhr.send(null);
				    var mys=xhr.responseText;
					/*
				    var jsCode = document.createElement('a');   
				    jsCode.innerHTML = "popupProducts";
				    jsCode.href=mys;
				    jsCode.className = "cool"
				  document.body.appendChild(jsCode);*/
				  console.log(mys);
			},250);
		};
}());
