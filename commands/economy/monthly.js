const UserProfile = require('../../schemas/UserProfile');
const Cooldowns = require('../../schemas/Cooldowns');
const monthlyAmount = 2000;  


module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            await interaction.reply({
                content: "You can only run this command inside a server",
                ephemeral: true,
            });
            return;
        }

        try {
            await interaction.deferReply();

            const commandName = 'monthly';
            const userId = interaction.user.id;

            let userProfile = await UserProfile.findOne({ userId, });
            let cooldown = await Cooldowns.findOne({ userId, commandName });

            if(!userProfile){
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                });
            }
            if(cooldown && Date.now() < cooldown.endsAt) {
                const { default: prettyMs } = await import('pretty-ms'); 

                await interaction.editReply(
                    `Your monthly funds are on cooldown for **${prettyMs(cooldown.endsAt - Date.now())}**`
                );
                return;
            }

            if (!cooldown) {
                cooldown = new Cooldowns({ userId, commandName });
            }

            userProfile.balance += monthlyAmount;
            userProfile.lastMonthlyCollected = new Date();
            cooldown.endsAt = Date.now() + 2_629_746_000;

            await Promise.all([cooldown.save(), userProfile.save()]);
            await interaction.editReply(`$**${monthlyAmount}** was added to your balance.\nNew balance: $**${userProfile.balance}**`);

        } catch (error) {
            console.log(`Error handling /monthly ${error}`)
        }
    },

    data: {
        name: 'monthly',
        description: 'Collect your monthly funds!',
    }
}