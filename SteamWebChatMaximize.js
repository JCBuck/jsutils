javascript:(function(){document.body.onkeypress=function(c) {if(c.keyCode===27){tog()}};tog();function tog(){var q=function(a) {return document.querySelector(a)};var w=q("#chat_friendslist_area").style;var c=q("#chat_msg_area").style;var h=q(".chat_page_header").style;var b=q(".chat_page_settings_area").style;var p=q(".chat_page").style;var m=q("div.maincontent:nth-child(3)").style;if(w.width==="0px"){w.width="271px";c.left="288px";h.height="";b.height="";p.minWidth="599px";m.minWidth="575px"}else{w.width=c.left=h.height=b.height=p.minWidth=m.minWidth="0";}}; })()
