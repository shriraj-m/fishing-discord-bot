const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ButtonInteraction} = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');
const FishFound = require('../../schemas/FishFound');
const UserMilestones = require('../../schemas/UserMilestones')

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
            // await interaction.deferReply();
            const userId = interaction.user.id;
            console.log(userId);
            let userProfile = await UserProfile.findOne({userId});
            let fishFound = await FishFound.findOne({userId});
            let userMs = await UserMilestones.findOne({userId});
            
            if(!userProfile){ userProfile = new UserProfile({userId}); }
            if(!fishFound){ fishFound = new FishFound({userId}); }
            if(!userMs){ userMs = new UserMilestones({userId}); }

            // if(interaction.channelId != 1227366385332654091){ //fish = 1227273573727604848 //lake-azure-haven = 1227330742523269142
            //     await interaction.reply(`erm... what are u doing :nerd:`);
            //     return;
            // }
    
            const common = fishFound.common;
            const uncommon = fishFound.uncommon;
            const rare = fishFound.rare;
            const epic = fishFound.epic;
            const legendary = fishFound.legendary;
            const exotic = fishFound.exotic;
            const total = common + uncommon + rare + epic + legendary + exotic;

            //common
            let m1price = [25000, 1, 2, 4, 16, 64, 128, 256, 512, 1024, 2048, 4096];
            let m1catch = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];
            //uncommon
            let m2price = [50000, 1, 4, 8, 16, 32, 64, 128, 256, 512, 2048, 4096];
            let m2catch = [50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];
            //rare
            let m4price = [50000, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
            let m4catch = [25, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 100000];
            //epic
            let m5price = [75000, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
            let m5catch = [10, 25, 50, 100, 200, 400, 800, 2000, 5000, 10000, 100000];
            //legendary
            let m6price = [100000, 1, 2.5, 5, 10, 20, 50, 100, 200, 400, 800];
            let m6catch = [5, 10, 25, 50, 100, 150, 200, 250, 500, 1000];
            //exotic
            let m7price = [100000, 1, 3, 5, 10, 25, 50, 100, 200];
            let m7catch = [1, 3, 5, 10, 25, 50, 100, 200];
            //all total
            let m3price = [100000, 1, 2, 5, 10, 25, 50, 150, 500, 1000];
            let m3catch = [250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];

            function decypher(milestring){
                let value = 0;
                let level = 0;
                let text = milestring;
                value = text.substring(0, text.indexOf('-'));
                level = text.substring(text.indexOf('-')+1, text.length);
                return [value, level];
            }


            function doMilestone(arrayOne, arrayTwo, milestring, fish){
                let nOfFish, nOfLev;
                let string = '';
                [nOfFish, nOfLev] = decypher(milestring); //strings
                let iter = parseInt(nOfLev) + 1; //number
                let slot = parseInt(nOfFish); //number
                let money = arrayOne[0] * arrayOne[iter];

                if(fish >= arrayTwo[slot]){
                    result = arrayTwo[slot];
                    string = `${++slot}-${iter}`;

                    return [result, money, string];


                    //update the next value
                    //change user's milestone code
                    //pay user by returning money
                }else{
                    result = arrayTwo[slot];
                    string = `${slot}-${--iter}`;
                    return [result, money, string];
                }
            }

            let totalPrice = 0;

            //------------------------------------------------------------------------------------------------
            let text1, price1, update1, n1;
            let move = 0;
            [text1, price1, update1] =  doMilestone(m1price, m1catch, userMs.milestoneOne, common);
            price1text = price1.toLocaleString('en-US');
            let m1 = `*Catch* ***${text1}*** *Common Fish*\n*Your Progress:* **(${common}/${text1})**\n`;
            if(common >= text1){
                n1 = `~~*Reward:* ***$${price1text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneOne = update1;
                totalPrice += price1;
                console.log("updated milestone value to: " + update1);
            }else{
                n1 = `*Reward:* ***$${price1text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text2, price2, update2, n2;
            [text2, price2, update2] =  doMilestone(m2price, m2catch, userMs.milestoneTwo, uncommon);
            price2text = price2.toLocaleString('en-US');
            let m2 = `*Catch* ***${text2}*** *Uncommon Fish*\n*Your Progress:* **(${uncommon}/${text2})**\n`;
            if(uncommon >= text2){
                n2 = `~~*Reward:* ***$${price2text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneTwo = update2;
                totalPrice += price2;
                console.log("updated milestone value to: " + update2);
            }else{
                n2 = `*Reward:* ***$${price2text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text4, price4, update4, n4;
            [text4, price4, update4] =  doMilestone(m4price, m4catch, userMs.milestoneFour, rare);
            price4text = price4.toLocaleString('en-US');
            let m4 = `*Catch* ***${text4}*** *Rare Fish*\n*Your Progress:* **(${rare}/${text4})**\n`;
            if(rare >= text4){
                n4 = `~~*Reward:* ***$${price4text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneFour = update4;
                totalPrice += price4;
                console.log("updated milestone value to: " + update4);
            }else{
                n4 = `*Reward:* ***$${price4text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text5, price5, update5, n5;
            [text5, price5, update5] =  doMilestone(m5price, m5catch, userMs.milestoneFive, epic);
            price5text = price5.toLocaleString('en-US');
            let m5 = `*Catch* ***${text5}*** *Epic Fish*\n*Your Progress:* **(${epic}/${text5})**\n`;
            if(epic >= text5){
                n5 = `~~*Reward:* ***$${price5text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneFive = update5;
                totalPrice += price5;
                console.log("updated milestone value to: " + update5);
            }else{
                n5 = `*Reward:* ***$${price5text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text6, price6, update6, n6;
            [text6, price6, update6] =  doMilestone(m6price, m6catch, userMs.milestoneSix, legendary);
            price6text = price6.toLocaleString('en-US');
            let m6 = `*Catch* ***${text6}*** *Legendary Fish*\n*Your Progress:* **(${legendary}/${text6})**\n`;
            if(legendary >= text6){
                n6 = `~~*Reward:* ***$${price6text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneSix = update6;
                totalPrice += price6;
                console.log("updated milestone value to: " + update6);
            }else{
                n6 = `*Reward:* ***$${price6text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text7, price7, update7, n7;
            [text7, price7, update7] =  doMilestone(m7price, m7catch, userMs.milestoneSeven, exotic);
            price7text = price7.toLocaleString('en-US');
            let m7 = `*Catch* ***${text7}*** *Exotic Fish*\n*Your Progress:* **(${exotic}/${text7})**\n`;
            if(exotic >= text7){
                n7 = `~~*Reward:* ***$${price7text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneSeven = update7;
                totalPrice += price7;
                console.log("updated milestone value to: " + update7);
            }else{
                n7 = `*Reward:* ***$${price7text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------
            let text3, price3, update3, n3;
            [text3, price3, update3] =  doMilestone(m3price, m3catch, userMs.milestoneThree, total);
            price3text = price3.toLocaleString('en-US');
            let m3 = `*Catch* ***${text3}*** *Any Fish*\n*Your Progress:* **(${total}/${text3})**\n`;
            if(total >= text3){
                n3 = `~~*Reward:* ***$${price3text}***~~\n---------------------------`;
                move = 1;
                userMs.milestoneThree = update3;
                totalPrice += price3;
                console.log("updated milestone value to: " + update3);
            }else{
                n3 = `*Reward:* ***$${price3text}***\n---------------------------`;
            }
            //------------------------------------------------------------------------------------------------            
            
            const choice = [
                {name: 'Next', emoji: '🐟'},
                // {name: 'Cancel', emoji: '❌'},
            ];
            const choice2 = [
                {name: 'Next', emoji: '🐟'},
                // {name: 'Back', emoji: '❌'},
            ];

            const button = choice.map((select) => {
                const choices = new ButtonBuilder()
                .setCustomId(select.name)
                .setLabel(select.name)
                if(select.name == "Next"){
                    choices.setStyle(ButtonStyle.Primary)
                }else{
                    // choices.setStyle(ButtonStyle.Danger)
                }
                return choices;
            });

            const button2 = choice2.map((select) => {
                const choices2 = new ButtonBuilder()
                .setCustomId(select.name)
                .setLabel(select.name)
                if(select.name == "Next"){
                    choices2.setStyle(ButtonStyle.Primary)
                }
                //     choices.setStyle(ButtonStyle.Primary)
                // }
                return choices2;
            });


            const row = new ActionRowBuilder().addComponents(button);
            const row2 = new ActionRowBuilder().addComponents(button2);

            let ms1Embed = new EmbedBuilder()
                .setColor(0xADD8E7)
                .setTitle(`**YOUR MILESTONES 1/3**`)
                .setDescription(`---------------------------`)
                .addFields(
                    {name: m1, value: n1},
                )
                .addFields(
                    {name: m2, value: n2},
                )
                .addFields(
                    {name: m3, value: n3},
                ); 

            let ms2Embed = new EmbedBuilder()
                .setColor(0xADD8E7)
                .setTitle(`**YOUR MILESTONES 2/3**`)
                .setDescription(`---------------------------`)
                .addFields(
                    {name: m4, value: n4},
                )
                .addFields(
                    {name: m5, value: n5},
                );
            
            let ms3Embed = new EmbedBuilder()
                .setColor(0xADD8E7)
                .setTitle(`**YOUR MILESTONES 3/3**`)
                .setDescription(`---------------------------`)
                .addFields(
                    {name: m6, value: n6},
                )
                .addFields(
                    {name: m7, value: n7},
                );

            
            if(move == 1){
                ms1Embed.addFields(
                    // { name: '\u200B', value: '\u200B' },
		            { name: '\u200B', value: `You've been Paid: **$${totalPrice}!**`, inline: true },
                ).setFooter({text: "Your Milestones Have Been Updated."});
                ms2Embed.addFields(
                    // { name: '\u200B', value: '\u200B' },
		            { name: '\u200B', value: `You've been Paid: **$${totalPrice}!**`, inline: true },
                ).setFooter({text: "Your Milestones Have Been Updated."});
                ms3Embed.addFields(
                    // { name: '\u200B', value: '\u200B' },
		            { name: '\u200B', value: `You've been Paid: **$${totalPrice}!**`, inline: true },
                ).setFooter({text: "Your Milestones Have Been Updated."});
            }      

            userProfile.balance += totalPrice;
            const reply = await interaction.reply({
                embeds: [ms1Embed],
                components: [row],
            });            

            await Promise.all([fishFound.save(), userProfile.save(), userMs.save()]);  


            try {
                const initialUserInteraction = await reply.awaitMessageComponent({filter: (i) => i.user.id === userId, time: 30_000});
                const initialUserChoice = choice.find(
                    (select) => select.name === initialUserInteraction.customId,
                );
                
                if(initialUserChoice.name == "Next"){
                    await initialUserInteraction.update({embeds: [ms2Embed], components: [row2]});

                }
            } catch (error) {
                await reply.edit({content: "*closing to save space*", embeds: [], components: [] });
            }

            try {
                const initialUserInteraction2 = await reply.awaitMessageComponent({filter: (i) => i.user.id === userId, time: 30_000,});
                const initialUserChoice2 = choice2.find(
                    (select) => select.name === initialUserInteraction2.customId,
                );
                if(initialUserChoice2.name == "Next"){
                    await initialUserInteraction2.update({embeds: [ms3Embed], components: []});
                }
            } catch (error) {
                await reply.edit({content: "*closing to save space*", embeds: [], components: [] });
            }

            try {
                const initialUserInteraction3 = await reply.awaitMessageComponent({filter: (i) => i.user.id === userId, time: 30_000});
            } catch (error) {
                await reply.edit({content: "*closing to save space*", embeds: [], components: [] });
            }
            
            // await Promise.all([fishFound.save(), userProfile.save(), userMs.save()]);  

        } catch (error) {
            console.log(`Error handling /milestones : ${error}`)
        }        
    },
    data: {
        name: 'milestones',
        description: 'see  and track your progress on the milestones.',
    }
}
