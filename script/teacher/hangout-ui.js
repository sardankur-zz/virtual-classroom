/* MIT License: https://webrtc-experiment.appspot.com/licence/ */
//teacher side script

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


generateChatToken();

sequence = -1;//for appropriate handlers
acceptArray = [];

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
       
		
		hideUnnecessaryChatStuff();
        
    },
    onChannelOpened: function (/* channel */) {
        unnecessaryStuffVisible && hideUnnecessaryChatStuff();
    },
    onChannelMessage: function (data) {
        if (!chatOutput) {
            console.log(message);
            return;
        }
		//alert("Processing Some Message");
		msgPat1 = '#^$!'; //raiseHand request
		msgPat2 = '#^$'; //request Granted
		if (msgPat1 == data.message.substring(0, msgPat1.length) )
		{
			++sequence;
			//alert("request received");	
			var random = data.message.replace( /^\D+ /g, '');
			//alert("Number Extracted: " + random);
			var tr = document.createElement('tr');
			temp = msgPat2 + ' ' + random;
			acceptArray.push(temp);
			//alert("tst :" + temp);
			tr.innerHTML =
                '<td style="width:40%;">' + data.sender + '</td>' + 
				'<td>' + "      " + '</td>' +
                '<td>' + " <input type = 'button' id = 'b" + sequence+"' value = 'Accept?' onclick='buttonClick(event)' " + '</td>';
			invitations.insertBefore(tr, invitations.firstChild);
			//chatOutput.style.display = 'none';
			//invitations.style.display = 'block';
			viewInvites.style.outline = "2px solid black";
		//	alert("Should have disappeared now!");
		}		
		
		else if( msgPat2 == data.message.substring(0, msgPat2.length))
		{
			//alert("grant request received");
		
		}
		else
		{
			var tr = document.createElement('tr');
			tr.innerHTML =
					'<td style="width:40%;"><b>' + data.sender + ':</b></td>' +
					'<td>' + data.message + '</td>';

			//chatOutput.insertBefore(tr, chatOutput.firstChild);
			chatOutput.appendChild(tr);
			//invitations.style.display = "none";
			//chatOutput.style.display = "block";
		
		}
    }
};

function initChat()
{
		hangoutUI = hangout(config1);
		hangoutUI.createRoom({
			userName: username, // prompt('Enter your name', 'Anonymous'), // get email id
			roomName: "Virtual ClassRoom" || ((document.getElementById('conference-name') || { value: null }).value || 'Anonymous') + ' // shared via ' + (navigator.vendor ? 'Google Chrome (Stable/Canary)' : 'Mozilla Firefox (Aurora/Nightly)')
		});	
		//the chat-output table
		chatOutput = document.getElementById('chat-output');
		//the invitations table
		invitations = document.getElementById('invitations');
		//textarea
		chatMessage = document.getElementById('chat-message');
		
		postMessage = document.getElementById('post-chat-message');
				
		
		viewInvites = document.getElementById('btViewInvitations');
		viewChat  = document.getElementById('btnViewChat');
		
		divViewChat = document.getElementById('divViewChat');
		
		divViewInvitation = document.getElementById('divViewInvitation');
				
			postMessage.onclick = function() {
				if(chatMessage.value != "")
				{
					hangoutUI.send(chatMessage.value);
					var tr = document.createElement('tr');
					tr.innerHTML =
							'<td style="width:40%;"><b>You:</b></td>' +
							'<td >' + chatMessage.value + '</td>';					
					//chatOutput.insertBefore(tr, chatOutput.firstChild);
					chatOutput.appendChild(tr);
					chatMessage.value = '';
					//invitations.style.display = "none";
					//chatOutput.style.display = "block";
				}
			};
			
		if (chatMessage)
			$('#chat-message').keyup(function(e) 
			{
				if (e.which == 13) {  // detect the enter key
					postMessage.click(); // fire a sample click,  you can do anything
					chatMessage.value = '';
				}
			});
			
			viewInvites.onclick = function() {
				
					divViewInvitation.style.display = "block";
					divViewChat.style.display = "none";
					viewInvites.style.outline = "";
				
			};
			viewChat.onclick = function() {
				
					divViewInvitation.style.display = "none";
					divViewChat.style.display = "block";
				
			};

		hideUnnecessaryChatStuff();
}


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





function generateChatToken()
{
	uniqueChatToken =  "private-" + ("" + 1e10).replace(/[018]/g, function (a) {
            return (a ^ Math.random() * 16 >> a / 4).toString(16);
			});	
	
	//prompt("",uniqueChatToken);
	updateChatToken();
}

function buttonClick(e)
{
//	alert(e.target.id); 
	
	var thenum = e.target.id.replace( /^\D+/g, '');
//	alert(thenum);
	 
	var msg = acceptArray[parseInt(thenum)]
//	alert( msg );
	hangoutUI.send(msg);
	
	var button = document.getElementById(e.target.id);
	button.disabled = true;
	button.value = "Accepted!";
}

function updateChatToken()
{
	var eventId = $.QueryString["eventId"];	
	$.get( "db/insert.php?mode=insertChatBroadcastToken&eventId="+eventId+"&token="+uniqueChatToken, {   },
				function( data )
				{							
				})
				.done(function() 
				{
						
				})
				.fail(function() 
				{
					
				})
				.always(function() 
				{										
				});	
}
