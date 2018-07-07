var animals = [
    "dog",
    "cat",
    "mouse",
    "goat",
    "girafe",
    "cow",
    "snake",
    "pig",
    "horse",
    "lion"
]
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#animalButtons").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie to our button
      a.addClass("animal");
      // Adding a data-attribute
      a.attr("data-name", animals[i]);
      // Providing the initial button text
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#animalButtons").append(a);
    //   getGiphy(animals[i]);
    }
}

// Put the buttons from our list on the screen
renderButtons();

$(document).ready(function() {
    $("#addAnimal").click(function(event) {
        event.preventDefault();
        console.log("going to add animal: " + $("#animal-input").val());
        animals.push($("#animal-input").val());
        renderButtons();
    });
});

$(document).on("click", ".animal", function(event) {
    event.preventDefault();
    $("#animals").empty();
    console.log("going to get buttons data-name: " + $(this).attr("data-name"));
    getGiphy($(this).attr("data-name"));
});

// add click events for the dynamically generated buttons surrounding our giphy images
$(document).on("click", ".imageButton", function() {
    console.log("going to swap: " + $(this).children("img").attr("alt_src"));
    var alt = $(this).children("img").attr("alt_src");
    $(this).children("img").attr("alt_src", $(this).children("img").attr("src"));
    $(this).children("img").attr("src", alt);
    // console.log("going to swap: " + $(this).attr("alt_src"));
});


function getGiphy(queryParm) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1XrIUaV8UE1LKMPatvKuDapUlCjKsQ2L&q=" + 
                    queryParm +  "&limit=10&offset=0&lang=en";
    console.log("the giphy queryURL is: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var colCount = 0;
        console.log(response);
        console.log("for: " + queryParm + " going to show: " + response.data[0].images.fixed_height_small_still.url);

        var divRow = new $("<div>");       
        divRow.addClass("row");
        for (i = 0; i < 10; i++) {
            var divColumn = new $("<div>");
            divColumn.addClass("column");
            divColumn.text("Rating: " + response.data[i].rating);
            var btn = $("<button>");
            btn.addClass("imageButton");
            var pic = $("<img>");
            pic.attr("src", response.data[i].images.fixed_height_still.url);
            pic.attr("alt_src", response.data[i].images.fixed_height.url);
            btn.append(pic);
            divColumn.append(btn);
            if (i > 0 && i % 3 === 0) {   
                $("#animals").append(divRow);
                divRow = new $("<div>");
                divRow.addClass("row");
            }
            divRow.append(divColumn);              
        }
        $("#animals").append(divRow);
    });

    
}