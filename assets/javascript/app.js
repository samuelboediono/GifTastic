var animals = ["Tiger", "Dog", "Cat", "Horse", "Rabbit", "Hermit Crab", "Snake", "Cat", "Lizard", "Dolphin", "Dinosaur", "Frog", "Monkey", "Porcupine", "Turtle"];

var renderButton = function() {
	for (var i = 0; i < animals.length; i++) {
		var twoButton = animals[i].split(" ").join("+");
		var button = $("<button data-animal=" + twoButton + ">").append(animals[i]);
		button.addClass("button");
		$("#animalButtons").append(button);
	}

	$("#addAnimal").on("click", function() {
		$("#animalButtons").empty();

		var newAnimal = $("#animal-input").val().trim();

		for (i = 0; i < animals.length; i++) {
			if (newAnimal == animals[i]) {
				animals.pop(newAnimal);
			}
		}

		animals.push(newAnimal);
		renderButton();
	});

	$("button").on("click", function() {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	console.log(response);

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		var animalDiv = $("<div>");
        		var p = $("<p>").text("Rating: " + results[i].rating);

        		var animalImage = $("<img>");
        		

        		animalImage.attr("src", results[i].images.fixed_height_still.url);
        		animalImage.attr("data-state", "still")
        		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        		animalImage.attr("data-animate", results[i].images.fixed_height.url);

        	

        		animalDiv.prepend(p);
        		animalDiv.append(animalImage);
        		$("#being").prepend(animalDiv);
        	}

        });

	});

	$(document).on("click","img", function() {
       	var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
        }
        else {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "still");
        }
    });
}
		

renderButton();






