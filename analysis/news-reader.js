
var apiKey = "&apiKey=f6326f6bd2604103aee4fff4794335d3"; // api key from new API
var url1 =  "https://newsapi.org/v1/articles?source=";
var source = "breitbart-news";
var url2 = "&sortBy=";
var sortBy = "top";

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
var nyTimesAPIKey = "067c6a7b804c41b78b2284d7c2373854";

var waterlooURL = "http://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo";

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

var requestedSource = "Engadget";
var sortSelection = "top";
var numArticles = 3;

var newsStationsList = [];

for (var i = 0; i < databases.sources.length; i++) {
    newsStationsList.push(databases.sources[i].name);
}

var reqSrcUrl = databases.sources[newsStationsList.indexOf(requestedSource)].id;


var tempArticles = ((function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url1 + reqSrcUrl + url2 + sortSelection + apiKey,
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
console.log(chosenArticles);
var voiceOutputString = "To start, " + chosenArticles[0].description + "Moreover, " + chosenArticles[1].description
                        + "Lastly, " + chosenArticles [2].description;
