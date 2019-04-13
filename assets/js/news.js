$('#news-search').on('click', function() {
$(".news-item").remove()
var newsInput = $('#news-query-input').val();
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
            
            var newCard = $('<div>')
            newCard.attr('class', 'card news-item')

            var cardPicHolder = $('<div>')
            cardPicHolder.attr('class', 'card-image')
            var cardPic = $('<img>')
            cardPic.attr('src', result.articles[i].urlToImage)
            cardPic.attr('class' , 'card-image')
            cardPic.appendTo(cardPicHolder)
            cardPicHolder.appendTo(newCard)

            var cardBody = $('<div>')
            cardBody.attr('class', 'card-content')
            cardBody.append('<h5>' + result.articles[i].title + '</h5>')
            cardBody.append('<p>' + result.articles[i].source.name + '</p>')
            cardBody.appendTo(newCard)

            var cardLinks = $('<div>')
            cardLinks.attr('class' , 'card-action')
            var newsLink = $('<a>')
            newsLink.attr('src', result.articles[i].url)
            newsLink.text('Check it out!')
            newsLink.appendTo(cardLinks)
            cardLinks.appendTo(newCard)

            var cardColumn = $('<div>')
            cardColumn.attr('class' , 'col s3')
            newCard.appendTo(cardColumn);
            cardColumn.appendTo($('#news-item-box'));
            
            if (i % 4 === 0) {
                $('#news-item-box').removeAttr('id')
                var newRow = $('<div>')
                newRow.attr('class', 'row')
                newRow.attr('id', 'news-item-box')
                newRow.appendTo($('.container'))
            }
        }
    })
    
})