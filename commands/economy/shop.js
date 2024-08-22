const UserProfile = require('../../schemas/UserProfile');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
//lose $5 for mewing, pay a price for the cost of looking good. 
//jjk automated gambling. 

module.exports = {
    deleted: true,
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return; 
        } 
    try {
        await interaction.deferReply();

        if(interaction.channelId != 1227366385332654091){ 
            //await interaction.editReply(`Mine is closed.`);
            await interaction.editReply(`You cannot use this command in this channel, please head to the <#1227330742523269142>`);
            return;
        }

		// const oldRod = new ButtonBuilder()
		// 	.setCustomId('old-rod')
		// 	.setLabel('OldRod')
		// 	.setStyle(ButtonStyle.Secondary);

		// const goodRod = new ButtonBuilder()
		// 	.setCustomId('good-rod')
		// 	.setLabel('GoodRod')
        //     // .setEmoji("⛏️")
		// 	.setStyle(ButtonStyle.Secondary);
        
        // const superRod = new ButtonBuilder()
		// 	.setCustomId('super-rod')
		// 	.setLabel('SuperRod')
        //     // .setEmoji("⛏️")
		// 	.setStyle(ButtonStyle.Secondary);


		// const row = new ActionRowBuilder()
		// 	.addComponents(oldRod, goodRod, superRod);

        // const userId = interaction.user.id;
        // let userProfile = await UserProfile.findOne({ userId, });
        
        // //If user does not have a profile, then a profile will be made.
        // if(!userProfile){
        //     userProfile = new UserProfile({
        //         userId: interaction.member.id,
        //     });
        // }

        await interaction.editReply({
            content: "shop",
            components: [row],
        });

    } catch (error) {
        console.log(`Error handling /shop: ${error}`);
    }
},
    data: {
        name: 'shop',
        description: 'Displays the server-shop.',
    }
}