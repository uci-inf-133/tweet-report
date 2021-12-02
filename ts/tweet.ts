class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        //completed - where the person is Tweeting an activity they recently finished.
        if(this.text.startsWith("Just completed") || this.text.includes("Just posted"))
            return "completed_event";
        //live - where the person is Tweeting that they are currently doing an activity.
        else if(this.text.startsWith("Watch"))
            return "live_event";
        //achievement - where the person is indicating an achievement they have reached or a goal they have set.
        else if(this.text.includes("Achieved"))
            return "achievement";
        //miscellaneous - for all RunKeeper-related discussion which did not involve posting about an activity.
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        let s = this.text;
            s = s.replace('#Runkeeper', '');
            s = s.replace(/(https):[.[a-zA-Z0-9/-]+/, '');
            return (s.includes("-"));
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        let wText = this.text.substring(this.text.indexOf('-'),this.text.indexOf('https'));
        return wText;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        //search first - numbers with dot
        let s = this.text;
        if(s.search(/[0-9]+[.][0-9]+/) !== -1) {
            let idx1 = s.search(/\d/);
            let idx2 = idx1 + s.substring(idx1).search(' ');
            let idx3 = idx2 + s.substring(idx2 + 1).search(' ') + 1;
            let idx4 = idx3 + s.substring(idx3 + 1).search(' ') + 1;
            return s.substring(idx3 + 1, idx4);
        }
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        let d = this.text;
        let idx1 = d.search(/\d/);
        let idx2 = idx1 + d.substring(idx1).search(' ');
        let idx3 = idx2 + d.substring(idx2+1).search(' ') + 1;
        let distance = parseInt(d.substring(idx1, idx2),10);
        //1 mi = 1.609 km
        let dType = d.substring(idx2 + 1, idx3);
        //change km to mi
        return (dType === 'km' ? distance * 1.609 : distance);
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let links = this.text.substring(this.text.indexOf('https'),this.text.indexOf('#'));
        return "<tr></tr>";
    }
}