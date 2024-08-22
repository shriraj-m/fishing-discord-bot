const Cooldowns = require('../../schemas/Cooldowns');
const UserProfile = require('../../schemas/UserProfile');
const OresFound = require('../../schemas/OresFound');

let sumFromMining = 0;

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// ----------------------------Mining Stats--------------------------------

//  coal = $1; any number divisible by 2
//  iron = $15; any number divisible by 5
//  gold = $75; any number divisible by 9
//  diamond = $500; either 1, 100, 25, 50, or 75 
//  emerald = $7500; ONLY 809
//  very rares 
//  mithril = $25000; 427 or 727 twice
//  titanium = $100000; 3 rolls of either 333/666/999

let coalTracker = 0;
let ironTracker = 0;
let goldTracker = 0;
let diamondTracker = 0;
let emeraldTracker = 0;
let mithrilTracker = 0;
let titaniumTracker = 0;
let ifMithril = 0;
let ifTitanium = 0;

function mining(){
    // console.log(`----------------------------------------------`)
    // console.log('running mining command')
    for(let i = 0; i < 100; i++){
        let x = Math.floor(generateRandomNumber(1,1001));
        if(x == 427 || x == 727 || x == 333 || x == 666 || x == 999){
            console.log(`Interation ${i}`);
            console.log(`Number rolled: ${x}`);
        }
        if(x % 2 == 0){ //coal
            sumFromMining += 1;
            coalTracker++;
        }
        if(x % 5 == 0){ //iron
            sumFromMining += 5;
            ironTracker++;
        }
        if(x % 9 == 0) { //gold
            sumFromMining += 15;
            goldTracker++;
        }
        if(x == 1 || x == 100 || x == 25 || x == 50 || x == 75){ //diamond
            sumFromMining += 500;
            diamondTracker++;
        }
        if(x == 809){ //emerald
            sumFromMining += 7500;
            emeraldTracker++;
        }
        if(x == 427){ //mithril step1
            ifMithril++;
            console.log(`one half mithril found`);
        }
        if(x == 727){ //mithril step2
            ifMithril++;
            console.log(`one half mithril found`);
        }
        if(ifMithril > 0 && ifMithril % 2 == 0){ //mithril final
            sumFromMining += 25000;
            mithrilTracker++;
            console.log(`one mithril found`);
            ifMithril = 0;
        }
        if(x % 333 == 0){ //titanium step1
            ifTitanium++;
            console.log(`one part of titanium found`);
        }
        if(ifTitanium > 0 && ifTitanium % 3 == 0){ //titanium step2
            sumFromMining += 100000;
            titaniumTracker++;
            console.log(`one titanium found`);
            ifTitanium = 0;
        }
        //console.log(`Current Sum From Mining: ${sumFromMining}`);
    }
}


// ------------------------------------------------------------------------

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

        const commandName = "mine";
        const userId = interaction.user.id;
        let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
        let cooldown = await Cooldowns.findOne({ userId, commandName });
        let oresFound = await OresFound.findOne({ userId, });


        if(interaction.channelId != 1203552747610308649){ //test-mine: 1203771312040968222 \ mine: 1203552747610308649
            //await interaction.editReply(`Mine is closed.`);
            await interaction.editReply(`You cannot use this command in this channel, please head to the <#1203552747610308649>`);
            return;
        }else{
            await interaction.editReply(`Sorry, due to an accident, the mine is closed indefinitely.`);
            return;
        }
        if(!oresFound){
            oresFound = new OresFound({userId})
        }
        if(!userProfile){
            userProfile = new UserProfile({userId});
        }

        if (cooldown && Date.now() < cooldown.endsAt) {
            const { default: prettyMs } = await import('pretty-ms'); 

            await interaction.editReply({
                content: `You can use /mine again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
                ephemeral: true,
            });
            return;
        }

        if (!cooldown) {
            cooldown = new Cooldowns({userId, commandName});
        }
        

        mining();
        


        // console.log(`Coal found: ${coalTracker}`);
        // console.log(`Iron found: ${ironTracker}`);
        // console.log(`Gold found: ${goldTracker}`);
        // console.log(`Diamonds found: ${diamondTracker}`);
        console.log(`Emerald found: ${emeraldTracker}`);
        console.log(`Mithril found: ${mithrilTracker}`);
        console.log(`Titanium found: ${titaniumTracker}`);
        console.log(`----------------------------------------------`);
        
        userProfile.lastMineRan = new Date();
        cooldown.endsAt = Date.now() + 1_200_000;

        oresFound.coal += coalTracker;
        oresFound.iron += ironTracker;
        oresFound.gold += goldTracker;
        oresFound.diamond += diamondTracker;
        oresFound.emerald += emeraldTracker; 
        oresFound.mithril += mithrilTracker; 
        oresFound.titanium += titaniumTracker; 

        userProfile.balance += sumFromMining;

        await Promise.all([cooldown.save(), userProfile.save(), oresFound.save()]);

        let desc = `<@${userId}> found **$${sumFromMining}** in the mines.\nOres Found:\n`;
        desc += `Coal: **${coalTracker}**\n`;
        desc += `Iron: **${ironTracker}**\n`;
        if(goldTracker > 0){
            desc += `Gold: **${goldTracker}**\n`;
        }
        if(diamondTracker > 0){
            desc += `Diamond: **${diamondTracker}**\n`;
        }
        if(emeraldTracker > 0){
            desc += `Emerald: **${emeraldTracker}**\n`;
        }
        if(mithrilTracker > 0){
            desc += `Mithril: **${mithrilTracker}**\n`;
        }
        if(titaniumTracker > 0){
            desc += `Titanium: **${titaniumTracker}**\n`;
        }

        await interaction.editReply(desc);
        desc = '';
        //resets ---------------
        sumFromMining = 0;
        coalTracker = 0;
        goldTracker = 0;
        ironTracker = 0;
        diamondTracker = 0;
        emeraldTracker = 0;
        mithrilTracker = 0;
        titaniumTracker = 0;
        ifMithril = 0;
        ifTitanium = 0;
        //----------------------

    } catch (error) {
        console.log(`Error handling /mine: ${error}`);
    }
},

    data: {
        name: 'mine',
        description: "mine in the #mineshaft channel to make some money",
    }
}