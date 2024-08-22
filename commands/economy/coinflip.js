const UserProfile = require('../../schemas/UserProfile');
const Cooldowns = require('../../schemas/Cooldowns');
const ServerStatistics = require('../../schemas/ServerStatistics');
const JackpotFish = require('../../schemas/JackpotFish');


function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
module.exports = {
    run: async ({interaction}) => {
        try {
            const userId = interaction.user.id;
            const commandName = 'coinflip';
            const guildId = interaction.guild.id;
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });
            let serverStats = await ServerStatistics.findOne({ guildId });
            let cooldown = await Cooldowns.findOne({ userId, commandName });
            let jackpotFish = await JackpotFish.findOne({ guildId });

            if (!interaction.inGuild()) {
                interaction.reply({
                    content: "This command can only be executed inside a server.",
                    ephemeral: true,
                });
                return;
            }
            await interaction.deferReply();

            if(interaction.channelId != 1203176916497207306){
                await interaction.editReply(`You cannot use this command in this channel, please head to the <#1203176916497207306>`);
                return;
            }

            if(!userProfile){
                //if it doesn't exist, create one
                userProfile = new UserProfile({userId});
            }

            //Test if a user's profile exists
            if(userProfile){
                if (cooldown && Date.now() < cooldown.endsAt) {
                    const { default: prettyMs } = await import('pretty-ms'); 
                    await interaction.editReply(
                        `Your coinflip is on cooldown for **${prettyMs(cooldown.endsAt - Date.now())}**`
                    );
                    return;
                }

                if (!cooldown) {
                    cooldown = new Cooldowns({userId, commandName});
                }
            }

            const number = Math.floor(generateRandomNumber(1, 101)); //1 - 100
            const bet_amount = interaction.options.getInteger('amount');
            const side_selected = interaction.options.getString('side').toLowerCase();

            //Test if amount is greater than balance
            if(bet_amount > userProfile.balance) {
                interaction.editReply('You do **NOT** own enough money. Haha');
                return;
            }

            //Test if amount is less than zero
            if(bet_amount < 0){
                interaction.editReply('You are **NOT** allowed to bet negative values. Try again!')
                return;
            }

            if(bet_amount > 5000000){
                interaction.editReply('You are **NOT** allowed to bet over 5 million...')
                return;
            }

            //run if side entered by user is 'heads'
            if(side_selected == 'heads'){
                if(number % 2 == 0){
                    userProfile.balance += bet_amount;
                    serverStats.overallWins++;
                    serverStats.overallMoneyGain += bet_amount;
                    serverStats.headsLanded++;
                    await interaction.editReply(
                        `You placed **$${bet_amount}** on **${side_selected}**.\nCongrats! The coin landed on **heads**!\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                }else{
                    userProfile.balance -= bet_amount;
                    jackpotFish.value += (bet_amount * 0.05);
                    serverStats.overallLoss++;
                    serverStats.overallMoneyLoss -= bet_amount;
                    serverStats.tailsLanded++;
                    await interaction.editReply(
                        `You placed **$${bet_amount}** on **${side_selected}**.\nWomp womp! The coin landed on **tails**!\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                }
                cooldown.endsAt = Date.now() + 30_000;

            //run if side entered by user is 'tails' 
            }else if(side_selected == 'tails'){
                if(number % 2 == 1){
                    userProfile.balance += bet_amount;
                    serverStats.overallWins++;
                    serverStats.overallMoneyGain += bet_amount;
                    serverStats.tailsLanded++;
                    await interaction.editReply(
                        `You placed **$${bet_amount}** on **${side_selected}**.\nCongrats! The coin landed on **tails**!\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                }else{
                    userProfile.balance -= bet_amount;
                    jackpotFish.value += (bet_amount * 0.05);
                    serverStats.overallLoss++;
                    serverStats.overallMoneyLoss -= bet_amount;
                    serverStats.headsLanded++;
                    await interaction.editReply(
                        `You placed **$${bet_amount}** on **${side_selected}**.\nWomp womp! The coin landed on **heads**!\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                }
                cooldown.endsAt = Date.now() + 30_000;
            //respond if user inputs are wrong
            }else{
                interaction.editReply('Please enter a valid side. ("Heads or Tails")');
                cooldown.endsAt = Date.now() + 100;
            }
            //save and update database
            await Promise.all([cooldown.save(), userProfile.save(), serverStats.save(), jackpotFish.save()]);
            return;
        } catch (error) {
            console.log(`Error handling /coinflip: ${error}`);
        }
    },
    data: {
        name: 'coinflip',
        description: 'Flip a coin, select Heads or Tails and then pray.',
        options: [{
            name: 'side',
            description: 'side of the coin you want to bet on.',
            type: 3,
            required: true,
            }, 
            {
            name: 'amount',
            description: 'amount to bet, cannot be negative or greater than user balance.',
            type: 4,
            required: true,
            },
        ],
    }
}
