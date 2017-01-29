/* MIT License: https://webrtc-experiment.appspot.com/licence/ */
//student side script
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

getChatToken();
tok = 0;
queried = false;
var config1 = {
    openSocket: function (config1) {
        if (!window.Firebase) return;
        var channel = config1.channel || uniqueChatToken || location.hash.replace('#', '') || 'chat-hangout';
        var socket = new Firebase('https://chat.firebaseIO.com/' + channel);
        socket.channel = channel;
        socket.on("child_added", function (data) {
            config1.onmessage && config1.onmessage(data.val());
        });
        socket.send = function (data) {
            this.push(data);
        }
        config1.onopen && setTimeout(config1.onopen, 1);
        socket.onDisconnect().remove();
        return socket;
    },
    onRoomFound: function (room) {  
			//alert("room");
            hangoutUI.joinRoom({
                roomToken: room.broadcaster,
                joinUser: room.broadcaster,
                userName: username//prompt('Enter your name', 'Anonymous')
            });
            hideUnnecessaryChatStuff();
      
    },
    onChannelOpened: function (/* channel */) {
        unnecessaryStuffVisible && hideUnnecessaryChatStuff();
    },
    onChannelMessage: function (data) { 
	//when a channel message is received, look for #^$ alongwith a random number as a token of acceptance
        if (!chatOutput) {
            console.log(message);
            return;
        }
		msgPat1 = '#^$!'; //raiseHand request
		msgPat2 = '#^$'; //request Granted
		if (msgPat1 == data.message.substring(0, msgPat1.length))
		{
			//alert("raise hand request");
		}
		else if(data.message == ("#^$ " + tok))
		{
			//alert("Received Token of acceptance");
			postMessage.disabled = false;
			raiseHand.disabled = false;
			chatMessage.disabled = false;
			queried = false;
			 var tr = document.createElement('tr');
			        tr.innerHTML =
                '<td style="width:40%;"><b>' + data.sender + ':</b></td>' +
                '<td>' + 'Granted' + '</td>';
			//chatOutput.insertBefore(tr, chatOutput.firstChild);
			chatOutput.appendChild(tr);
		
		}
		
		else if(msgPat2 == data.message.substring(0, msgPat2.length))
		{
		//	alert("Someone else's request granted");
		}
		
		else
		{
        var tr = document.createElement('tr');
        tr.innerHTML =
                '<td style="width:40%;"><b>' + data.sender + ':</b></td>' +
                '<td>' + data.message + '</td>';
		//var pingu = document.getElementById("ping");
		//if(data.message == "hi")
			//alert("Hi received");
			
        //chatOutput.insertBefore(tr, chatOutput.firstChild);		
			chatOutput.appendChild(tr);
		}
    }
};


function initChat()
{		
		
		
		hangoutUI = hangout(config1);
			
		chatOutput = document.getElementById('chat-output');
		//textarea
		chatMessage = document.getElementById('chat-message');
		
		postMessage = document.getElementById('post-chat-message');
		
		raiseHand = document.getElementById('btnAskQuestion');
				
			postMessage.onclick = function() {
				if(chatMessage.value != "")
				{
					hangoutUI.send(chatMessage.value);
					var tr = document.createElement('tr');
					tr.innerHTML =
							'<td style="width:40%;"><b>You:</b></td>' +
							'<td>' + chatMessage.value + '</td>';

					chatOutput.appendChild(tr);
					chatMessage.value = '';
				}
				postMessage.disabled = true;				
			};
			
		if (chatMessage)
			$('#chat-message').keyup(function(e) 
			{
				if (e.which == 13) {  // detect the enter key
					postMessage.click(); // fire a sample click,  you can do anything
					chatMessage.disabled = true;
				}
			});
			
			raiseHand.onclick = function() {
					
					var raiseToken = '#^$! ' + questionToken();
					hangoutUI.send(raiseToken);
					//alert("raiseToken that should be received: " + raiseToken);
					queried = true;
					raiseHand.disabled = true;
					

				//	chatOutput.insertBefore(tr, chatOutput.firstChild);
				//	chatMessage.value = '';
				
			};
			
			
		hideUnnecessaryChatStuff();
}


/* on page load: get public rooms */
//var hangoutUI = hangout(config1);

/* UI specific */
//var startConferencing = document.getElementById('start-conferencing');
//if (startConferencing) startConferencing.onclick = createButtonClickHandler;
//var roomsList = document.getElementById('rooms-list');

//var chatOutput = document.getElementById('chat-output');

var unnecessaryStuffVisible = true;
function hideUnnecessaryChatStuff() {
    var visibleElements = document.getElementsByClassName('visible'),
        length = visibleElements.length;

    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'none';
    }
    unnecessaryStuffVisible = false;

    var chatTable = document.getElementById('chat-table');
    if (chatTable) chatTable.style.display = 'block';
    if (chatOutput) chatOutput.style.display = 'block';
}

function questionToken()
{
	tok = Math.floor((Math.random()*99999999)+1); // a global variable
	//alert( tok );
	return tok;

}

function getChatToken()
{
	var eventId = $.QueryString["eventId"];
	$.ajax({
		 async: false,
		 type: 'GET',
		 url: 'db/get.php?mode=getEventDetails&eventId='+eventId,
		 success: function(data) 
		 {
			var eventDetails = JSON.parse(data);							
			uniqueChatToken = eventDetails['chatToken'];
			//alert(uniqueToken);
		 }
		});	 	
}