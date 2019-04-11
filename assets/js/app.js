

$('#news-search').on('click', function() {
$(".news-item").remove()
var newsInput = $('#news-query-input').val();
console.log(newsInput)
var searchURL = 'https://newsapi.org/v2/everything?' +
'q=' + newsInput +
'&apiKey=4d40ce544309489b9dd043dfac1e6abf'
    $.ajax({
        url: searchURL,
        method: 'GET'
    }).then(function (result) {
        
        console.log(searchURL)
        console.log(result)
        for (var i = 0; i < result.articles.length; i++) {
            var cardColumn = $('<div>')
            cardColumn.attr('class' , 'col-3')
            var newCard = $('<div>')
            newCard.attr('class', 'card news-item')
            var cardBody = $('<div>')
            var cardPic = $('<img>')

            cardBody.attr('class', 'card-body')
            cardBody.append('<h5>' + result.articles[i].title + '</h5>')
            cardBody.append('<p>' + result.articles[i].source.name + '</p>')
            cardBody.appendTo(newCard)

            cardPic.attr('src', result.articles[i].urlToImage)
            cardPic.css('height', '200px')
            cardPic.prependTo(newCard)

            newCard.appendTo(cardColumn);
            cardColumn.appendTo($('#news-item-box'));


        }
    })
    
})