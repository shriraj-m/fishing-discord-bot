const Cooldowns = require('../../schemas/Cooldowns');
const UserProfile = require('../../schemas/UserProfile');

const dailyAmount = 100;  

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
        const commandName = "daily";
        const userId = interaction.user.id;

        let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
        let cooldown = await Cooldowns.findOne({ userId, commandName })

        if(!userProfile){
            userProfile = new UserProfile({
                userId: interaction.member.id,
            });
        }

        if (userProfile) {
            const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
            if (cooldown && Date.now() < cooldown.endsAt) {
                const { default: prettyMs } = await import('pretty-ms'); 

                await interaction.editReply(
                    `Your daily funds are on cooldown for **${prettyMs(cooldown.endsAt - Date.now())}**`
                );
                return;
            }
            if (!cooldown) {
                cooldown = new Cooldowns({userId, commandName});
            }
        } else {
            userProfile = new UserProfile({userId});
        }
        userProfile.balance += dailyAmount;
        userProfile.lastDailyCollected = new Date();
        cooldown.endsAt = Date.now() + 86_400_000;
        //await userProfile.save();
        await Promise.all([cooldown.save(), userProfile.save()]);

        await interaction.editReply(`$**${dailyAmount}** was added to your balance.\nNew balance: $**${userProfile.balance}**`)
    } catch (error) {
        console.log(`Error handling /daily: ${error}`);
    }
},

    data: {
        name: 'daily',
        description: "Collect your daily fund."
    }
}