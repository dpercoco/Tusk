function loadBrowserContent(e){
	 //e.preventDefault();
	  var con = document.getElementById('browserContent');
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function(e) {
	     if(xhr.readyState == 4 && xhr.status == 200) {
	     con.innerHTML = xhr.responseText;
	     }
	  }	
	  xhr.open("GET","http://www.google.com", true);
	  xhr.setRequestHeader('Content-type', 'text/html');
	  xhr.send();
 }
 
function loadBrowser(url) {
	//https://github.com/initialxy/cordova-plugin-themeablebrowser
	//http://stackoverflow.com/questions/29366485/get-page-title-in-themeablebrowser-cordova-phonegap
		
	if(!url) url = 'http://www.google.com';
	console.log('loadBrowser: ' + url);
	
	var ct = 0;
	var title = "";
	var description = "";
	
	var ref = cordova.ThemeableBrowser.open(url, '_blank', {
	    statusbar: {
	        color: '#ffffffff'
	    },
	    toolbar: {
	        height: 40,
	        color: '#8B4513'
	    },
	    title: {
	        color: '#ffffff',
	        showPageTitle: true,
	        staticText: '<b>Tusk</b>'
	    },
	    backButton: {
	        image: 'go_back', 
	        imagePressed: 'go_back',
	        align: 'left',
	        event: 'backpressed'
	    },
	    forwardButton: {
	    	image: 'go_forward',         
	        imagePressed: 'go_forward', 
	        align: 'left',
	        event: 'forwardPressed'
	    },
	    closeButton: {
	    	image: 'go_home', 
	        imagePressed: 'go_home',
	        align: 'left',
	        event: 'go_home' 
	    },
	    backButtonImage: 'go_back',
	    backButtonPressedImage: 'go_back',
	    customButtons: [
	        {
	        	image: 'mammooth_icon.png',
		    	imagePressed: 'mammooth_icon.png',
	            align: 'right',
	            event: 'sharePressed'
	        }
	        /**		    
	        ,{
		        image: 'go_forward', 
		        imagePressed: 'go_forward',
		        align: 'left',
		        event: 'go_forward'
		    },
		    {
		        image: 'go_back', 
		        imagePressed: 'go_back',
		        align: 'left',
		        event: 'go_back'
		    },
		    {
		        image: 'go_home', 
		        imagePressed: 'go_home',
		        align: 'left',
		        event: 'go_home'
		    },
		**/    
	    ],
	    /**
	    menu: {
	    	image: 'ic_launcher',
	    	imagePressed: 'ic_launcher',
	        title: 'Test',
	        cancel: 'Cancel',
	        align: 'right',
	        items: [
	            {
	                event: 'helloPressed',
	                label: 'Hello World!'
	            },
	            {
	                event: 'testPressed',
	                label: 'Test!'
	            }
	        ]
	    },
	    **/
	    backButtonCanClose: false
	    
	});
	
	ref.addEventListener('loadstop', function(e) {
	    //alert('loadstop pressed');
	    ref.executeScript({
	        code: 'document.title'
	    }, function(values) {
	        title = values[0];
	    });	 
	});
	
	ref.addEventListener('backPressed', function(e) {
	    //alert('back pressed');		
	});
	
	ref.addEventListener('forwardPressed', function(e) {
	    //alert('back pressed');		
	});
	
	ref.addEventListener('go_home', function(e) {
	    window.open('home.html', '_self', 'location=no'); 	    
	});
	
	ref.addEventListener('go_back', function(e) {
	    //window.history.go(-1);
		//alert ('referrer:' + document.referrer == "");
		if (document.referrer == "") {
			window.open('home.html', '_self', 'location=no');
		} else {
		    history.back()
		}		
	});
	
	ref.addEventListener('go_forward', function(e) {
		if (history.next) {
			window.history.go(+1); 
		}		
	});
	
	ref.addEventListener('helloPressed', function(e) {
	    alert('hello pressed');
	});
	
	ref.addEventListener('sharePressed', function(e) {
	    //alert('share url:' + e.url);
		shareRead(e.url, title);
	});
	
	ref.addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
	    console.error(e.message);
	});
	
	ref.addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
	    console.log(e.message);
	});
}

function getDate() {
	
	var today = new Date();
	var dd = today.getDate();
	var mon = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hh = today.getHours()
    var mm = today.getMinutes()
    var ss = today.getSeconds()

	var TimeStamp = today.toLocaleString();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mon<10) {
		mon='0'+mon
	} 
	
	if(mm<10) {
		mm='0'+mm
	} 
    
	if(ss<10) {
		ss='0'+ss
	} 
	
	today = yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	return today;
}

function loadInAppBrowser() {
	
	var title = "";
	var url = "";
	
	//index.js: window.open = cordova.InAppBrowser.open;
	
	var win = window.open('http://www.google.com', '_blank', 'location=yes', 'hidden=yes');
	
	win.addEventListener('loadstart', function(e) { 
		    url = e.url;
			//alert(e.url); 
		}
	);
	
	win.addEventListener('loadstop', function () {
	    //var code = "if (!document.getElementById('tuskHeader')) { ";
		//var code = 'if (document.body.firstChild){ document.body.insertBefore(div, document.body.firstChild); }'; 
		//code += 'else {document.body.appendChild(div); }';
		//code += '}';
		//var i = document.createElement("img");  i.src="http://www.thejesustoday.com/tusk/mammooth_icon.png"; div.append(i); 
		//display: inline-block; 
		//var js1=document.createElement("script"); js1.src="http://www.thejesustoday.com/tusk/cordova.js";  document.body.insertBefore(js1, document.body.firstChild); 
		
		//http://www.telerik.com/blogs/cross-window-communication-with-cordova's-inappbrowser
		//http://jquery.malsup.com/cycle/
		//https://www.ibm.com/developerworks/library/wa-ajaxservice/
		//http://stackoverflow.com/questions/3711357/getting-title-and-meta-tags-from-external-website
		//https://blog.nraboy.com/2014/12/open-dynamic-links-using-cordova-inappbrowser/
		
	  win.executeScript({ 
		     //code: 'var js=document.createElement("script"); js.src="http://www.thejesustoday.com/tusk/browser.js";  document.body.insertBefore(js, document.body.firstChild); var outerDiv=document.createElement("div"); outerDiv.setAttribute("id", "tuskHeader");  var div = document.createElement("div"); div.innerHTML = "Tusk"; div.setAttribute("id", "tusk"); var i = document.createElement("img");  i.src="http://www.thejesustoday.com/tusk/mammooth_icon.png"; var i = document.createElement("img");  i.src="http://www.thejesustoday.com/tusk/mammooth_icon.png"; var a=document.createElement("a"); a.setAttribute("onclick","function(){alert(document.title);localStorage.setItem(\'url\', window.location.href);}"); a.appendChild(i); div.appendChild(a); outerDiv.appendChild(div); var b=document.querySelector("body"); b.parentNode.insertBefore(outerDiv,b);document.title'
		     code: 'document.title'
		 }, 
	     function (values) {
	    	 console.log("GOT TITLE!");
	    	 title = values[0];
	    	 console.log("Title: " + title);
	     });
	  
	 // win.insertCSS({
	 //   code: '#tuskHeader { background-color:#8B4513; position:fixed; text-align:center; width:100%; height:30px; z-index:99; }#tusk { background-color:#8B4513; color:#ffffff; font-size: 12px; font-weight:bold; vertical-align:text-top; text-align:left; z-index:99; width: 100px; height:30px; margin-left: auto; margin-right: auto;}'}, 
	 //   function () {
	 //   	console.log("CSS inserted!");
	 //   });
	  
	});	  
	
	
	win.addEventListener('tusk', function(e) { 
		var ans = confirm("Share this link? " + e.title);
		if (ans == true) { 
			shareRead(e.url, e.title);
		}
		else {
			win = null; 
			//window.open('home.html', '_system', 'location=no'); 
		}
	  }
	);
	
	//win.addEventListener('exit', function(e) { 
	//	   win = null; 
	//	}
	//);
	
	win.show();
}

function shareRead(url, title) {

	var imgCt = 0;
    var image = "";
    var pubdate = "";
    var desc = "";
    //alert ('SHARE url: ' + url);
   	    
    $.ajax({
		   url: url,
		   success: function(data) {
			    //alert ('title: ' + title);
			   	            
	            $("meta", data).each(function(indx, el) {
	            	
	            	//$(this).each(function() {
	            	//  $.each(this.attributes, function() {
        		//    if(this.specified) {
        		//      console.log('name: ' + this.name + ', value: ' + this.value);
        		//     }
        		//  });
        		//});
	            
	            	if ($(this).attr("itemprop")) {
 		    	     var i = $(this).attr("itemprop").toLowerCase().indexOf("description");
 		    	     if (i>-1) {
 		    		   desc = $(this).attr("content"); 
 		    		   //return false;  //NEW
 		        	   //alert('each desc: ' + desc);
 		    		   //if (desc) return false;
 		    	     }
	        	   }
	            	
	               if ($(this).attr("name")) {
	 		    	     var i = $(this).attr("name").toLowerCase().indexOf("description");
	 		    	     if (i>-1) {
	 		    		   desc = $(this).attr("content"); 
	 		    		   //return false;  //NEW
	 		        	   //alert('each desc: ' + desc);
	 		    		   //if (desc) return false;
	 		    	     }
		        	
	               }
		       });
	            
	           if (!title) {
	        	   title = document.getElementsByTagName("title")[0].innerHTML;
	           }
	           
	            
	           $("img", data).each(function() {
		    	   var n = $(this).attr("src").indexOf("logo");
		    	   if (n==-1 && imgCt==0) {image = $(this).attr("src"); imgCt +=1;} 		    	   
		           if (imgCt==1) {
		        	   //alert(image); 
		        	   //return false;
		           }
		       });
	           
	           console.log('INSERT READ: userid:' + getUserID() + ', title:' + title + ', desc:' + desc);
	           console.log('INSERT READ: date:' + getDate() + ', url:' + url + ', image:' + image);
	           
	           insertReads(getUserID(), title, desc, getDate(), url, image);        	   
	          
		   }
		}); 
    
       return false;
}