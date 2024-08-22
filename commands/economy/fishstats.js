const FishFound = require('../../schemas/FishFound');

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
            let fishFound = await FishFound.findOne({userId});

            if(!fishFound){
                fishFound = new FishFound({userId});
            }
            await interaction.deferReply();

            const common = fishFound.common;
            const uncommon = fishFound.uncommon;
            const rare = fishFound.rare;
            const epic = fishFound.epic;
            const legendary = fishFound.legendary;
            const exotic = fishFound.exotic;
            const ice = fishFound.iceshards;
            const fire = fishFound.fireshards;
            const wind = fishFound.windshards;
            const voidshard = fishFound.voidshards;

            const shardsum = voidshard + wind + fire + ice;
            const total = common + uncommon + rare + epic + legendary + exotic; 

            let desc = `**<@${userId}> INDIVIDUAL ALL-TIME FISH FOUND**\n`;
            desc += `*Common:* **${common}**\n`;
            desc += `*Uncommon:* **${uncommon}**\n`;
            desc += `*Rare:* **${rare}**\n`;
            desc += `*Epic:* **${epic}**\n`;
            desc += `*Legendary:* **${legendary}**\n`;
            if(exotic >= 1){
                desc += `*Exotic:* **${exotic}**\n`;
            }
            if(shardsum>= 1){
                desc += `**--------------------------------**\n`
                if(ice >= 1){
                    desc += `*Rare Ice Shards:* **${ice}**\n`
                }
                if(fire >= 1){
                    desc += `*Rare Fire Shards:* **${fire}**\n`
                }
                if(wind >= 1){
                    desc += `*Rare Wind Shards:* **${wind}**\n`
                }
                if(voidshard >= 1){
                    desc += `*Extremely Rare Void Shards:* **${voidshard}**\n`
                }
            }
            desc += `**--------------------------------**\n`
            desc += `*Total Fish Caught:* **${total}**`;
            await interaction.editReply(desc);
            desc = '';

            await Promise.all([fishFound.save()]);  

        } catch (error) {
            console.log(`Error handling /fishstats : ${error}`)
        }        
    },
    data: {
        name: 'fishstats',
        description: 'see the overall fish found by you.',
    }
}
