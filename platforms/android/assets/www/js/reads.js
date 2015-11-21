function loadRSSFeed(feed) {
	//http://stackoverflow.com/questions/13876149/how-do-i-add-this-working-swipe-delete-functionality-to-a-new-appended-list-item
	//$.mobile.loading("show", {text : "Loading...", textVisible : true});
	
	var urlString = "";
	var imgSrc = "images/" + feed + ".png";
	
	switch (feed) {
	  case "cnn":
	    urlString = "http://rss.cnn.com/rss/cnn_topstories.rss";
	    break;
	  case "wsj":
		urlString = "http://www.wsj.com/xml/rss/3_7014.xml";
		break;
	  case "reuters":
		urlString = "http://feeds.reuters.com/reuters/oddlyEnoughNews";
		break;
	  case "espn":
		urlString = "view-source:http://sports.espn.go.com/espn/rss/news";
		break;
	  case "nytimes":
		urlString = "view-source:http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
		break;
	  case "netflix":
		urlString = "http://dvd.netflix.com/Top100RSS";
		break;
	  default:
		break;
	}
	
	$('#rss-title-image').attr('src', imgSrc);
	 
	console.log('load ' + urlString + ' feed has started!');
	
    $.ajax({
        url : urlString,
        dataType : "xml",
        crossDomain : true
    }).done(
        function(data) {
            var $xml = $(data);
            var cnt = 0;
            html2 = "";
            html3 = "";
            htmlAll = "";
            var html = '';
			    
            $xml.find("item")
               .each(
                 function(data) {
                	 cnt +=1;
                     var $xmlItem = $(this);                     
                     var pic = $xmlItem.find('media\\:thumbnail,thumbnail');
                     if (pic == null || feed =='wsj') { 
                    	 pic = $xmlItem.find('media\\:content,content');
                     }
                     
                     //console.log('PIC: ' + pic.attr('url'));
                     
                     var item = {
                         title : $xmlItem.children("title").text(),
                         link : $xmlItem.children("link").text(),
                         pubDate : $xmlItem.children("pubDate").text(),
                         description : $xmlItem.children("description").text()
                     };
                     
                     //console.log('desc: ' + item.description);
                     var descDirty = '';
                     var n = item.description.indexOf("<");
                     if(n>-1) {
                    	 descDirty = item.description.substring(0, n);
                     }
                     else {
                    	 descDirty = item.description;
                     }
                     var desc = descDirty.replace(/\"/g,'');
                    	    
                     html += '<li id=li' + cnt + ' data-swipeurl="' + item.link + '" data-icon="false">';
	        		 html += "<a href='#' target='_blank' onclick='loadBrowser(\"" + item.link + "\")'>";
	        		 if ($.trim(pic.attr('url')).length > 0) {
	        			 html += '<img id=img' + cnt + ' src="' + pic.attr('url') + '"/>';
	        		 }
		             html += "<div class='rss-title'>" + item.title + "</div>";
	        	     html += "<p class='wrap'><div class='rss-description'>" + desc + "</div></p>";
	        	     var pubdate = '';
	        	     if ($.trim(item.pubDate).length == 0 || item.pubDate =='null') {}
	        	     else {pubdate = item.pubDate;}
	        	     html += '<div class="rss-date">' + pubdate + '</div>';
	        	     html += '</a></li>';
	        	     	        	     
           	    }
                 
             ); 
            
            $('#rssReads').html(html);
            $('#rssReads').listview("refresh");
            
            
        	$("#swipeMe").on("swiperight",">li",function(e){
        		var li = $(this);
        		var swipeBtn = li.find('.aSwipeBtn');
        		swipeBtn.remove();
                // remove all currently displayed buttons
				$('div.ui-btn, .aSwipeBtn', li).animate({ width: 'toggle' }, 200, function(e) {
					//$(this).remove();
				});
				//$(this).hide();
        	});
        	        
            
            $("#swipeMe").on("swipeleft",">li",function(e){
                var li = $(this);
                var imgContents = $(li.children()[0]);
                var image = imgContents.attr("src");                 
                var url = li.attr("data-swipeurl");                
                var description = li.find('.rss-description').text();
                var pubdate = li.find('.rss-byline').text();
                var title = li.find('.rss-title').text();
                //var title = li.find('a').text();
                
                // remove all currently displayed buttons
				$('div.ui-btn, .aSwipeBtn', li).animate({ width: 'toggle' }, 200, function(e) {
					$(this).remove();
				});
                
            	var $swipeBtn = $('<a>Share</a>').attr({
					'data-role': 'button',
					'data-mini': true,
					'data-inline': 'true',
					'class': 'aSwipeBtn',
					'data-theme': 'e',
					'href': li.data('data-swipeurl')
				     })
				.on("click", function(e){
					 e.preventDefault();
					 var userID = getUserID();
					 var userName = getUserName();
					 
					 console.log("feedCNN.js(Share) - userid: " + userID + ", title: " + title + ", pubdate:" + pubdate
							  + ", url: " + url + ", desc: " + description  + ", image: " + image);
					 	 
					 $.ajax({ 
				       type: 'POST', 
				       url: 'http://www.thejesustoday.com/tusk_database.php', 
				       data: {fct: 'insertRSS', userID: userID,  title: title,  
				    	            description: description,  pubdate: pubdate,
				    	            url: url,  image: image},				      
				       success: function (rss){ 
				    	   if (rss) {
				    		   console.log ('inserRSS userid: ' + rss.userID + ', title: ' + rss.title + ", pubdate: " + rss.pubdate);
					    	   if (rss.success) { 
					    		   console.log('insertRSS successful: ');
					           }else {
					        	   console.log('insertRSS ' + rss.msg + ": ");
					           }
				    	   }
				       },
				       error: function(error){
				    	   console.log ('inserRSS userid: ' + userID + ', title: ' + title + ", pubdate: " + pubdate);
				    	   console.log ('insertRSS: Could not connect to the database' + error);
				      }
				       
				   });
					 $(this).hide();
				});            	
				
            	
            	// slide insert button into list item
				$swipeBtn.prependTo(li).button();
				li.find('.ui-btn').hide().animate({ width: 'toggle' }, 200);       				
				
            });
            
    }).fail(function(xhr, textStatus, errorThrown) {
        alert(textStatus.toString());
    }).always(function() {
        //$.mobile.loading("hide");
    });
}