var colorList = ["Red", "Blue", "Green", "Yellow", "Gray"];

var srcIMGAnim = [];
var srcIMGStill = [];

$(document).ready(function () {

    function makeButtons(array) {

        $.each(array, function (x, thisColor) {

            var colorButton = $("<button>");

            var buttonBGColor = 'background-color: ' + thisColor + ';';

            colorButton.attr({
                id: thisColor,
                class: "searchColor",
                value: thisColor,
                style: buttonBGColor
            });

            colorButton.append(thisColor);

            $("#colorButtons").append(colorButton);

        });
    };

    makeButtons(colorList);

    $("#colorForm").submit(function (event) {
        event.preventDefault();

        var colorInputted = [];
        colorInputted.push($("#colorInput").val().trim());

        makeButtons(colorInputted);

        $("#colorInput").val("");
    });

    $("#colorButtons").on("click", ".searchColor", function () {

        var colorNow = this.id;

        srcIMGAnim = [];
        srcIMGStill = [];

        var rating = "pg";
        var limit = 10;

        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + colorNow + "&rating=" + rating + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: searchURL,
            method: "GET"
        }).done(function(whatImGettingBack){

            $("#colorImages").text("");

            colorImgArray = whatImGettingBack.data;

            $.each(colorImgArray, function (i) {

                rating = whatImGettingBack.data[i].rating;
                var thisImg = whatImGettingBack.data[i].images.original_still.url;

                srcIMGStill.push(thisImg);
                srcIMGAnim.push(whatImGettingBack.data[i].images.original.url);

                var containerForAll = $("<div>");
                $(containerForAll).attr("class", "imgContainer");

                var htmlForRating = $("<figcaption>");
                $(htmlForRating).append("Rating: " + rating);

                var htmlForImage = $("<img>");
                $(htmlForImage).attr({
                    id: "image" + i,
                    src: thisImg
                });

                $(containerForAll).append(htmlForRating);
                $(containerForAll).append(htmlForImage);

                $("#colorImages").append(containerForAll);

            });

            $("img").on("click", function () {

                var srcOfClickedImage = $(this).attr("src");

                var switchToAnim = -1;
                var switchToStill = -1;

                $.each(srcIMGStill, function (i) {

                    if (srcOfClickedImage === srcIMGStill[i]){
                        switchToAnim = i;
                    };

                    if (srcOfClickedImage === srcIMGAnim[i]){
                        switchToStill = i;
                    };


                }); 

                if (switchToAnim != -1) {
                    $(this).attr("src", srcIMGAnim[switchToAnim]);
                };

                if (switchToStill != -1){
                    $(this).attr("src", srcIMGStill[switchToStill]);
                };

            });

        }); 

    }); 

});