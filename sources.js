var apiKeyGeneral = "&apiKey=f6326f6bd2604103aee4fff4794335d3"; // api key from new API
var url1 =  "https://newsapi.org/v1/articles?source=";
var source = "breitbart-news";
var url2 = "&sortBy=";
var sortBy = "top";

var nyTimesAPIKey = "067c6a7b804c41b78b2284d7c2373854";
//var waterlooURL = "http://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo";

var databases =
    {
        general: {
            (function () {
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
            })()
        },

    }