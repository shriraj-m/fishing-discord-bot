const FishBattleStats = require('../../schemas/FishBattleStats');

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
            const userId = interaction.user.id;
            let fishBattleStats = await FishBattleStats.findOne({userId});

            if(!fishBattleStats){
                fishBattleStats = new FishBattleStats({userId});
            }
            await interaction.deferReply();

            const wins = fishBattleStats.wins;
            const losses = fishBattleStats.losses;
            const winrate = (wins/(wins+losses));

            let desc = `**<@${userId}> FISH BATTLE STATS**\n`;
            desc += `*Wins* **${wins}**\n`;
            desc += `*Losses:* **${losses}**\n`;
            if(wins >= 1 && losses >= 1){
                desc += `**--------------**\n`
                desc += `*Winrate: * **${(winrate * 100).toFixed(2)}%**`
            }
            await interaction.editReply(desc);

        } catch (error) {
            console.log(`Error handling /fishbattlestats : ${error}`)
        }        
    },
    data: {
        name: 'fishbattlestats',
        description: 'see your overall fishbattle stats',
    }
}
