var apiKeyGeneral = "&apiKey=f6326f6bd2604103aee4fff4794335d3"; // api key from new API
var url1 =  "https://newsapi.org/v1/articles?source=";
var source = "breitbart-news";
var url2 = "&sortBy=";
var sortBy = "top";

var nyTimesAPIKey = "067c6a7b804c41b78b2284d7c2373854";

/*$.getJSON(url1 + source + url2 + sortBy + apiKey , function(obj) {

 console.log(obj);

 $.each(obj, function(key,value) {
 $("ul").append("<li>" + value.articles[0].author + "<li>")
 })

 }) */





        // var sources =  $.ajax({
        //     url: url1 + source + url2 + sortBy + apiKey,
        //     dataType: "json",
        //     type: "get",
        //     cache: false,
        //     success: function (data) {
        //         JSON.parse(data);
        //         return data;
        //     }
        //
        //
        // }).responseJSON;

// var sources;
// $.getJSON(url1 + source + url2 + sortBy + apiKey, function(json) {
//     sources = json;
//     console.log(json);
// });
//
// console.log(sources);


// var waterlooData = (function () {
//     var xml = null;
//     $.ajax({
//         'url': waterlooURL,
//         'dataType': 'xml',
//         'global': false,
//         'async': false,
//         'success': function(data) {
//             xml = data;
//             console.log(data);
//         },
//         'error': function() {
//             console.log("ERRORRR");
//         }
//
//     })
//     return xml;
// })();

// var xmlHttpRequest = new XMLHttpRequest();
// xmlHttpRequest.open("GET",waterlooURL,true);
// console.log(xmlHttpRequest);
// var xmlDoc = new ActiveXObject('Microsoft.XLMDOM');
// xmlDoc.load(waterlooURL);
// console.log(xmlDoc);


//IMPORTS
var databases = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "https://newsapi.org/v1/sources",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

//     Local

var x = new XMLHttpRequest();
x.open("GET","http://kitchener.ctvnews.ca/rss/ctv-news-kitchener-1.822359",true);
x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200)
    {
        var doc = x.responseXML;
        // …
    }
};
x.send(null);

//console.log(doc.getElementsByTagName("channel")[0].getElementsByTagName("title")[0].firstChild.nodeValue);

// END OF IMPORTS


//comes from user query, all subject to change

var sortIndicationLatest = ["latest","lately","recent","newest","new","breaking"];
var sortIndicationPopular = ["popular", "top", "trending", "hottest"];

var query = "Show me whats going on through BBC lately, technology and sports";
var foundCategoryRelations = [];
var foundStationRelations = [];

var commonIrrelevantWords = ["the", "to", "he", "me", "with","give", "and"];




var newsStationsList = [];

//change to firebase
//var categories = ["general", "technology","sport","business","politics","entertainment","gaming","music","science-and-nature"];
var categories = [];

//Pulling current categories on
headingReference.on('value', function(dataSnap) {
    localData.forEach((data) => {
        categories.push(data.key);
    });
});

console.log(categories);


for (var i = 0; i < databases.sources.length; i++) {
    newsStationsList.push(databases.sources[i].name);
}

var queryArr = query.toLowerCase().split(" ");
for (var j = 0; j < queryArr.length; j++) {
    for (var k = 0; k < categories.length; k++) {
        if (queryArr[j] == categories[k]) {
            foundCategoryRelations.push(queryArr[j]);
        }
    }
    for (var k = 0; k < newsStationsList.length; k++) {
        var currStationCatArr = newsStationsList[k].toLowerCase().split(" ");
        for (var l = 0; l < currStationCatArr.length; l++) {
            if (queryArr[j] == currStationCatArr[l]) {
                foundStationRelations.push(queryArr[j]);
            }
        }
    }
}
// now we have a relationship between the categories

console.log(foundCategoryRelations);
console.log(foundStationRelations);




var requestedSources = "National Geographic";
var sortSelection = "top";
var numArticles = 5;
var maxLength = 75;



// depends on which database its in
var reqSrcUrl = databases.sources[newsStationsList.indexOf(requestedSources)].id; //firebase will decide which is chosen

var chosenSources = [];

var tempArticles = ((function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url1 + reqSrcUrl + url2 + sortSelection + apiKeyGeneral,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})())


var chosenArticles = [];
for (var i = 0; i < numArticles; i++) {
    chosenArticles.push(tempArticles.articles[i]);
}
//console.log(chosenArticles);

var outputDescriptions = [];
for (var i = 0; i < numArticles; i++) {
    var tempDesc = chosenArticles[i].description;
    if (tempDesc.length > maxLength) {
        if (tempDesc.includes(". ")) {
            if (tempDesc.indexOf(". ") + 1 >= 75) {
                tempDesc = tempDesc.slice(0, tempDesc.indexOf(". ") + 1); // cuts off unneeded descriptions
            }
        }
    }
    outputDescriptions.push(tempDesc);
}
console.log(outputDescriptions[2].length);

var transitionWords = ["In addition, ", "Furthermore, ", "Moreover, ", "Additionally, "];
var startingWords = ["To start, ", "Well, ", "To begin, "];
var endingWords = ["Lastly, ", "Also, ", "To end off, ", "Finally, "];

var voiceOutputString = "To start, " + outputDescriptions[0] + "Moreover, " + outputDescriptions[1]
                        + "Lastly, " + outputDescriptions[2];
