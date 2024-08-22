const OresFound = require('../../schemas/OresFound');

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
            console.log(userId);
            let oresFound = await OresFound.findOne({userId});

            if(!oresFound){
                oresFound = new OresFound({userId});
            }
            await interaction.deferReply();

            const coal = oresFound.coal;
            const iron = oresFound.iron;
            const gold = oresFound.gold;
            const diamond = oresFound.diamond;
            const emerald = oresFound.emerald;
            const mithril = oresFound.mithril;
            const titanium = oresFound.titanium;

            let desc = `**<@${userId}> INDIVIDUAL ALL-TIME (SEASON 0) ORES FOUND**\n`;
            desc += `*Coal:* **${coal}**\n`;
            desc += `*Iron:* **${iron}**\n`;
            desc += `*Gold:* **${gold}**\n`;
            desc += `*Diamond:* **${diamond}**\n`;
            desc += `*Emerald:* **${emerald}**\n`;
            if(mithril >= 1){
                desc += `*Mithril:* **${mithril}**\n`;
            }
            if(titanium >= 1){
                desc += `*Titanium:* **${titanium}**`;
            }

            await interaction.editReply(desc);
            desc = '';

            await Promise.all([oresFound.save()]);  

        } catch (error) {
            console.log(`Error handling /orestats : ${error}`)
        }        
    },
    data: {
        name: 'orestats',
        description: 'see the overall ores found by you.',
    }
}

//test