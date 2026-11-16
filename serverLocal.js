const { token, guildId, eventGeneralId } = require('./config.json');
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/createEvent', async (req, res) => {
    // res.send('Creating Event' + JSON.stringify(req.query));


    if (
        true
    ) {
        // const eventData = {
        //     name: req.query.name,
        //     privacy_level: req.query.privacy_level, // GUILD_ONLY
        //     scheduled_start_time: new Date(req.query.scheduled_start_time).toISOString(),
        //     scheduled_end_time: new Date(req.query.scheduled_end_time).toISOString(),
        //     entity_type: req.query.entity_type === '3' ? 3 : req.query.entity_type === '2' ? 2 : req.query.entity_type === '1' ? 1 : '', // EXTERNAL
        //     entity_metadata: {
        //         location: req.query.entity_metadata_location ? req.query.entity_metadata_location : "Gielinor"
        //     },
        //     description: req.query.description
        // };

        const today = new Date();

        // Make a copy to avoid mutating the original
        const startDate = new Date(today);

        // Set to tomorrow's date
        startDate.setDate(startDate.getDate() + 1);

        // Set the time to 8:00:00 AM
        startDate.setHours(8, 0, 0, 0);
        const endDate = new Date(today);
        // Set to tomorrow's date
        endDate.setDate(endDate.getDate() + 2);

        // Set the time to 8:00:00 AM
        endDate.setHours(8, 0, 0, 0);

        const eventData = {
				name: 'test event',
				privacy_level: 2, // GUILD_ONLY
				scheduled_start_time: startDate.toISOString(),
				scheduled_end_time: endDate.toISOString(),
				entity_type: 3, // EXTERNAL
				// entity_metadata_location: "Gielinor",
                entity_metadata: {
                    location: "Gielinor"
                },
				// description: `${this.state.competitionTitleName}\n\nhttps://wiseoldman.net/competitions/${newCompetition.competition.id}`,
                description: 'test description',
				event_just_created_id: 'wiseoldman competition id'
			};
        try {
           // res.send('1 Creating Event' + JSON.stringify(req.query));
           //create the event in discord
            let res2 = await fetch(`https://discord.com/api/v10/guilds/${guildId}/scheduled-events`, {
                method: "POST",
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            }),
            responseData = await res2.json();

            console.log(responseData)
            // console.log('url =', responseData.url)
            const inviteLink = `https://discord.com/events/${guildId}/${responseData.id}`;
            console.log("Invite link:", inviteLink);


            // let eventJustCreatedId = responseData.id;
            /*
            POST https://discord.com/api/v10/channels/{channel_id}/messages
            Content-Type: application/json

            {
                "content": "Event started!",
                "username": "Event Bot",
                "embeds": [
                    {
                        "title": "Event Update",
                        "color": 3066993,
                        "description": "All systems go."
                    }
                ]
            }
            */
           
            //2 post the event information in #event-general using the discord bot
            // const res3 = await fetch(`https://discord.com/api/v10/channels/${eventGeneralId}/messages`, {
            //     method: "POST",
            //     headers: {
            //         "Authorization": `Bot ${token}`,
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         content: 'https://discord.com/events/1226692492322148433/1565752751101575198\n\n@ Events @ 1281049707665428552'
            //     })
            // });

            // res.send(JSON.stringify(res3.json()));
            res.send(JSON.stringify(responseData));
        }
        catch (error) {
            res.send('Error creating discord event');
            console.error("Error:", error);
        }

        
    }
    else {
        res.send('Not enough parameters to create event');
    }
});
app.listen(3000)

