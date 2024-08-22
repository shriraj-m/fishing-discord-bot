const UserProfile = require('../../schemas/UserProfile');
  
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
        let user_to_pay = interaction.options.getString('user');
        user_to_pay = user_to_pay.replace('<', '');
        user_to_pay = user_to_pay.replace('>', '');
        user_to_pay = user_to_pay.replace('@', '');
        //console.log(user_to_pay);
        const amount_paid = interaction.options.getInteger('amount');
        //console.log(amount_paid);

        await interaction.deferReply();

        const userId = interaction.user.id;
        let userProfile = await UserProfile.findOne({ userId });
        let userToPay = await UserProfile.findOne({ userId: user_to_pay });
        //console.log(userToPay.balance);

        if(!userProfile){
            userProfile = new UserProfile({userId});
        }

        if(!userToPay){
            await interaction.editReply(`Please enter one user to pay or a valid username`);
            return;       
        }

        if(user_to_pay == 1201360534675673208){
            await interaction.editReply(`...You cannot pay me, sorry`);
            return;
        }

        if(userId == user_to_pay){
            await interaction.editReply(`Sorry, you can **NOT** pay yourself. womp womp`);
            return;
        }

        if(amount_paid < 0){
            await interaction.editReply(`Sorry, you can **NOT** pay negative values. womp womp`);
            return;
        }

        if(amount_paid > userProfile.balance){
            await interaction.editReply(`You do not have enough money to pay this user. womp womp`);
            return;
        }

        userProfile.balance -= amount_paid;
        userToPay.balance += amount_paid;

        await Promise.all([userProfile.save(), userToPay.save()]);
        await interaction.editReply(`<@${userId}> paid <@${user_to_pay}> **$${amount_paid}** :moneybag:`);
    } catch (error) {
        console.log(`Error handling /pay: ${error}`);
    }
},

    data: {
        name: 'pay',
        description: "Collect your daily fund.",
        options: [
            {
                name: 'user',
                description: '@ the user you want to pay',
                type: 3,
                required: true,
            },
            {
                name: 'amount',
                description: 'the amount you want to pay them',
                type: 4,
                required: true,
            },
        ],
    }
}