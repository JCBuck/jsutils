javascript:(function(){
	var srch='';
	var g=function(n){return document.getElementsByClassName(n)};
	if(g('prod-search').length===0) {
	var x=g('product-review-name');
	var y=g('product-toolbar-name')[0].text.trim();
	for(var i=0, r,p; i<x.length; i++)
		if((p=x[i].parentNode.parentNode.parentNode).parentNode.id=='critic-reviews-stream')
		    for(var v = 0; v<p.children.length;v++)
    		    if(p.children[v].className.search('rating')!=-1)
        			if(srch.search(r=x[i].href.replace('http://','').replace(/\/$/g,''))==-1)
        				if(y.split(' ').length + srch.split(' ').length<40)
        					srch+=' -site:'+r.split(' ');
	
	srch='http://google.com/search?q='+encodeURI(y +' review'+srch);
	var d=document.createElement('div');
	d.className = 'prod-search';
	d.onclick = function(){if(d.parentNode!==null) d.parentNode.removeChild(d)};
	d.setAttribute('style','position: fixed; top: 0px; left: 0px; background-color: #CCCCCC; z-index:9999999');
	d.innerHTML="<a onclick=this.parentNode.parentNode.removeChild(this.parentNode)>Close me (or just click on the gray background)</a><br><br><a href="+srch+" target=_blank><u>Search google for more <b>" + y +"</b> reviews</u> (" + srch.split(encodeURI(' ')).length + " search terms)<br><i>(Warning: google search limits to 32 terms, some review sites may not be filtered)<br>(For query editing flexibility, I limited it to 40 so you can edit at google&#39;s search bar,<br>also some sites may have multiple reviews but get filtered out. Previews excluded.)</i></a>";
	document.body.appendChild(d);
		
	}
}());
