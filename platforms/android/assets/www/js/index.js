/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
	
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	
        app.receivedEvent('deviceready');
       //window.open = cordova.InAppBrowser.open;
       //console.log('InAppBrowser worked!');       
    	        
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	
    	//NEW DAHIL CHANGE
    	 document.onclick = function (e) {
             e = e ||  window.event;
             var element = e.target || e.srcElement;

             if (element.tagName == 'A') {
                 window.open(element.href, "_blank", "location=yes");
                 return false; // prevent default action and stop event propagation
             }
         };
    	
    	navigator.splashscreen.hide();
		//navigator.notification.alert('Application ready to use', function(){}, 'Ready to use');
		
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
        
        //window.location.href="files/resources/lib/jquery-mobile-1.4.5/demos/popup/home.html";
        window.location.href="home.html";
    }
};