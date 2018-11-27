$(document).ready(function(){
    var totalChars = 280;
    $("#inputPost").keyup(function (event) { 
        var inputText = event.target.value;
        $("#charRemaining").html(totalChars-inputText.length);
    });

    $("#postBtn").click(function (event) { 
        var commentTxt = $('#inputPost').val();
        $.ajax({
            type: 'POST',
            url: "/postcomment/",  
            data:{'userid':"Ciano1000",'message':commentTxt},         
            success: function (data) {
                $('#inputPost').val("");
                $("#charRemaining").html(280);
                getComments();
            }
        });
        
    });

    $("#feedPosts").click(function (event) { 
        console.log(event.target.name);
        var buttonSplit = event.target.name.split(',');
        var buttonType = buttonSplit[0];
        var commentId = buttonSplit[1];

        if(buttonType == "delete")
        {
            $.ajax({
                type: 'DELETE',
                url: '/delete/'+commentId,
                success: function (result) {
                    getComments();
                }
            });
        }

        if(buttonType == "up")
        {
            $.ajax({
                type: "PATCH",
                url: "/upvote/"+commentId,
                data: {'upvotes': 1},
                dataType: "json",
                success: function (response) {
                    getComments();
                }
            });
        } 
        if(buttonType == "down")
        {
            $.ajax({
                type: "PATCH",
                url: "/downvote/"+commentId,
                data: {'downvotes': 1},
                dataType: "json",
                success: function (response) {
                    getComments();
                }
            });
        } 
        /*if(event.target.name)
        {
           
        }*/
        
    });

 

    getComments();

    function getComments(){
        $.ajax({
            type: "GET",
            url: "/getcomments/",            
            success: function (data) {
                var posts = "";
                for(var i=0;i<data.length;i++)
                {
                    posts+= "<div class='row justify-content-md-center pt4'>"+
                    "<div class='card col-md-6'> <div class='row'>"
                    + "<div class='col-md-9'>"+ data[i].message + "</div>" + "<div class='col-md-3'>" +
                    "<button type='button' id='del' name='delete," + data[i]._id + "' class='btn btn-danger delete' data-userid='"+i+"'>" +
                    "Delete</button></div></div>"+
                    "<div class='row'><div class='col-md-1'><button type='button' name='up,"
                    +data[i]._id+
                    "' data-userid='"+i+"' class='fa fa-thumbs-up btn'></button>"+
                    "</div><div class='col-md-1'><button id='down' type='button' name='down,"
                    +data[i]._id+"' data-userid='"+i+"' class='fa fa-thumbs-down btn'>"+
                    "</button></div><div class='col-md-2'><p id='votes'>+"+data[i].upvotes+" -"+data[i].downvotes+"</p>"+
                    "</div></div></div></div>";                  
                }
                $("#feedPosts").html(posts);
            }
        });
        setTimeout(10000);
    }
});

