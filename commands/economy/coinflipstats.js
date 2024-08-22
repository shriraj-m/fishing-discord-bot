const ServerStatistics = require('../../schemas/ServerStatistics');

module.exports = {
    run: async ({interaction}) => {
        if(!interaction.inGuild()){
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }
        try {
            const guildId = interaction.guild.id;
            console.log(guildId);
            let serverStats = await ServerStatistics.findOne({ guildId });

            await interaction.deferReply();

            if(!serverStats){
                serverStats = new ServerStatistics({guildId})
            }

            const hL = serverStats.headsLanded;
            const tL = serverStats.tailsLanded;

            await interaction.editReply(`
**TOTAL COINFLIP SERVER STATISTICS**
*Heads Landed:* **${hL}**
*Tails Landed:* **${tL}**
            `,);
            await Promise.all([serverStats.save()]);

        } catch (error) {
            console.log(`Error handling /coinflipstats : ${error}`)
        }        
    },

    data: {
        name: 'coinflipstats',
        description: 'see the overall head / tail count of the server.',
    }
}

//test