const { token, guildId, eventGeneralId } = require('./config.json');
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 25330;


app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/createEvent', async (req, res) => {
    res.send('Creating Event' + JSON.stringify(req.query));


    if (req.query.name && req.query.scheduled_start_time && req.query.scheduled_end_time) {
        const eventData = {
            name: req.query.name,
            privacy_level: req.query.privacy_level, // GUILD_ONLY
            scheduled_start_time: req.query.scheduled_start_time,
            scheduled_end_time: req.query.scheduled_end_time,
            entity_type: req.query.entity_type, // EXTERNAL
            entity_metadata: {
                location: "Gielinor"
            },
            description: req.query.name
        };

        try {
            let res2 = await fetch(`https://discord.com/api/v10/guilds/${guildId}/scheduled-events`, {
                method: "POST",
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            }),
            data = res2.json();
        }
        catch (error) {
            console.error("Error:", error);
        }

        
    }
});
app.listen(process.env.SERVER_PORT, "0.0.0.0")

