const UserProfile = require('../../schemas/UserProfile');
const FishingRods = require('../../schemas/UserFishingInfo')
const FishFound = require('../../schemas/FishFound')


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

        // if(interaction.channelId != 1227366385332654091){ 
        //     //await interaction.editReply(`Mine is closed.`);
        //     await interaction.editReply(`You cannot use this command in this channel, please head to the <#1227330742523269142>`);
        //     return;
        // }

        const userId = interaction.user.id;
        let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
        let fishingRods = await FishingRods.findOne({ userId, });
        let fishFound = await FishFound.findOne({ userId, });
        let option_selected = interaction.options.getString('fishingrod').toLowerCase();
        

        if(!fishingRods){
            fishingRods = new FishingRods({userId})
        }
        if(!userProfile){
            userProfile = new UserProfile({userId});
        }

        const choice = fishingRods.fishingRod;
        
        let desc = "";
        if(option_selected == "info"){
            desc += "***FISHING ROD STORE.***\n";
            desc += "-----------------------------------------------------------------------------\n"
            if(choice == 0){
                desc += "You Currently Own the ***Basic Rod***\n"
            }else if(choice == 1){
                desc += "You Currently Own the ***Good Rod***\n"
            }else if(choice == 2){
                desc += "You Currently Own the ***Great Rod***\n"
            }else if(choice == 3){
                desc += "You Currently Own the ***Super Rod***\n"
            }else if(choice == 4){
                desc += "You Currently Own the ***Ultra Rod***\n"
            }else if(choice == 5){
                desc += "You Currently Own the ***Master Rod***\n"
            }else if(choice == 6){
                desc += "You Currently Own the ***Champion's Rod***\n"
            }else if(choice == 7){
                desc += "You Currently Own the ***King's Rod***\n"
            }else if(choice == 8){
                desc += "You Currently Own the ***Legend's Rod***\n"
            }else if(choice == 9){
                desc += "You Currently Own the ***Music's Rod***\n"
            }
            desc += "-----------------------------------------------------------------------------\n"
            
            desc += "Purchasable Fishing Rods Include: \n";
            if(fishFound.koi >= 5 && choice >= 1 ){
                desc += `~~**Good Rod**: $500,000 & **5/5** Koi Fish Caught.~~\n`;
            }else{
                desc += `**Good Rod**: $500,000 & **${fishFound.koi}/5** Koi Fish Caught.\n`;
            }

            if(fishFound.carasalmon >= 5 && choice >= 2){
                desc += `~~**Great Rod**: $1,000,000 & **5/5** Caramel Salmon Caught~~\n`;
            }else{
                desc += `**Great Rod**: $1,000,000 & **${fishFound.carasalmon}/5** Caramel Salmon Caught\n`;
            }

            if(fishFound.gengarfish >= 5 && choice >= 3){
                desc += `~~**Super Rod**: $2,500,000 & **5/5** Gengarfish Caught~~\n`;
            }else{
                desc += `**Super Rod**: $2,500,000 & **${fishFound.gengarfish}/5** Gengarfish Caught\n`;
            }

            if(fishFound.weltfish >= 5 && choice >= 4){
                desc += `~~**Ultra Rod**: $10,000,000 & **5/5** Weltfish Caught~~\n`;
            }else{
                desc += `**Ultra Rod**: $10,000,000 & **${fishFound.weltfish}/5** Weltfish Caught\n`;
            }

            if(fishFound.lustzephyr >= 5 && choice >= 5){
                desc += `~~**Master Rod**: $50,000,000 & **5/5** Lustrous Zephyrfish Caught.~~\n`;
            }else{
                desc += `**Master Rod**: $50,000,000 & **${fishFound.lustzephyr}/5** Lustrous Zephyrfish Caught.\n`;
            }
            
            
            if(fishFound.milotic >= 5 && choice >= 5){
                desc += `**Champion's Rod**: $250,000,000 & **5/5** Miltoic Caught.\n`;
            }else{
                desc += `**Champion's Rod**: $250,000,000 & **${fishFound.milotic}/5** Miltoic Caught.\n`;
            }
            
            desc += `**King's Rod**: $750,000,000 & **5** [REDACTED] Caught.\n`;
            desc += `**Legend's Rod**: $2,500,000,000 & **10** [REDACTED] Caught.\n`;

            desc += "-----------------------------------------------------------------------------\n"
            desc += "Instead of typing info, please type one of the following to buy it'.\n"
            desc += "goodrod, greatrod, superrod, ultrarod\nmasterrod, championrod, kingrod, legendrod\n"
            desc += "This will IMMEDIATELY purchase the fishing rod if you have enough money. \n"
            desc += "-----------------------------------------------------------------------------\n"

            await interaction.editReply(desc);
            
        }else if(option_selected == "goodrod"){
            if(userProfile.balance >= 500000){
                if(fishFound.koi >= 5){
                    userProfile.balance -= 500000;
                    fishingRods.fishingRod = 1;
                    desc += `<@${userId}> just purchased a **Good Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Koi!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Good Rod";
            }
            await interaction.editReply(desc);

        }else if(option_selected == "greatrod"){
            if(userProfile.balance >= 1000000){
                if(fishFound.carasalmon >= 5){
                    userProfile.balance -= 1000000;
                    fishingRods.fishingRod = 2;
                    desc += `<@${userId}> just purchased a **Great Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Caramel Salmon!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Great Rod";
            }
            await interaction.editReply(desc);

        }else if(option_selected == "superrod"){
            if(userProfile.balance >= 2500000){
                if(fishFound.gengarfish >= 5){
                    userProfile.balance -= 2500000;
                    fishingRods.fishingRod = 3;
                    desc += `<@${userId}> just purchased a **Super Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Gengarfish!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Super Rod";
            }
            await interaction.editReply(desc);

        }else if(option_selected == "ultrarod"){
            if(userProfile.balance >= 10000000){
                if(fishFound.weltfish >= 5){
                    userProfile.balance -= 10000000;
                    fishingRods.fishingRod = 4;
                    desc += `<@${userId}> just purchased a **Ultra Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Weltfish!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Ultra Rod";
            }
            await interaction.editReply(desc);

        }else if(option_selected == "masterrod"){
            if(userProfile.balance >= 50000000){
                if(fishFound.lustzephyr >= 5){
                    userProfile.balance -= 50000000;
                    fishingRods.fishingRod = 5;
                    desc += `<@${userId}> just purchased a **Master Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Lustrous Zephyrfish!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Master Rod";
            }
            await interaction.editReply(desc);

        }else if(option_selected == "championrod"){
            if(userProfile.balance >= 250000000){
                if(fishFound.milotic >= 5){
                    userProfile.balance -= 250000000;
                    fishingRods.milotic = 5;
                    desc += `<@${userId}> just purchased a **Champions Rod!!!**`;
                }else{
                    desc += "You have **NOT** caught enough Milotic!!!";
                }
            }else{
                desc += "You do **NOT** have enough to purchase the Champions Rod";
            }
            await interaction.editReply(desc);

        }else{
            await interaction.editReply("Invalid Input/Not Available Yet.");
            
        }

        await Promise.all([userProfile.save(), fishingRods.save()]);
        

    } catch (error) {
        console.log(`Error handling /buyfishingrod: ${error}`);
    }        
 },
    data: {
        name: 'buyfishingrod',
        description: 'buy a fishing rod',
        options: [
            {
                name: 'fishingrod',
                description: 'options: (info, goodrod, greatrod, superrod, ultrarod, masterrod, championrod, kingrod, legendrod .)',
                type: 3,
                default: "info",
                required: true,
            },
        ]
    }
}