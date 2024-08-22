const { ButtonInteraction } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');


module.exports = (interaction) => {
    async function test(){
        try {
            const userId = interaction.user.id;
            let userProfile = await UserProfile.findOne({ userId });
            if(!interaction.isButton()) return;
            if(interaction.customId == "test-2"){
                console.log("test 2 has been pressed");
                console.log(userId);
                // userProfile.balance += 100;
                console.log('50 was taken')
                await Promise.all([userProfile.save()]);
                await interaction.reply(`testinggg`);
                //await interaction.reply(`You Lost **$100**, your new balance is **$${userProfile.balance}**`);
                return;
            }  
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    //test();
}