var comments = [];
var comment;
var html = '';


$(document).ready(function(){
    $("button").click(function(){
        var postdate = Date.now();//time that comment is created      
       comment = {user:$(".username").val(), text:$(".user-comment").val(), postdate:postdate}; //create comment object
       comments.push(comment);//add object to array
       html = '';
        //clear form entries
       $(".username").val('');     
       $(".user-comment").val('');   

       for(var i =0;i<comments.length;i++)
       {
             var timeSincePost = (Date.now() -comments[i].postdate)/1000; //get time passed in seconds
            var timeMsg = '';
            if(timeSincePost<60)
            {
                timeMsg = "posted 48s ago";
            }
            else if(timeSincePost<3600)
            {
                var timeInMinutes = Math.round(timeSincePost/60); //time  in minutes
                timeMsg = "posted "+timeInMinutes+"m ago";
            }
            else if(timeSincePost>3600)
            {
                var timeInHours = Math.round((timeSincePost/60)/60); //time in hours
                timeMsg = "posted"+timeInHours+"h ago";
            }
           html+='<div class = "bg-secondary"><h5>@'+ comments[i].user+' said</h5><p>'+comments[i].text+'</p><p>'+timeMsg+'</p></div>';
           $(".comments").html(html);
       }
    });

});