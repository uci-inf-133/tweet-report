function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	let tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	let written_count = 0;
	let table = [];
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].written === true) {
			let dic = {number: ++written_count, Activity_type: tweet_array[i].activityType, Tweet: tweet_array[i].text};
			table.push(dic);
		}
	}
	let search_count = 0;
	window.onkeyup = keyup;
	function keyup(e) {
		let input = e.target.value;
		document.getElementById("searchText").innerText = input;

		for (let i = 0; i < tweet_array.length; i++) {
			if (tweet_array[i].written === true) {
				console.log(search_count);
				if(tweet_array[i].text.includes(input))
					search_count += 1;
				console.log(search_count);
			}
		}
		document.getElementById("searchCount").innerText = search_count;
		search_count = 0;
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var z = document.createElement("TD");
	var t = document.createTextNode("1");
	z.appendChild(t);
	document.getElementById("tweetTable").appendChild(z);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});