// my Giphy apikey
APIkey = "JEQRWYkn0ysqEkhzBMqjcxtJrby79JZF"

// topic array / animals is the theme
let animals = ["rabbit", "capybara", "squirrel", "yorkies", "cat", "buffalo", "meerkat", "bear", "eagle", "kangaroo", "panda",
    "sloth", "honeybadger", "cougar", "lemur", "ostrich", "hyena",]

function displayAnimalGifs() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10" + "&api_key=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#gifs-view").empty();
        for (let i = 0; i < 10; i++) {
            var gifDiv = $("<div>")

            // store rating for gif
            var rating = response.data[i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // create imgage tag
            var gif = $("<img class='gif-image'>")

            var gifURL = response.data[i].images.fixed_height_still.url;
            var gifUrlAnimate = response.data[i].images.fixed_height.url;

            gif.attr("src", gifURL);
            gif.attr("still", gifURL);
            gif.attr("animated", gifUrlAnimate);
            gif.attr("state", "still");
            
            // append rating and gif image into gifDiv
            gifDiv.append(p);
            gifDiv.append(gif);

            // Insert current gifDiv on #view-gifs
            $("#gifs-view").append(gifDiv);

        }

    })
}

//function to Create buttons for all strings in animals array
function renderButtons() {
    $("#buttons-view").empty();

    for (let i = 0; i < animals.length; i++) {

        var btn = $("<button>");
        btn.addClass("animal");
        btn.attr("data-name", animals[i]);
        btn.text(animals[i]);

        $("#buttons-view").append(btn);

    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding the animal from the textbox to our array
    animals.push(animal);
    console.log(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});

renderButtons();
$(document).on("click", ".animal", displayAnimalGifs);


$(document).on("click", ".gif-image", function () {
    var giphyStill = $(this).attr("still")
    var giphyAnimated = $(this).attr("animated")
    var state = $(this).attr("state")

    if (state === "still") {
        $(this).attr('src', giphyAnimated)
        $(this).attr('state', 'animated')
    } else {
        $(this).attr('src', giphyStill)
        $(this).attr('state', 'still')
    }
    console.log(giphyAnimated);
    console.log(giphyStill);
});

