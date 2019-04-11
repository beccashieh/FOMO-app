$(document).on("click", "#submit", function () {
    var category = $("#category-input").val().trim();
    var queryURL = "https://api.bestbuy.com/v1/products/8896132.json" + category + "&api_key=hYVzWFxgcZXGXyaLwQA8BPbb";
    console.log(queryURL);
 
        
        //Ajax function to pull the results from the Best Buy API
        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            var results = response.data;//shows the results 
            console.log("results = " + results);
            if (results == "") {
                alert("There are no products available for this category.");
            }
            // for (var i = 0; i < results.length; i++) {
            //     //div to hold result cards
            //     var products = $("<div>");
            //     products.addClass("results-content");
            //     //holds the image of each gif.
            //     var productImage = $("<img>");
            //     var imageURL = results[i].images.fixed_height_still.url;
                
            //     productImage.attr("src", imageURL);
            //     productImage.attr("data-still", imageURL);
            //     productImage.addClass("img");
            //     products.append(productImage);
            // }

        })
    });

