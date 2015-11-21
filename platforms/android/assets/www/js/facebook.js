function loadFacebook() {
	var ref = window.open('https://www.facebook.com/dialog/oauth?client_id=1631549553795045&redirect_uri=http://coenraets.org/apps/openfb/oauthcallback.html&response_type=token&display=popup&scope=email', '_blank', 'location=yes');
}

function loadFacebook_ThemeableBrowser() {
	
	cordova.ThemeableBrowser.open('facebook.html', '_blank', {
	    statusbar: {
	        color: '#ffffffff'
	    },
	    toolbar: {
	        height: 30,
	        color: '#004c99'
	    },
	    title: {
	        color: '#ffffff',
	        showPageTitle: true,
	        staticText: 'Tusk'
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
	        	image: 'checkmark',
		    	imagePressed: 'checkmark',
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
	}).addEventListener('backPressed', function(e) {
	    //alert('back pressed');
	}).addEventListener('forwardPressed', function(e) {
	    //alert('back pressed');
	}).addEventListener('go_home', function(e) {
	    window.open('home.html', '_self', 'location=no'); 
	}).addEventListener('go_back', function(e) {
	    //window.history.go(-1);
		//alert ('referrer:' + document.referrer == "");
		if (document.referrer == "") {
			window.open('home.html', '_self', 'location=no');
		} else {
		    history.back()
		}
	}).addEventListener('go_forward', function(e) {
		if (history.next) {
			window.history.go(+1); 
		}
	}).addEventListener('helloPressed', function(e) {
	    alert('hello pressed');
	}).addEventListener('sharePressed', function(e) {
	    alert('share title:' + e.url);
	}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
	    console.error(e.message);
	}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
	    console.log(e.message);
	});
} 

function facebookLogin(){
    FB.login(function(response){
        if (response.authResponse) {
            console.log('Welcome! Fetching your information');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
            });

            console.log(response);
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}   