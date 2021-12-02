function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let type_array = [];
	let freq_array = [];
	let weekday_count = 0;
	let weekend_count = 0;
	for (let i = 0; i < tweet_array.length; i++){
		if((tweet_array[i].activityType) !== "unknown") {
			if (type_array.indexOf((tweet_array[i].activityType)) !== -1)
				freq_array[type_array.indexOf(tweet_array[i].activityType)] += 1;
			else {
				type_array.push(tweet_array[i].activityType);
				freq_array.push(1);
			}
		}
	}
	let temp = [];
	for(let i = 0; i < freq_array.length; i++)
		temp.push(freq_array[i]);

	temp.sort(function(a,b){return b-a});
	let top1 = type_array[freq_array.indexOf(temp[0])];
	let top2 = type_array[freq_array.indexOf(temp[1])];
	let top3 = type_array[freq_array.indexOf(temp[2])];

	//Jquery - type of activities
	$('#numberActivities').text(type_array.length);
	//most activities
	$('#firstMost').text(top1);
	$('#secondMost').text(top2);
	$('#thirdMost').text(top3);

	//longest activities
	$('#longestActivityType').text(type_array[freq_array.indexOf(freq_array[0])]);
	//shortest
	$('#shortestActivityType').text(type_array[freq_array.indexOf(freq_array[freq_array.length - 1])]);
	//weekday or weekends

	for(let i = 0; i < tweet_array.length; i++)
	{
		if(tweet_array[i].activityType === top1) {
			if((tweet_array[i].time.getDay() === 6) || (tweet_array[i].time.getDay() === 0))
				weekend_count += 1;
			else weekday_count += 1;
		}
	}

	if(weekday_count > weekend_count) {
		$('#weekdayOrWeekendLonger').text("weekdays");
	}
	else $('#weekdayOrWeekendLonger').text("weekends");

	let activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 600,
		"data": {
			"values": [{"type of activity": "run", "number of tweets": freq_array[type_array.indexOf("run")]},
				{"type of activity": "walk", "number of tweets": freq_array[type_array.indexOf("walk")]},
				{"type of activity": "elliptical", "number of tweets": freq_array[type_array.indexOf("elliptical")]},
				{"type of activity": "bike", "number of tweets": freq_array[type_array.indexOf("bike")]},
				{"type of activity": "swim", "number of tweets": freq_array[type_array.indexOf("swim")]},
				{"type of activity": "activity", "number of tweets": freq_array[type_array.indexOf("activity")]},
				{"type of activity": "row", "number of tweets": freq_array[type_array.indexOf("row")]},
				{"type of activity": "MySports", "number of tweets": freq_array[type_array.indexOf("MySports")]},
				{"type of activity": "mtn", "number of tweets": freq_array[type_array.indexOf("mtn")]},
				{"type of activity": "hike", "number of tweets": freq_array[type_array.indexOf("hike")]},
				{"type of activity": "ski", "number of tweets": freq_array[type_array.indexOf("ski")]},
				{"type of activity": "chair", "number of tweets": freq_array[type_array.indexOf("chair")]},
				{"type of activity": "nordic", "number of tweets": freq_array[type_array.indexOf("nordic")]},
				{"type of activity": "skate", "number of tweets": freq_array[type_array.indexOf("skate")]},
				{"type of activity": "snowboard", "number of tweets": freq_array[type_array.indexOf("snowboard")]},
				{"type of activity": "circuit", "number of tweets": freq_array[type_array.indexOf("circuit")]}]
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding": {
			"x": {"field": "type of activity", "type": "nominal", "axis": {"labelAngle": 0}},
			"y": {"field": "number of tweets", "type": "quantitative"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	let values = [];
	for(let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].activityType === top1) //run
		{
			let top1_dic = {time: tweet_array[i].time.toLocaleString('en-us', {  weekday: 'short' })//Sat
				, distance: tweet_array[i].distance , type: top1}; // ?.?? mi
			values.push(top1_dic);
		}
		else if (tweet_array[i].activityType === top2) //walk
		{
			let top2_dic = {time: tweet_array[i].time.toLocaleString('en-us', {  weekday: 'short' })//Sat
				, distance: tweet_array[i].distance, type: top2}; // ?.?? mi
			values.push(top2_dic);
		}
		else if (tweet_array[i].activityType === top3) //bike
		{
			let top3_dic = {time: tweet_array[i].time.toLocaleString('en-us', {  weekday: 'short' })//Sat
				, distance: tweet_array[i].distance , type: top3}; // ?.?? mi
			values.push(top3_dic);
		}
	}

		let distance_vis_spec = {
			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
			"description": "A plot of the distances by day of the week for all of the three most tweeted-about activities. " +
				"Day of the week should be encoded on the x-axis, distance on the y-axis, and activity type by color. ",
			"width": 400,
			"data": {
				"values": values
			},

			//TODO: Add mark and encoding
			"mark": "point",
			"encoding": {
				"x": {"field": "time", "type": "ordinal", "TimeUnit": "day"},
				"y": {"field": "distance", "type": "quantitative"},
				"color": {"field": "type", "type": "nominal"}
			}
		};

		let distanceVisAggregated_vis_spec = {
			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
			"description": "A plot of the distances by day of the week for all of the three most tweeted-about activities, aggregating the activities by the mean. ",
			"width": 400,
			"data": {
				"values": values
			},

			//TODO: Add mark and encoding
			"mark": "point",
			"encoding": {
				"x": {"field": "time", "type": "ordinal", "TimeUnit": "day"},
				"y": {"aggregate": "mean", "field": "distance", "type": "quantitative"},
				"color": {"field": "type", "type": "nominal"}
			}
		};

	$("#aggregate").click(function () {
		let button = document.getElementById("aggregate");
		if (button.innerText === "Show means") {
			button.innerText = "Show all activities";
			vegaEmbed('#distanceVisAggregated', distanceVisAggregated_vis_spec, {actions: false});
		} else {
			button.innerText = "Show means";
			vegaEmbed('#distanceVis', distance_vis_spec, {actions: false});
		}
	});
}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});