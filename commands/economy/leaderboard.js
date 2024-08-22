const ServerStatistics = require('../../schemas/ServerStatistics');
const UserProfile = require('../../schemas/UserProfile');
const {EmbedBuilder} = require("discord.js")



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
            console.log('running leaderboard command');
            await interaction.deferReply();

            const userId = interaction.user.id;
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });

            let leaderboardEmbed = new EmbedBuilder()
                .setTitle('**1408 GAMBLE LEADERBOARD**')
                .setColor(0x000000)
                

            const hBM = await UserProfile //highestBalanceMembers
                .find()
                .sort({balance: -1});

            const topTen = hBM.slice(0,10);

            let desc = "";
            let user_rank = '';
            for(let i = 0; i < topTen.length; i++){
                let user_balance = topTen[i].balance;
                user_balance = user_balance.toLocaleString('en-US')
                const temp = `**#${i+1}.** <@${topTen[i].userId}>: **$${user_balance}** :moneybag:\n`;
                desc += temp;
            }
            for(let i = 0; i < hBM.length; i++){
                if(hBM[i].userId == userId){
                    user_rank += (i+1);
                }
            leaderboardEmbed.setFooter({text: `You are ranked #${user_rank} on the leaderboard.`});

            if(desc !== ""){
                leaderboardEmbed.setDescription(desc);
                }
            }
            await interaction.editReply({embeds: [leaderboardEmbed]});
        } catch (error) {
            console.log(`Error with /leaderboard: ${error}`);
        }        
    },

    data: {
        name: 'leaderboard',
        description: 'shows leaderboard of users with most money',
    }
}