const UserProfile = require('../../schemas/UserProfile');
//lose $5 for mewing, pay a price for the cost of looking good. 
//jjk automated gambling. 

module.exports = {
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

        let userProfile = await UserProfile.findOne({
            userId: interaction.member.id,
        });

        if (userProfile) {
            interaction.editReply(`Available Funds: $**${(userProfile.balance).toLocaleString('en-US')}**`);
            return;
        } else {
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                });
                interaction.editReply(`Available Funds: $**${(userProfile.balance).toLocaleString('en-US')}**`);
                return;
           }

    } catch (error) {
        console.log(`Error handling /balance: ${error}`);
    }
},
    data: {
        name: 'balance',
        description: 'Displays available funds linked to your discord account.',
    }
}