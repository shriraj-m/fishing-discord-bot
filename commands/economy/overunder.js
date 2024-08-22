const LinesData = require('../../schemas/LinesData');
const LinesBets = require('../../schemas/LinesBets');
const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    run: async ({interaction}) => {
        try {

            if (!interaction.inGuild()) {
                interaction.reply({
                    content: "This command can only be executed inside a server.",
                    ephemeral: true,
                });
                return;
            }

            const userId = interaction.user.id;
            let betPlaced = false;
            const line_name = interaction.options.getString('line');
            const lineName = line_name;
            const line_choice = interaction.options.getString('ou').toLowerCase();
            const bet_amount = interaction.options.getInteger('amount');
            let userProfile = await UserProfile.findOne({ userId, });
            let linesData = await LinesData.findOne({ lineName });
            let linesBets = await LinesBets.findOne({ userId, });
            
            await interaction.deferReply();
            
            if(!userProfile){ 
                userProfile = new UserProfile({userId}); 
            }
            if(!linesBets){ 
                linesBets = new LinesBets({userId}); 
                linesBets.lineName = line_name;
            }

            if(line_name == linesData.lineName){
                if(linesBets.userId == userId && linesBets.lineName == line_name && linesBets.betPlaced == true){
                    await interaction.editReply('Womp womp, you have already placed a bet on this line.');
                    return;
                }
                if(line_choice === 'over'){
                    if(bet_amount > userProfile.balance){
                        await interaction.editReply("You dont have enough money for this bet...");
                        return;
                    }
                    if(bet_amount < 0){
                        await interaction.editReply("You are unable to bet negative values.");
                        return;
                    }
                    userProfile.balance -= bet_amount;
                    linesBets.over = bet_amount;
                    linesBets.betPlaced = true;
                    await Promise.all([userProfile.save(), linesBets.save()]);
                    await interaction.editReply(`<@${userId}> has placed **$${bet_amount}** on **${line_choice}** for line: **${line_name}**`);
                }else if(line_choice == 'under'){
                    if(bet_amount > userProfile.balance){
                        await interaction.editReply("You broke ass bitch, go whore yourself out to enough money for this bet.");
                        return;
                    }
                    if(bet_amount < 0){
                        await interaction.editReply("You are unable to bet negative values.");
                        return;
                    }
                    userProfile.balance -= bet_amount;
                    linesBets.under = bet_amount;
                    linesBets.betPlaced = true;
                    await Promise.all([userProfile.save(), linesBets.save()]);
                    await interaction.editReply(`<@${userId}> has placed **$${bet_amount}** on **${line_choice}** for line: **${line_name}**`);
                }else{ 
                    await interaction.editReply('Invalid Betting Choice!');
                    return;
                }
            }else{
                await interaction.editReply('Incorrect Line Name. Please type a valid Line. (Case Insensitive)');
                return;
            }
        } catch (error) {
            console.log(`Error handling /overunder : ${error}`);
        }        
    },

    data: {
        name: 'overunder', 
        description: 'bet over or under.',
        options: [
            {
            name: "title",
            description: "name of the line you are betting on",
            type: 3,
            required: true,    
            },
            {
            name: 'ou',
            description: 'go over or under on the line',
            type: 3,
            required: true,
            },
            {
            name: 'amount',
            description: 'amount to bet on the line',
            type: 4,
            required: true,
            },
        ],
    }
}