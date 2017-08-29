function MessageHandler(context, event) {

                var str = event.message;
                var pattern1 =/icount/i;
                var istring = pattern1.test(event.message);

                var pattern2 =/tcount/i;
                var tstring = pattern2.test(event.message);

                if (istring === true){
                'use strict';
                //var msg = event.message;
                var regout = str.replace("icount ","");
                context.simpledb.botleveldata.messages = regout;
                var url = "https://api.instagram.com/v1/users/search?q={"+regout+"}&access_token=[TOKEN_HERE]";
                var header = {"Content-Type": "application/json"};
                context.simplehttp.makeGet(url,header,parser1);
                }

                else if (tstring === true){
                'use strict';
                var regout2 = str.replace("tcount ","");
                context.simpledb.botleveldata.messages = regout2;
                var url2 = "http://api.twittercounter.com/?apikey=[KEY_HERE]&username="+regout2;
                var header2 = {"Content-Type":"application/json"};
                context.simplehttp.makeGet(url2,header2,parser3);
                }

                else if (str.toLowerCase() == '/start'){
                    context.sendResponse("Hello User! I am CounterBot. " + "\n\n#1 To count the number of followers type icount followed with username of the instagram account."+"\n  Example: icount bravo.rutul"
                    +"\n\n#2 To count the number of followers on Twitter type tcount followed with username of the twitter account. "+"\n   Example: tcount BravoRutul");
                }
                else if (str.toLowerCase() == 'help'){
                     context.sendResponse("#1 To count the number of followers type icount followed with username of the instagram account."+"\n  Example: icount bravo.rutul"
                    +"\n\n#2 To count the number of followers on Twitter type tcount followed with username of the twitter account. "+"\n   Example: tcount BravoRutul");
                }
                else if(str.toLowerCase() == 'hi'){
                    context.sendResponse("Hello User !");
                }

                else{
                    context.sendResponse("No keyword found :" +event.message+ "\nType help for documentation");
                }
}


function parser1(context,event){
           var objJson = JSON.parse(event.getresp);
           var user = objJson.data["0"];
           var name_db = context.simpledb.botleveldata.messages;
           if(user.username == name_db){
           var userid = user.id;
           var url ="https://api.instagram.com/v1/users/"+userid+"/?access_token=[TOKEN_HERE]"
           var header = {"Content-Type": "application/json"};
           context.simplehttp.makeGet(url,header,parser2);
           }
           else{
               context.sendResponse("No user");
           }
}

function parser2(context,event){
         var objJson =JSON.parse(event.getresp);
         var followers = objJson.data.counts.followed_by;
         context.sendResponse("Instagram Followers : " +followers);
}

function parser3 (context,event){
             var objJson = JSON.parse(event.getresp);
             var string = objJson.username;
             var followers = objJson.followers_current;
             var uname = context.simpledb.botleveldata.messages;
             if(string == uname){
                 context.sendResponse("Twitter Followers : "+followers);
             }
             else{
                 context.sendResponse("No user found");
             }
}

function HttpResponseHandler(context, event) {

}

function EventHandler(context, event) {

}

function DbGetHandler(context, event) {
    context.sendResponse();
}

function DbPutHandler(context, event) {
    context.sendResponse();
}
