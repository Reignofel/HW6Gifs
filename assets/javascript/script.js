
var KEY = "&api_key=" + "dc6zaTOxFJmzC";


var APIURL = "https://api.giphy.com/v1/gifs/search?q=";


var topics = ["Superman","Wonder Woman","Flash","Green Lantern","Martian Manhunter","Batman", ];


$(document).ready(function(){

	//displays buttons in topics array when page loads.
	displayButtons();

	
	//Event handler for 'submit' button.
	$("#submit-button").on("click", function(event){
		
		
		event.preventDefault();
		 
		
		var newHero = $("#input-box").val();		
		 
		 
		if (newHero !== "") 	 
		{
			topics.push(newHero);

		 	displayButtons();
		}
		 	
		
		$("form")[0].reset();	
		
	});

		

	
	//When a .topic-button is clicked displayGifs if called,
	$("#buttons-div").on("click",".topic-button", function(){

		displayGifs($(this).attr("search-string"));
	});


	
	$("#gifs-div").on("click",".gif-img", function(){
		
		 
		if(($(this).attr("animation"))=="false")
		{

			$(this).attr("src",$(this).attr("animated-src"));
		 	$(this).attr("animation", "true");
		}
		
		else
		 { 	
		 	$(this).attr("src", $(this).attr("still-src"));
		 	$(this).attr("animation", "false");
		 }
	});
	
});




//Creates a button for each element in 'topics' array
//appending them to #buttons-div.
function displayButtons()
{
	
	$("#buttons-div").empty();
	
	//Loop for each element 
	topics.forEach(function(element){
		
		
		var newButton = $("<button>");		

		
		var searchString = element.trim().replace(" ", "+");
		
		
		newButton.attr("search-string", searchString );
		
		
		newButton.addClass("topic-button btn-lg");
		newButton.html(element);
		
		
		$("#buttons-div").append(newButton);
	});

}




//Using Giphy API queries Giphy for data on searchTerm.
function displayGifs(searchTerm)
{
	//'Clears out' div
	$("#gifs-div").empty();
	
	var queryURL = APIURL + searchTerm + "&limit=10" + KEY;

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) 
    {
    	
    	response.data.forEach(function(element){

    		
    		var newDiv = $("<div>");
    		newDiv.addClass("thumbnail");

    		
    		var gifImage = $("<img>");
    		gifImage.addClass("gif-img");
    		
    		
    		gifImage.attr("animation", "false" );

    		 
    		gifImage.attr("alt", "giphy-gif" );

    	
    		gifImage.attr("animated-src", element.images.fixed_height_small.url );
    		
    		
    		gifImage.attr("still-src", element.images.fixed_height_small_still.url );

    		 
    		gifImage.attr("src", element.images.fixed_height_small_still.url);
    		
    		
    		var rating = $("<h4>");
    		rating.html("Rated: " + element.rating.toUpperCase()); 
    		
    		
    		
    		newDiv.append(gifImage);
    		newDiv.append(rating);

    		
    		$("#gifs-div").append(newDiv);
    		
    	});

   });

}