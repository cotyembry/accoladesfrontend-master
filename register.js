// Define the slash command
const commands = [
  {
    name: 'ping', // Command name
    description: 'Replies with Pong!', // Command description
  }
];

// Create REST instance
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('⏳ Registering slash commands...');

        // Register commands for a specific guild (fast update)
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log('✅ Slash commands registered successfully!');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
})();