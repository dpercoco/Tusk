function loadContacts() {
	
	//http://thejackalofjavascript.com/phonegap-3-contacts-api-tutorial/
	console.log("loadContacts !!! ");
	 
	$("body").addClass('ui-disabled').css("background", "#000");
    $.mobile.loading("show");
	var options = new ContactFindOptions();
	options.multiple = true;
	options.filter = ""; 
	var fields = ["name", "familyName", "givenName", "emails", "photos", "phoneNumbers"];
	navigator.contacts.find(fields, gotContacts, loadContactsErr);
}


function loadContactsErr(e) {
	
	if (e) console.log("errorHandler: "+e)
	else console.log("loadContactsErr");
	$.mobile.loading("hide");
	$("body").removeClass('ui-disabled');
}

function gotContacts(c) {
	
	 console.log("#Contacts: " + c.length);
	 $.mobile.loading("hide");
	 $("body").removeClass('ui-disabled');
	 
	 var html = "";
	 var ct = 0;
	 for (var i = 0; i < c.length; i++) {
		 //console.log(JSON.stringify(c[i]));
		 
		 if ($.trim(c[i].name.familyName).length != 0 && $.trim(c[i].name.givenName).length != 0) {
			 ct += 1;
	         html += '<li class="contacts-li">';
	         if (c[i].photos) {
	        	 if (c[i].photos.length>0) {
	        		 html += '<img src="' + c[i].photos[0].value + '">';
	        	 }
	         }
	         html += '<div class="contactList-name">' + c[i].name.givenName + ' ' + c[i].name.familyName + '</div>';
	         html += '</li>';
		 }
	 }
	 
	 if (ct == 0) {
        html = '<li>';
        html += '<h2>No Contacts</h2>';
        html += '</li>';
     }
	 
	 //console.log('html:' + html);
	 $("#contactList").html('');
	 $("#contactList").append(html);
	 $("#contactList").listview('refresh');	 
}


function addContact() {
	
    if(!$("#contactForm").valid()) return false;			    
    
    event.preventDefault();
    console.log('addToContacts');
    if (!navigator.contacts) {
        alert("Contacts API not supported", "Error");
        return;
    }
    
    var contact = navigator.contacts.create();
    contact.name = {givenName: $('#first_name').val(), familyName: $('#last_name').val()};
    var emails = [];
    emails[0] = new ContactField('work', $('#contact_email').val(), true);
    contact.emails = emails;
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('mobile',  $('#contact_phone').val(), true);
    contact.phoneNumbers = phoneNumbers;
    var photos = [];
    //var photoImg = 'images/' + $('#first_name').val() + $('#last_name').val() + '.jpg';
    var photoImg = 'http://thejesustoday.com/tusk/' + $('#first_name').val() + $('#last_name').val() + '.jpg';
    photos[0] = new ContactField('value',  photoImg, true);
    contact.photos = photos;
    contact.displayName = $('#first_name').val() + $('#last_name').val();
    contact.save();
    
    var msg = '&nbsp;' + $('#first_name').val() + ' ' + $('#last_name').val() + ' added!&nbsp;&nbsp;';
    
    $("#contactForm").get(0).reset();
    $("#popupMsg").html(msg);
    $("#popup").popup('open');
    
    //console.log('Added Contact: ' + $('#first_name').val() + ' ' + $('#last_name').val());
    return false;		    
   			    
}

function uploadContacts() {
	console.log('uploadContacts');
	
	$("body").addClass('ui-disabled').css("background", "#000");
    $.mobile.loading("show");
	var options = new ContactFindOptions();
	options.multiple = true;
	options.filter = ""; //options.filter = "Benoit";
	var fields = ["name", "familyName", "givenName", "emails", "photos", "phoneNumbers"];
	navigator.contacts.find(fields, gotContactsToUpload, loadContactsErr);
	
}

function gotContactsToUpload(c) {
	
	 console.log("#Upload Contacts: " + c.length);
	 
	 var userID = getUserID();
	 var name = '';
	 var phone = '';
	 var email='';
	 var image = '';
	 var ct = 0;
	 for (var i = 0; i < c.length; i++) {
		 //console.log(JSON.stringify(c[i]));
		 
		 //ADD IMAGE <-------------------------
		 if ($.trim(c[i].name.familyName).length != 0 && $.trim(c[i].name.givenName).length != 0) {
			 name = c[i].name.givenName + ' ' + c[i].name.familyName;
			 ct += 1;
	         if (c[i].photos) {
	        	 if (c[i].photos.length>0) {
	        		 image = c[i].photos[0].value;
	        	 }
	         }
	         if (c[i].phoneNumbers) {
	        	 if (c[i].phoneNumbers.length>0) {
	        		 //if ([i].phoneNumbers[0].type == 'mobile')
	        		 phone = c[i].phoneNumbers[0].value;
	        	 }
	         }
	         if (c[i].emails) {
	        	 if (c[i].emails.length>0) {
	        		 email = c[i].emails[0].value;
	        	 }
	         }
		 }
		 
		 insertFriend(userID, name, phone, email, image);
	 }
	 
	 $.mobile.loading("hide");
	 
}

function insertFriend(userID, name, phone, email, image) { 
	 console.log("For user " + userID + " insert friend:" + name + ", phone:" + phone + ", email:" + email + ", image:" + image);
	 $.ajax({ 
       type: 'POST', 
       url: 'http://www.thejesustoday.com/tusk_database.php', 
       data: {fct: 'insertfriend', userID: userID, name: name,  
    	           phone: phone,  email: email, image: image},

       beforeSend: function(){
       	  //$.mobile.loading("show",{text: "Loading...", textVisible: true }); 
       },
       complete: function(){
       	  $.mobile.loading('hide');
       	  $("body").removeClass('ui-disabled');
       },
       success: function (user){ 
       	   console.log('insertFriend event successful!');
       	   if (user.success) { 
       		   console.log('inserted Friend ID:' + user.userID + ', name:' + user.name);
       		   //window.location.href="home.html"; 
           }else {
               //alert("Your login failed");
        	   console.log('inserted FAILED Friend ID:' + user.userID + ', name:' + user.name);
          	   $("#popupMsg").html('Insert of friend failed: ' + name + '! ');
           	   $("#popup").popup("open");
           }
       },
       error: function(error){
           //alert('Could not connect to the database' + error);
       }
   });
}

function deleteAllContacts() {
	//http://simonmacdonald.blogspot.com/2013/07/backup-remove-and-restore-your-contacts.html
	
	console.log("deleteAllContacts !!! ");
	 
    var deleteContact = function(contacts) {
        //console.log("length = " + contacts.length);
        // No contacts left, stop saving
        if (contacts.length == 0) {
            console.log("All contacts removed");
            loadContacts();
            return;
        }
    
        var contact = contacts.pop();
        contact.remove(function() {
            deleteContact(contacts);
        }, null);
    };
    
    navigator.contacts.find(["*"], deleteContact, deleteContactsErr, {"multiple": true});    
}

function deleteContactsErr(e) {
	
	if (e) console.log("deleteContactsErr: " + e.code)
	else console.log("deleteContactsErr");
	$.mobile.loading("hide");
}

function getContactImage(phone) {
	
	//NOT USED
	var options = new ContactFindOptions();
	options.multiple = true;
	options.filter = ""; 
	var fields = ["name", "familyName", "givenName", "emails", "photos", "phoneNumbers"];
	navigator.contacts.find(fields, gotContactImage, loadContactsErr);
	
}