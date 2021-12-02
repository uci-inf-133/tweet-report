function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	//Part 1: Summarizing Tweets
	//Tweet Dates and update spans
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	//earliest
	document.getElementById('firstDate').innerText =
		tweet_array[tweet_array.length - 1].time.toLocaleDateString("en-US",options);
	//latest
	document.getElementById('lastDate').innerText =
		tweet_array[0].time.toLocaleDateString("en-US",options);

	let l_count = 0;
	let a_count = 0;
	let c_count = 0;
	let m_count = 0;
	let w_count = 0;

	for (let i = 0; i < tweet_array.length; i++)
	{
		if(tweet_array[i].source === "live_event")
			l_count += 1;
		if(tweet_array[i].source === "completed_event") {
			c_count += 1;
			if (tweet_array[i].written === true) {
				w_count += 1;
			}
		}
		if(tweet_array[i].source === "achievement")
			a_count += 1;
		if(tweet_array[i].source === "miscellaneous")
			m_count += 1;
	}
	//completed
	document.getElementsByClassName("completedEvents")[0].textContent = c_count;
	document.getElementsByClassName("completedEvents")[1].textContent = c_count;
	document.getElementsByClassName("completedEventsPct")[0].textContent
		= math.format((c_count/tweet_array.length * 100),{notation: 'fixed', precision: 2}) + '%';
	//live
	document.getElementsByClassName("liveEvents")[0].textContent = l_count;
	document.getElementsByClassName("liveEventsPct")[0].textContent
		= math.format((l_count/tweet_array.length)* 100,{notation: 'fixed', precision: 2}) + '%';
	//achieve
	document.getElementsByClassName("achievements")[0].textContent = a_count;
	document.getElementsByClassName("achievementsPct")[0].textContent
		= math.format((a_count/tweet_array.length)* 100,{notation: 'fixed', precision: 2}) + '%';
	//miscellaneous
	document.getElementsByClassName("miscellaneous")[0].textContent = m_count;
	document.getElementsByClassName("miscellaneousPct")[0].textContent
		= math.format((m_count/tweet_array.length)* 100,{notation: 'fixed', precision: 2}) + '%';

	//user-written text (25%)
	document.getElementsByClassName("written")[0].textContent = w_count;
	document.getElementsByClassName("writtenPct")[0].textContent
	 =math.format((w_count/c_count) * 100,{notation: 'fixed', precision: 2}) + '%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});