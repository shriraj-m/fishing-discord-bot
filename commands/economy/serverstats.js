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

            const oLoss = serverStats.overallLoss;
            const oWins = serverStats.overallWins;
            const oML = serverStats.overallMoneyLoss;
            const oMW = serverStats.overallMoneyGain;

            await interaction.editReply(`
**TOTAL SERVER STATISTICS**
*Overall Wins:* **${oWins}**
*Overall Losses:* **${oLoss}**
*Overall Money Won:* **$${oMW}**
*Overall Money Lost:* **$${oML * -1}**
            `,);
            await Promise.all([serverStats.save()]);

        } catch (error) {
            console.log(`Error handling /serverstats : ${error}`)
        }        
    },

    data: {
        name: 'serverstats',
        description: 'see the overall gain / loss of the server.',
    }
}

//test