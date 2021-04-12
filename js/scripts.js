
//  group of functions for carousel
$(document).ready(function () {
    //it will set the time interval to 2 sec
    $("#mycarousel").carousel({ interval: 2000 });
    //for pause btn - it will pause the carousel
    $("#carouselButton").click(function () {
        //this will check that if the carouselButton has a children span which contans fa-pause
        if ($("#carouselButton").children("span").hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            // this will remove the pause button
            $("#carouselButton").children("span").removeClass('fa-pause');
            //this will add the play button
            $("#carouselButton").children("span").addClass('fa-play');
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')) {
            $("#mycarousel").carousel('cycle');
            // this will remove the pause button
            $("#carouselButton").children("span").removeClass('fa-play');
            //this will add the play button
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });
});

//   Week4 Assignment Task2
//when reserve-button is clicked this function willbe called
$('#reserve-button').click(function () {
    // reserveformModal will be displayed on the screen
    $('#reserveformModal').modal('toggle');
});
//   Week4 Assignment Task3
//when login-Btn is clicked this function willbe called
$('#login-Btn').click(function () {
    // loginModal will be displayed on the screen
    $('#loginModal').modal('toggle');
});
