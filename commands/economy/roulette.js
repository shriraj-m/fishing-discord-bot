const Cooldowns = require('../../schemas/Cooldowns');
const UserProfile = require('../../schemas/UserProfile');
const ServerStatistics = require('../../schemas/ServerStatistics');
const JackpotFish = require('../../schemas/JackpotFish');
// roulette info ------------------------------------------------

// green = 36x
// red = 2x
// black = 2x
// even / odd = 2x
// number == 36x
// first12 = 3x
// second12 = 3x
// third12 = 3x

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


const black =[2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const red = [0,1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

//---------------------------------------------------------------


module.exports = {
    run: async ({interaction}) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }
        try {
            await interaction.deferReply();

            let userId = interaction.user.id;
            let guildId = interaction.guild.id;
            let commandName = "roulette";
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
            let cooldown = await Cooldowns.findOne({ userId, commandName })
            let serverStats = await ServerStatistics.findOne({guildId});
            let jackpotFish = await JackpotFish.findOne({ guildId });


            if(!userProfile){
                userProfile = new UserProfile({userId});
            }

            if (cooldown && Date.now() < cooldown.endsAt) {
                const { default: prettyMs } = await import('pretty-ms'); 
    
                await interaction.editReply({
                    content: `You can use /roulette again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
                    ephemeral: true,
                });
                return;
            }
    
            if (!cooldown) {
                cooldown = new Cooldowns({userId, commandName});
            }


            if(interaction.channelId != 1203892046511874129){ //roulette : 1203892046511874129
                await interaction.editReply('no workie sowwy');
                return;
            }

            let amount_won = 0;
            let option_selected = interaction.options.getString('options').toLowerCase();
            let amount_bet = interaction.options.getInteger('amount');
            let random_val = Math.floor(generateRandomNumber(0,37));
            console.log(random_val);
            let numbered_option = parseInt(option_selected);
            
            let blackOrRed = '';

            for(let i = 0; i < black.length; i++){
                if(black[i] == random_val){
                    blackOrRed = 'Black';
                    console.log('black');
                    console.log(`blackOrRed = ${blackOrRed}`);
                }
            }
            
            for(let i = 0; i < red.length; i++){
                if(red[i] == random_val){
                    blackOrRed = 'Red';
                    console.log('red');
                    console.log(`blackOrRed = ${blackOrRed}`);
                }
            }

            if(amount_bet > userProfile.balance){
                await interaction.editReply(`You cannot bet more than you own...`);
                return;
            }

            if(amount_bet < 0){
                await interaction.editReply(`You cannot bet negative values...`);
                return;
            }

            if(amount_bet > 5000000){
                await interaction.editReply(`You cannot bet over 5 million...`);
                return;
            }

            userProfile.balance -= amount_bet;
            
            if(numbered_option >= 0 && numbered_option <= 36){
                if(numbered_option == random_val){
                    amount_won = 36 * amount_bet
                    serverStats.overallWins++;
                    serverStats.overallMoneyGain += amount_won;
                    userProfile.balance += amount_won;
                    await interaction.editReply(`Congrats! It landed on **${numbered_option}**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    cooldown.endsAt = Date.now() + 20_000;
                    await Promise.all(userProfile.save(), cooldown.save())
                    return;
                } else {
                    serverStats.overallLoss++;
                    serverStats.overallMoneyLoss -= amount_bet;
                    jackpotFish.value += (amount_bet * 0.05);
                    await interaction.editReply(`Uh oh! You chose **${numbered_option}** and it landed on **${random_val}**! You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    cooldown.endsAt = Date.now() + 20_000;
                    await Promise.all(userProfile.save(), cooldown.save())
                    return;
                }
            }

            switch(option_selected){
                case 'red':
                    console.log('red was typed');
                    if(blackOrRed == 'Red'){
                        if(random_val == 0){
                            userProfile.balance += amount_bet;
                            await interaction.editReply(`It landed on **Green**, your money has been returned.`);
                            return;
                        }
                        amount_won = 2 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet **Red**! Congrats! It landed on **Red**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        if(random_val == 0){
                            userProfile.balance += amount_bet;
                            await interaction.editReply(`It landed on **Green**, your money has been returned.`);
                            return;
                        }
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! You Bet **Red** and It landed on **Black**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                case 'black':
                    console.log('black was typed');
                    if(blackOrRed == 'Black'){
                        if(random_val == 0){
                            userProfile.balance += amount_bet;
                            await interaction.editReply(`It landed on **Green**, your money has been returned.`);
                            return;
                        }
                        amount_won = 2 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet **Black**! Congrats! It landed on **Black**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        if(random_val == 0){
                            userProfile.balance += amount_bet;
                            await interaction.editReply(`It landed on **Green**, your money has been returned.`);
                            return;
                        }
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! You Bet **Black**!  It landed on **Red**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                case 'even':
                    if(random_val % 2 == 0){
                        amount_won = 2 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet on **Even**! Congrats! It landed on an **Even Number (${random_val})**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! You Bet on **Even**! and it landed on an **Odd Number (${random_val})**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                case 'odd':
                    if(random_val % 2 == 1){
                        amount_won = 2 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet on **Odd**! Congrats! It landed on an **Odd Number (${random_val})**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! You Bet on **Odd**! It landed on an **Even Number (${random_val})**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                case 'first12':
                    if(random_val >= 1 && random_val <= 12){
                        amount_won = 3 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet on the **First 12**! Congrats! It landed on a **${random_val}**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! It landed on a **${random_val}**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`)
                    }
                    break;
                case 'middle12':
                    if(random_val >= 13 && random_val <= 24){
                        amount_won = 3 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet on the **Middle 12**! Congrats! It landed on a **${random_val}**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! It landed on a **${random_val}**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                case 'last12':
                    if(random_val >= 25 && random_val <= 36){
                        amount_won = 3 * amount_bet;
                        serverStats.overallWins++;
                        serverStats.overallMoneyGain += amount_won;
                        userProfile.balance += amount_won;
                        await interaction.editReply(`You Bet on the **Last 12**! Congrats! It landed on a **${random_val}**! You won **$${amount_won}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }else{
                        serverStats.overallLoss++;
                        serverStats.overallMoneyLoss -= amount_bet;
                        jackpotFish.value += (amount_bet * 0.05);
                        await interaction.editReply(`Oh no! It landed on a **${random_val}**. You Lost **$${amount_bet}**\nYour new balance is $**${(parseFloat(userProfile.balance.toFixed(2))).toLocaleString('en-US')}**`);
                    }
                    break;
                default:
                    await interaction.editReply('Invalid Option Type.\nValid Option Types Include (Case-Insensitive)\nRed, Black, Odd, Even, First12, Middle12, Last12, or a number between 0 -> 36');
                    return;
            }
            cooldown.endsAt = Date.now() + 30_000;
            await Promise.all(userProfile.save(), cooldown.save(), serverStats.save(), jackpotFish.save())
            //await interaction.editReply(`workie!`);
        } catch (error) {
        }        
    },
    data: {
        name: 'roulette',
        description: 'play roulette and gamble!',
        options: [
            {
                name: 'options',
                description: 'betting options (red, black, green, odd, even, or a number, first12, middle12, last12)',
                type: 3,
                required: true,
            },
            {
                name: 'amount',
                description: 'amount you want to bet',
                type: 4,
                required: true,
            },
        ],
    }
}
