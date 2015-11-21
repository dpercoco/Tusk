function setUserID (name, id) {
	//alert ("Setting ID to: " + id);
	localStorage.setItem("name", name);
	localStorage.setItem("id", id);
}

function getUserID() {
	return localStorage.getItem("id");
}

function getUserName() {
	return localStorage.getItem("name");
}

function validUser(uname, password) {
	 //http://stackoverflow.com/questions/24149377/ajax-call-php-service-login-cordova	
	 console.log('Validating User: ' + uname + "-" + password);
	 bValid = false;
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'validate', uname: uname, password: password},
	        //crossDomain: true,
	        //dataType: 'json', 
	        //async: false,
	        beforeSend: function(){
	        	$.mobile.loading("show",{text: "", textVisible: false }); 
	        },
	        complete: function(){
	        	//$.mobile.loading('hide');
	        },
	        success: function (user){ 
	        	if (user.success) { 
	        		//alert('Valid User: ' + user.firstname + " - (" + user.ID + ")");
	        		setUserID(user.firstname, user.ID);
	        		window.location.href="home.html"; 
	            }else {
	                //alert("Your login failed");
	            	$.mobile.loading('hide');
	            	$("#popupMsg").html('Invalid user');
	            	$("#popup").popup("open");
	            }
	        },
	        error: function(error){
	            //alert('Could not connect to the database' + error);
	       }
	    });
	    return bValid;
}

function getUsers() {
	 //http://stackoverflow.com/questions/24149377/ajax-call-php-service-login-cordova	
	 //alert ("validating user " + uname);
	 bValid = false;
	 html = "";
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'returnusers'},
	        //crossDomain: true,
	        //dataType: 'json', 
	        //async: false,
	        beforeSend: function(){
	        	$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
	        },
	        complete: function(){
	        	$.mobile.loading('hide');
	        },
	        success: function (users){ 
	        	//alert ("Success " - user);
	        	$.each(users, function(k, v){
	                //JSON.parse(obj);
	        		if (v.success) {
	        			html += '<li>' + v.firstname + " " + v.lastname + '<li>' ;              
	     		 	    alert (v.firstname + " - (" + v.ID + ")");
	        		}	
	            });
	        	
	        	$.mobile.loading('hide');
	        },
	        error: function(error){
	            //alert('Could not connect to the database' + error);
	       }
	    });
	    return bValid;
}

function insertUser(uname, password, firstname, lastname) { 
	 //alert ("Insert user:" + uname + "," + password + "," + firstname + "," + lastname);
	 $.ajax({ 
        type: 'POST', 
        url: 'http://www.thejesustoday.com/tusk_database.php', 
        data: {fct: 'insertuser', uname: uname,  password: password,  firstname: firstname,  lastname: lastname},
        //crossDomain: true,
        //dataType: 'json',
        //contentType: 'json', 
        //async: false,

        beforeSend: function(){
        	$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
        },
        complete: function(){
        	$.mobile.loading('hide');
        },
        success: function (user){ 
        	console.log('insertUser event successful: ' + user.ID);
        	if (user.success) { 
        		setUserID(user.firstname, user.ID);
            	//alert (user.firstname + " - (" + user.ID + ")");
                window.location.href="home.html"; 
            }else {
                //alert("Your login failed");
            	$.mobile.loading('hide');
            	$("#popupMsg").html('Registration of user failed!');
            	$("#popup").popup("open");
            }
        },
        error: function(error){
            alert('Error:' + error);
        }
    });
}

function getMyReadsCount(userID) {
	 var totalCt=0;
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'getRSSCount', userID: userID},
	        //crossDomain: true,userID
	        //dataType: 'json', 
	        //async: false,
	        beforeSend: function(){
	        	//$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
	        },
	        complete: function(){
	        	//$.mobile.loading('hide');
	        },
	        success: function (rss){ 	        	
	        	if (rss.success) { 
	        		console.log ('getMyReadsCount Successful for user:'+ userID + " - " + rss.count);
	        		totalCt = rss.count;
	        		//alert ("Count of My Reads:" + rss.count);
	            }else {
	            	console.log ('getMyReadsCount failed for user:'+ userID);
	         	    //alert("Your login failed");
	            	//$.mobile.loading('hide');
	            	//$("#myPopup").html('Invalid user');
	            	//$("#myPopup").popup("open");
	            }
	        },
	        error: function(error){
	    	    //alert('Could not connect to the database' + error);
	            //$.mobile.loading('hide');
	       }
	    });
	return totalCt;
}

function insertReads(userID, title, description, pubdate, url, image) {
	 
	  console.log ('CALLING insertReads ' + 'title:'+ title);
	  console.log ('CALLING insertReads ' + 'pubdate:'+ pubdate);
			
	 $.ajax({ 
       type: 'POST', 
       url: 'http://www.thejesustoday.com/tusk_database.php', 
       data: {fct: 'insertRead', userID: userID,  title: title,  
    	            description: description,  pubdate: pubdate,
    	            url: url,  image: image},				      
       success: function (rss){ 
    	   if (rss) {
    		   console.log ('insertReads userid: ' + rss.userID + ', title: ' + rss.title + ", pubdate: " + rss.pubdate);
	    	   if (rss.success) { 
	    		   console.log('insertReads successful: ');
	           }else {
	        	   console.log('insertReads ' + rss.msg + ": ");
	           }
    	   }
       },
       error: function(error){
    	   console.log ('insertReads FAILED! userid: ' + userID + ', title: ' + title + ", pubdate: " + pubdate);
    	   console.log ('insertReads - ERROR: ' + error.msg + "- url:" + error.url + "- title:" + error.title + "- desc:" + error.description);
       }
	 });
}

function loadMyReads() {
	
	 var ct=0;
	 var html = "";
	 var htmlhdr = "";
	 var pubdate = "";
	 var userID = getUserID();
	 console.log('loadMyReads for userID: ' + userID);
	 
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'getMyReads', userID: userID},
	        
	        beforeSend: function(){
	        	$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
	        },
	        complete: function(){
	        	$.mobile.loading('hide');
	        },
	        success: function (rss){ 
	        	console.log('getMyReads successful: ');
	        		
	        	$.each(rss, function(k, v){	 
	        		if ($.trim(v.title).length != 0) {
		        		ct+=1;
		        		html += '<li data-icon="false">';
		        		html += '<a href="' + v.url + '">';
		        		html += '<img id=img' + ct + ' src="' + v.image + '"/>';	        	    
		        		html += '<div class="rss-title">' + v.title + '"</div>';
		        	    html += '<p class="wrap"><div class="rss-description">' + v.description + '</div></p>';
		        	    pubdate = '';
		        	    if ($.trim(v.pubdate).length == 0 || v.pubdate =='null') {}
		        	    else {pubdate = v.pubdate;}
		        	    html += '<div class="rss-date">' + pubdate + '</div>';
		        	    html += '</a></li>';
	        		}
	            });
	        	
	        	//htmlhdr = '<li data-role="list-divider">' + getUserName()  + '<span class="ui-li-count">' + rss.length + '</span></li>';
	        	htmlhdr = '<li data-role="list-divider">' + getUserName()  + '<span class="ui-li-count">' + ct + '</span></li>';
	       		
	        	if (ct==0) {
	        		html += '<li data-role="list-divider"><p><div><h3 class="rss-title">No Reads</h3></div></p></li>';
	        	}
	        	
	        	$('#myReads').html(htmlhdr + html);
	            $('#myReads').listview("refresh");
	            
	        	$.mobile.loading('hide');
	        },
	        error: function(error){
	            alert('Could not connect to the database' + error);
	       }
	    });
	 
}

function loadMyFriendsReads() {
	
	 var ct=0;
	 var html = "";
	 var htmlhdr = "";
	 var htmldisplay = "";
	 var htmlmore = "";
	 var pubdate = "";
	 var userID = getUserID();
	 var lastfriendimage = "";
	 var lastfriendname = "";
	 var lastfriendID = "";
	 var lastfriendTotalReadsCt = 0;
	 var limit = 3;
	 var friendID="";
	 console.log('loadMyFriendsReads for userID: ' + userID);
	 //alert('loadMyFriendsReads for userID: ' + userID);
	 
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'getFriendsReads', userID: userID, limit: limit},
	        
	        beforeSend: function(){
	        	$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
	        },
	        complete: function(){
	        	$.mobile.loading('hide');
	        },
	        success: function (rss){ 
	        	//alert('getFriendsReads successful: ');
	        	console.log('getFriendsReads successful: ');
	        		
	        	$.each(rss, function(k, v){	 
	        		if ($.trim(v.title).length != 0) {
		        		 
	        			 ct+=1; 
	        			 
		        		 if (lastfriendname != v.friendname) {
		        			if (lastfriendname == "") {//First time around
		        				lastfriendname = v.friendname;
		        	    		lastfriendimage =  v.friendimage;
		        	    		lastfriendID = v.friendID;
		        	    		lastfriendTotalReadsCt = v.friendTotalReadsCt;
		        	    		//var totalReadsCt = getMyReadsCount(lastfriendID);
			        			console.log('loadMyFriendsReads-totalReadsCt: ' + lastfriendTotalReadsCt);			        			
		        	    	}
		        	    	else {
		        	    		ct -=1 ;
		        	    		
		        	    		htmldisplay = '<li id="myReads-list-divider-id" data-role="list-divider">';
		        	    		htmldisplay += '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
			        			htmldisplay += '<img src="' + lastfriendimage + '">'; // + lastfriendname;
			        			htmldisplay += '<span class="ui-li-count">' + ct + '</span>';	
			        			htmldisplay += '</li>';
			        			htmldisplay += html;
			        			
		        	    		htmlmore = ''; 
			        			if (lastfriendTotalReadsCt>limit) {//SHORE MORE
			        				htmlmore = '<li data-icon="false">';
			        				htmlmore += '<a id="myFriendsReadsMoreAnchor" href="#myFriendsReadsMore"';
			        				htmlmore += 'onclick="loadMyFriendsReadsMore(\'' + lastfriendID + '\')">';
			        				htmlmore += '<div class="rss-more">More...</div>';
			        				htmlmore += '</a></li>';
			        				htmldisplay += htmlmore;
		        	    	    }
			        			
			        			//htmldisplay = getMyFriendsDividerHTML(html, htmlmore, lastfriendimage, ct);	      	    		
		        	    				        			
			        			lastfriendname = v.friendname;
		        	    		lastfriendimage =  v.friendimage;
		        	    		lastfriendID = v.friendID;
		        	    		lastfriendTotalReadsCt = v.friendTotalReadsCt;
			        			html = "";
			        			ct = 1;
		        	    	}
		        		}
		        		 
		        		html += '<li data-icon="false">';
		        		html += '<a href="' + v.url + '">';
		        		html += '<img id=img' + ct + ' src="' + v.image + '"/>';	        	    
		        		html += '<div class="rss-title">' + v.title + '"</div>';
		        	    html += '<p class="wrap"><div class="rss-description">' + v.description + '</div></p>';
		        	    pubdate = '';
		        	    if ($.trim(v.pubdate).length == 0 || v.pubdate =='null') {}
		        	    else {pubdate = v.pubdate;}
		        	    html += '<div class="rss-date">' + pubdate + '</div>';
		        	    html += '</a></li>';
		        	    
	        		}
	            });
	        	
	        	
	        	if (ct==0) {
	        		htmldisplay = '<li data-role="list-divider"><p><div><h3 class="rss-title">No Reads</h3></div></p></li>';
	        	}
	        	else {//http://jsfiddle.net/ezanker/jk9Fs/8/
	        		htmldisplay += '<li id="myReads-list-divider-id" data-role="list-divider">';
	        		htmldisplay += '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
        			htmldisplay += '<img src="' + lastfriendimage + '">'; // + lastfriendname;
        			htmldisplay += '<span class="ui-li-count">' + ct + '</span></li>';		
        			htmldisplay += html;
        			
        			if (lastfriendTotalReadsCt>limit) {//SHORE MORE
	        			htmldisplay += '<li data-icon="false">';
	        			htmldisplay += '<a id="myFriendsReadsMoreAnchor" href="#myFriendsReadsMore" class="rss-more"';
	        			htmldisplay += 'onclick="loadMyFriendsReadsMore(\'' + lastfriendID + '\')">';
	        			htmldisplay += '<div class="rss-more">More...</div>';
	        			htmldisplay += '</a></li>';
    	    	    }
	        	}
	        	
	        	//$('#friendsGroupID').append(htmldisplay);
	        	$('#myFriendsReads').html(htmldisplay);
	            $('#myFriendsReads').listview("refresh");
	            
	        	$.mobile.loading('hide');
	        },
	        error: function(error){
	            alert('Could not connect to the database' + error);
	       }
	    });
	 
}

function getMyFriendsDividerHTML(htmlReads, htmlmore, img, ct) {
	
	var htmldisplay = "";
	//htmldisplay += '<div data-role="collapsible-set" data-iconpos="left" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" class="">'; 
	htmldisplay += '<div data-role="collapsible">';
	htmldisplay += '<h3 class="rss-collapsible">';
	htmldisplay += '<div style="color:white;font-weight:normal;">
    htmldisplay += '<img src="' + img + '">';
	htmldisplay += '<span class="ui-li-count">' + ct + '</span>';
	htmldisplay += '</div>';
	htmldisplay += '</h3>';
	htmldisplay += '<ul data-role="listview">';
	htmldisplay += htmlReads;
	htmldisplay += htmlmore;
	htmldisplay += '</ul>';
	htmldisplay += '</div>';
	return htmldisplay;
	
}

function loadMyFriendsReadsMore(friendID) {
	
	 var ct=0;
	 var html = "";
	 var htmlhdr = "";
	 var htmldisplay = "";
	 var pubdate = "";
	 var friendimage = "";
	 var friendname = "";
	 var limit = 99;
	 //var friendID== $('#myfriendID').val();
	 //document.getElementById("myfriendID").val();
	 console.log('loadMyFriendsReadsMore for friend: ' + friendID);
	 //alert('loadMyFriendsReads for friend: ' + friendID);
	 
	 $.ajax({ 
	        type: 'POST', 
	        url: 'http://www.thejesustoday.com/tusk_database.php', 
	        data: {fct: 'getFriendsReadsMore', friendID: friendID, limit: limit},
	        
	        beforeSend: function(){
	        	$.mobile.loading("show",{text: "Loading...", textVisible: false }); 
	        },
	        complete: function(){
	        	$.mobile.loading('hide');
	        },
	        success: function (rss){ 
	        	//alert('getFriendsReads successful: ');
	        	console.log('getFriendsReadsMore successful: ');
	        		
	        	$.each(rss, function(k, v){	 
	        		if ($.trim(v.title).length != 0) {		        		 
	        			ct+=1; 
	        			friendID = v.friendID;
		        		friendimage =  v.friendimage;	        			
		        	    friendname = v.friendname;
		        		 
		        		html += '<li data-icon="false">';
		        		html += '<a href="' + v.url + '">';
		        		html += '<img id=img' + ct + ' src="' + v.image + '"/>';	        	    
		        		html += '<div class="rss-title">' + v.title + '"</div>';
		        	    html += '<p class="wrap"><div class="rss-description">' + v.description + '</div></p>';
		        	    pubdate = '';
		        	    if ($.trim(v.pubdate).length == 0 || v.pubdate =='null') {}
		        	    else {pubdate = v.pubdate;}
		        	    html += '<div class="rss-date">' + pubdate + '</div>';
		        	    html += '</a></li>';
	        		}
	            });
	        	
	        	
	        	if (ct==0) {
	        		htmldisplay = '<li data-role="list-divider"><p><div><h3 class="rss-title">No Reads</h3></div></p></li>';
	        	}
	        	else {
	        		htmldisplay += '<li data-role="list-divider" class="myReads-list-divider">';
	       			htmldisplay += '<img src="' + friendimage + '">'; 
	       			htmldisplay += '<span class="ui-li-count">' + ct + '</span></li>';		
	       			htmldisplay += html;
	        	}
	        	
	        	$('#myFriendsReadsMoreList').html(htmldisplay);
	            $('#myFriendsReadsMoreList').listview("refresh");
	            
	            $("#myFriendsReadsSetMore").collapsible("expand");
	            $('#myFriendsReadsSetMore [role=collapsible]').text(lastfriendname); //DAHIL
	            document.getElementById("myFriendsName").innerHTML  = friendname;
	            
	        	$.mobile.loading('hide');
	        },
	        error: function(error){
	            alert('Could not connect to the database' + error);
	       }
	    });
	 
}

