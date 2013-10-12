javascript:(function(){
	srch='';
	g=function(n){return document.getElementsByClassName(n)};
	if(g('prod-search').length===0) {
	x=g('product-review-name');
	y=g('product-toolbar-name')[0].text.trim();
	for(i=0; i<x.length; i++)
		if(x[i].parentNode.parentNode.parentNode.parentNode.id=='critic-reviews-stream') 
			if(srch.search(r=x[i].href.replace('http://','').replace(/\/$/g,''))==-1)
				if(y.split(' ').length + srch.split(' ').length<40)
					srch+=' -site:'+r.split(' ');
	
	srch='http://google.com/search?q='+encodeURI(y +' review'+srch);
	d=document.createElement('div');
	d.className = 'prod-search';
		d.onclick = function(){if(d.parentNode!=null) d.parentNode.removeChild(d)};
	d.setAttribute('style','position: fixed; top: 0px; left: 0px; background-color: #CCCCCC; z-index:9999999');
		d.innerHTML="<a onclick=this.parentNode.parentNode.removeChild(this.parentNode)>Close me (or just click on the gray background)</a><br><br><a href="+srch+" target=_blank><u>Search google for more <b>" + y +"</b> reviews</u> (" + srch.split(encodeURI(' ')).length + " search terms)<br><i>(Warning: google search limits to 32 terms, some review sites may not be filtered)<br>(For query editing flexibility, I limited it to 40 so you can edit at google&#32;s search bar,<br>also some sites may have multiple reviews but get filtered out)</i></a>";
		document.body.appendChild(d);
		
	}
}());
