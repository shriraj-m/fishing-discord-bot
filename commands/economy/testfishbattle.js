const { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const UserProfile = require('../../schemas/UserProfile');
// const Cooldowns = require('../../schemas/Cooldowns');
const FishingRods = require('../../schemas/UserFishingInfo');
const FishBattleStats = require('../../schemas/FishBattleStats');

const choice = [
    {name: 'Fish', emoji: '🐟'},
    {name: 'Cancel', emoji: '❌'},
];

const newChoice = [
    {name: 'Fish', emoji: '🐟'},
];

const commonFish = [
    {fish: "Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Oshawott", price: 10, lW: 10, hW: 20, rod: 0 },
    {fish: "Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Golden Catfish", price: 80, lW: 5, hW: 120, rod: 0 },
    {fish: "Clownfish", price: 15, lW: 1, hW: 250, rod: 0 },
    {fish: "Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Rusted Tin Can", price: 1, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Tilapia", price: 5, lW: 0.5, hW: 6, rod: 0 },
    {fish: "Haddock", price: 10, lW: 2, hW: 10, rod: 0 },
    {fish: "Darkfish", price: 15, lW: 1, hW: 15, rod: 0 },
    {fish: "Mishu", price: 15, lW: 10, hW: 15, rod: 0 },
    {fish: "Dhufish", price: 20, lW: 5, hW: 25, rod: 0 },
    {fish: "Driftfish", price: 20, lW: 5, hW: 15, rod: 0 },
    {fish: "Dartfish", price: 15, lW: 1, hW: 5, rod: 0 },
    {fish: "Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Crucian Carp", price: 15, lW: 15, hW: 25, rod: 0 },
    {fish: "Inverted Clownfish", price: 22, lW: 15, hW: 25, rod: 0 },
    {fish: "Scalyfin", price: 14, lW: 15, hW: 25, rod: 0 },
    {fish: "Bitterling", price: 12, lW: 1, hW: 5, rod: 0 },
    {fish: "Parrotfish", price: 15, lW: 10, hW: 25, rod: 0 },
    {fish: "Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Arctic Char", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Bluefish", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Clown Knife Fish", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Ironfish", price: 30, lW: 1, hW: 8, rod: 2 },
    {fish: "Common Ling", price: 30, lW: 2, hW: 5, rod: 2 },
    {fish: "Crapple", price: 30, lW: 2, hW: 5, rod: 2 },
    {fish: "Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
]

const uncommonFish = [
    {fish: "Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Perch", price: 25, lW: 0.1, hW: 5, rod: 0 },
    {fish: "Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Crackfish", price: 24, lW: 15, hW: 25, rod: 0 },
    {fish: "Fentfish", price: 22, lW: 15, hW: 25, rod: 0 },
    // {fish: "AR-15", price: 25, lW: 10, hW: 15, rod: 0 },
    // {fish: "Vandal", price: 25, lW: 10, hW: 15, rod: 0 },
    {fish: "Kirby", price: 30, lW: 25, hW: 30, rod: 0 },
    {fish: "Lightfish", price: 25, lW: 1, hW: 10, rod: 0 },
    {fish: "Marblefish", price: 20, lW: 25, hW: 35, rod: 0 },
    {fish: "Paddlefish", price: 25, lW: 5, hW: 15, rod: 0 },
    {fish: "Pearl Perch", price: 30, lW: 1, hW: 15, rod: 1 },
    {fish: "Queen Snapper (Australian)", price: 30, lW: 1, hW: 10, rod: 1 },
    {fish: "Queen Snapper (Caribbean)", price: 30, lW: 1, hW: 10, rod: 1 },
    {fish: "Atlantic Salmon", price: 30, lW: 0.5, hW: 10, rod: 1 },
    {fish: "Caramel Salmon", price: 50, lW: 1, hW: 20, rod: 1 },
    {fish: "Gengarfish", price: 80, lW: 1, hW: 20, rod: 2 },
    {fish: "Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Mangrove Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Vermillion Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
]

const rareFish = [
    {fish: "Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Fortnite Shield Potion", price: 50, lW: 15, hW: 15, rod: 0 },
    {fish: "Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Pacific Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Guardian", price: 35, lW: 20, hW: 35, rod: 0 },
    {fish: "Colfish", price: 32, lW: 15, hW: 45, rod: 0 },
    {fish: "Dogfish", price: 34, lW: 20, hW: 45, rod: 0 },
    {fish: "Alligator", price: 30, lW: 25, hW: 45, rod: 0 },
    {fish: "Sea Gato", price: 35, lW: 8, hW: 16, rod: 0 },
    {fish: "Gurnard", price: 35, lW: 5, hW: 25, rod: 0 },
    {fish: "Scorpionfish", price: 55, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Weltfish", price: 90, lW: 10, hW: 15, rod: 3 },

]

const epicFish = [
    {fish: "Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Diamond Catfish", price: 150, lW: 25, hW: 150, rod: 1 },
    {fish: "Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Goldfish (The Species)", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Goldfish (The Snack)", price: 105, lW: 0.1, hW: 0.1, rod: 0 },
    {fish: "Elder Guardian", price: 140, lW: 75, hW: 125, rod: 1 },
    {fish: "Makifish", price: 125, lW: 155, hW: 155, rod: 1 },
    {fish: "Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Kanto Kenta Kahuna", price: 145, lW: 60, hW: 280, rod: 2 },
    // {fish: "Left Double Rod Upgrade1", price: 1, lW: 1, hW: 1, rod: 3 },
    // {fish: "Right Double Rod Upgrade1", price: 1, lW: 1, hW: 1, rod: 3 },
]

const legendaryFish = [
    // {fish: "ninjacookie1pt0", price: 125, lW: 40, hW: 100, rod: 0 },
    {fish: "Narwhal", price: 80, lW: 1500, hW: 2500, rod: 0 },
    {fish: "Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Chaewonfish", price: 500, lW: 93, hW: 93, rod: 1 },
    {fish: "Yunjinfish", price: 500, lW: 117, hW: 117, rod: 1 },
    {fish: "Tole Tole", price: 340, lW: 15, hW: 20, rod: 1 },
    {fish: "Giant Squid", price: 170, lW: 300, hW: 1000, rod: 0 },
    {fish: "Le-Sunshine", price: 300, lW: 200, hW: 300, rod: 0 },
    {fish: "Sapphire Catfish", price: 400, lW: 50, hW: 200, rod: 1 },
    {fish: "Ruby Catfish", price: 400, lW: 45, hW: 200, rod: 1 },
    {fish: "Emerald Catfish", price: 400, lW: 55, hW: 200, rod: 1 },
    {fish: "Topaz Catfish", price: 400, lW: 60, hW: 200, rod: 1 },
    // {fish: "Razer Viper Mini Signature Edition", price: 301, lW: 49, hW: 49, rod: 0 },
    // {fish: "A Bag of Crackers", price: 450, lW: 15, hW: 60, rod: 0 },
    // {fish: "Ethan 'Green Bean' P.", price: 500, lW: 165, hW: 193, rod: 0 },
    // {fish: "Seala", price: 350, lW: 120, hW: 150, rod: 1 },
    {fish: "Numby", price: 310, lW: 15, hW: 25, rod: 1 },
    // {fish: "Cockfish", price: 400, lW: 1, hW: 12, rod: 2 },
    // {fish: "KAY/O", price: 400, lW: 200, hW: 300, rod: 2 },
]

const exoticFish = [
    // {fish: "Asian Arowana", price: 1000, lW: 2, hW: 10, rod: 0 },
    {fish: "Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Satorufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Sugurufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Blue Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
    // {fish: "Pink Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
    {fish: "Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Platinum Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    // {fish: "Shriraj 'The Dev' M.", price: 5000, lW: 130, hW: 130, rod: 2},
    {fish: "Swimsuit Acheron", price: 3000, lW: 140, hW: 140, rod: 2},

]

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function loopThroughRarity(rarity, rodLevel){
    let counter = 0;
    for(const x in rarity){
        if(rarity[x].rod <= rodLevel){
            counter++
        }
    }
    return counter;
}

module.exports = {
    deleted: true,
    run: async ({ interaction }) => {
        /**
         * @param {Object} param0
         * @param {ChatInputCommandInteraction} param0.interaction
         */
        try {
            const targetUser = interaction.options.getUser('user');
            const userId = interaction.user.id;
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
            let targetUserProfile = await UserProfile.findOne({ userId: targetUser.id, });
            // let cooldown = await Cooldowns.findOne({ userId, commandName });
            let fishingRods = await FishingRods.findOne({ userId, });
            let userFishBattleStats = await FishBattleStats.findOne({ userId, });
            let targetFishBattleStats = await FishBattleStats.findOne({ userId: targetUser.id, });
            let amount_bet = interaction.options.getInteger('amount');
            let rolls = interaction.options.getInteger('fish');


            

            if(interaction.channelId != 1227366385332654091){
                await interaction.reply('head over to the <#1229572193902530580> to do this.');
                return;   
            }

            if(userId == targetUser.id){
                interaction.reply({
                    content: "You can't fish battle yourself...",
                    ephemeral: true,
                });
                return;
            }

            if(targetUser.id == 1201360534675673208){
                interaction.reply({
                    content: "You can't fish battle the bot...",
                    ephemeral: true,
                });
                return;
            }
            // if (cooldown && Date.now() < cooldown.endsAt) {
            //     const { default: prettyMs } = await import('pretty-ms'); 
    
            //     await interaction.editReply({
            //         content: `You can use /fishbattle again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
            //         ephemeral: true,
            //     });
            //     return;
            // }
            // if (!cooldown) {
            //     cooldown = new Cooldowns({userId, commandName});
            // }
            if(!userFishBattleStats){
                userFishBattleStats= new FishBattleStats({userId});
            }
            if(!targetFishBattleStats){
                targetFishBattleStats = new FishBattleStats({userId});
            }
            if(!userProfile){
                userProfile = new UserProfile({userId});
            }
            if(!fishingRods){
                fishingRods = new FishingRods({userId})
            }
            // if (cooldown && Date.now() < cooldown.endsAt) {
            // const { default: prettyMs } = await import('pretty-ms'); 

            // await interaction.editReply({
            //     content: `You can use /castnet again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
            //     ephemeral: true,
            // });
            // return;
            // }
            // if (!cooldown) {
            //     cooldown = new Cooldowns({userId, commandName});
            // }

            // console.log(userProfile.balance);
            // console.log(targetUserProfile.balance);
            if(amount_bet > userProfile.balance){
                interaction.reply({
                    content: "You can't bet more than your own balance....",
                    ephemeral: true,
                });
                return;
            }

            if(targetUserProfile.balance < amount_bet){
                interaction.reply({
                    content: "You can't bet more than the balance of the user you are trying to challenge....",
                    ephemeral: true,
                });
                return;
            }

            if(amount_bet < 0){
                interaction.reply({
                    content: "You can't bet negative numbers.....",
                    ephemeral: true,
                });
                return;
            }

            if(rolls < 1 ){
                interaction.reply({
                    content: "That number is invalid.....",
                    ephemeral: true,
                });
                return;
            }

            if(rolls > 4 ){
                interaction.reply({
                    content: "That number is invalid.....",
                    ephemeral: true,
                });
                return;
            }

            function fishing(rodLevel, occurance){
                let skip = 0;
                let desc = "";
                let money = 0;
                let moneyMade = 0;
                for(let i = 0; i < occurance; i++){
                    typeOfFish = Math.floor(generateRandomNumber(1,101)); //determines rarity of fish   

                    if(typeOfFish >= 2 && typeOfFish <= 41){
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(commonFish, rodLevel)));
                        let weight = generateRandomNumber(commonFish[x].lW, commonFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        money = (commonFish[x].price * (1 + (weight * 0.1)));
                        desc += `:white_circle: **${commonFish[x].fish}** / `;
                        desc += `**${weight}** lbs / `;
                        if(gender == 1){ 
                            desc += `**M**\n`;
                            money *= 1.2 
                        }
                        if(gender == 2){
                            desc += `**F** / `;
                            if(pregant == 69){
                                money *= 50;
                                desc += `**P**\n`
                            }else{
                                desc += `**NP**\n`
                            }
                        }
                        moneyMade += parseFloat(money.toFixed(2));

                        }else if(typeOfFish >= 42 && typeOfFish <= 71){
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(uncommonFish, rodLevel)));
                            let weight = generateRandomNumber(uncommonFish[x].lW, uncommonFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            money = (uncommonFish[x].price * (3 + (weight * 0.1)));
                            desc += `:green_circle: **${uncommonFish[x].fish}** / `;
                            desc += `**${weight}** lbs / `;
                            if(gender == 1){ 
                                desc += `**M**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `**F** / `;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `**P**\n`
                                }else{
                                    desc += `**NP**\n`
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));

                        }else if(typeOfFish >= 72 && typeOfFish <= 86){
                            //rare
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rareFish, rodLevel)));
                            let weight = generateRandomNumber(rareFish[x].lW, rareFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            money = (rareFish[x].price * (6 + (weight * 0.1)));
                            desc += `:blue_circle: **${rareFish[x].fish}** / `;
                            desc += `**${weight}** lbs / `;
                            if(gender == 1){ 
                                desc += `**M**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `**F** / `;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `**P**\n`
                                }else{
                                    desc += `**NP**\n`
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));

                        }else if(typeOfFish >= 87 && typeOfFish <= 96){
                            //epic
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(epicFish, rodLevel)));          
                            let weight = generateRandomNumber(epicFish[x].lW, epicFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            money = (epicFish[x].price * (10 + (weight * 0.1)));
                            desc += `:purple_circle: **${epicFish[x].fish}** / `;
                            desc += `**${weight}** lbs / `;
                            if(gender == 1){ 
                                desc += `**M**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `**F** / `;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `**P**\n`
                                }else{
                                    desc += `**NP**\n`
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));

                        }else if(typeOfFish >= 97 && typeOfFish <= 100){
                            //legendary
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(legendaryFish, rodLevel)));
                            let weight = generateRandomNumber(legendaryFish[x].lW, legendaryFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            money = (legendaryFish[x].price * (25 + (weight * 0.1)));
                            desc += `:orange_circle: **${legendaryFish[x].fish}** / `;
                            desc += `**${weight}** lbs / `;
                            if(gender == 1){ 
                                desc += `**M**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `**F** / `;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `**P**\n`
                                }else{
                                    desc += `**NP**\n`
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));
                            
                        }else if(typeOfFish == 1){
                            //exotic
                                let x = Math.floor(generateRandomNumber(0, loopThroughRarity(exoticFish, rodLevel)));
                                let weight = generateRandomNumber(exoticFish[x].lW, exoticFish[x].hW + 0.1).toFixed(1);
                                let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                                let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                                if(exoticFish[x].fish == "Swimsuit Acheron"){ gender = 2; }
                                money = (exoticFish[x].price * (50 + (weight * 0.1)));
                                desc += `:red_circle: **${exoticFish[x].fish}** / `;
                                desc += `**${weight}** lbs / `;
                                if(gender == 1){ 
                                    desc += `**M**\n`;
                                    money *= 1.2 
                                }
                                if(gender == 2){
                                    desc += `**F** / `;
                                    if(pregant == 69){
                                        money *= 50;
                                        desc += `**P**\n`
                                    }else{
                                        desc += `**NP**\n`
                                    }
                                }
                                moneyMade += parseFloat(money.toFixed(2));    
                        } 
                }
                moneyMade = parseFloat(moneyMade.toFixed(2))
                let finalPrice = moneyMade.toLocaleString('en-US') 
                desc += `Total Sell Price: **$${finalPrice}**`; 

                return [desc, moneyMade];
            }

            const fishBattleEmbed = new EmbedBuilder()
                .setTitle(`🎣 **FISH BATTLE: $${(amount_bet).toLocaleString("en-US")}** ⚔️`)
                .setDescription(`<@${userId}> **VS.** ${targetUser}.\n Waiting on ${targetUser} to Select an Option.`)
                .setColor(0x0037D6)
                .setTimestamp(new Date())
            

            const button = choice.map((select) => {
                    const choices = new ButtonBuilder()
                    .setCustomId(select.name)
                    .setLabel(select.name)
                    if(select.name == "Fish"){
                        choices.setStyle(ButtonStyle.Success)
                    }else{
                        choices.setStyle(ButtonStyle.Danger)
                    }
                    return choices;
            });

            const row = new ActionRowBuilder().addComponents(button);

            let desc = `<@${userId}> **CHALLENGED** ${targetUser} to a **FISH BATTLE**\n`;
            

            // desc += `Waiting for ${targetUser} to Select an Option\n`
            // fishBattleEmbed.addFields({name: `Amount Bet: $${(amount_bet).toLocaleString("en-US")}`, value: `Waiting for ${targetUser} to Select an Option`});

            const reply = await interaction.reply({
                content: desc,
                embeds: [fishBattleEmbed],
                components: [row],
            });
            


            const targetUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === targetUser.id,
                time: 30_000,
            }).catch( async (error) => {
                const endEmbed = new EmbedBuilder()
                .setTitle(`~~🎣 **FISH BATTLE: $${(amount_bet).toLocaleString("en-US")}** ⚔️~~`)
                .setColor(0x0037D6)
                .setDescription(`${targetUser} did not respond in time (30 sec).`)
                .setTimestamp(new Date());
                await reply.edit({embeds: [endEmbed], components: [] });
            });
            if(!targetUserInteraction) return;

            const targetUserChoice = choice.find(
                (select) => select.name === targetUserInteraction.customId,
            );
            if(targetUserChoice.name == "Fish"){
                await Promise.all([targetUserProfile.save(), userProfile.save()]);
                let userProfileFixed = await UserProfile.findOne({ userId: interaction.member.id, });
                let targetUserProfileFixed = await UserProfile.findOne({ userId: targetUser.id, });
                if(targetUserProfileFixed.balance < amount_bet){
                    await reply.edit({
                        content: `${targetUser} does not have enough money to partake in this bet....`,
                        embeds: [], 
                        components: []})
                    return;
                }
                if(userProfileFixed.balance < amount_bet){
                    // await Promise.all([targetUserProfile.save()]);
                    await reply.edit({
                        content: `<@${userId}> does not have enough money to partake in this bet....`,
                        embeds: [], 
                        components: []})
                    return;
                }
            }

            if(targetUserChoice.name == "Cancel"){
                const endEmbed = new EmbedBuilder()
                .setTitle(`~~🎣 **FISH BATTLE: $${(amount_bet).toLocaleString("en-US")}** ⚔️~~`)
                .setColor(0x0037D6)
                .setDescription(`${targetUser} **CANCELED** The Battle... *bitch*`)
                .setTimestamp(new Date());
                await reply.edit({embeds: [endEmbed], components: []})
                return;
            }

            let text1, sellprice1;
            [text1, sellprice1] = fishing(fishingRods.fishingRod, rolls);
            targetUserProfile.balance -= amount_bet;
            userProfile.balance -= amount_bet;
            await Promise.all([userProfile.save()]);
            await Promise.all([targetUserProfile.save()]);


            // await targetUserInteraction.reply({
            //     content: `${targetUser} accepted the battle. Fishing now.`,
            // })


            //edit embed with user turn
            const newButton = newChoice.map((select) => {
                const choices = new ButtonBuilder()
                .setCustomId(select.name)
                .setLabel(select.name)
                choices.setStyle(ButtonStyle.Success)
                return choices;
            });

            const newRow = new ActionRowBuilder().addComponents(newButton);

            const FishEmbed = new EmbedBuilder()
                .setTitle(`🎣 **FISH BATTLE: $${(amount_bet).toLocaleString("en-US")}** ⚔️`)
                .setColor(0x0037D6)
                .setDescription(`It's currently <@${userId}> turn.`)
                .addFields({name: '●～●～●～●～●～●～●～●', value: `${targetUser} Caught:\n` + text1})
                .setTimestamp(new Date());
                await reply.edit({embeds: [FishEmbed], components: [newRow]});


            const initialUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === userId,
                time: 30_000,
            }).catch( async (error) => {
                targetUserProfile.balance += amount_bet;
                targetUserProfile.balance += amount_bet;
                await Promise.all([targetUserProfile.save()]);
                const endEmbed = new EmbedBuilder()
                .setTitle(`~~🎣 **FISH BATTLE: $${(amount_bet).toLocaleString("en-US")}** ⚔️~~`)
                .setColor(0x0037D6)
                .setDescription(`<@${userId}> pussied out...\n${targetUser} wins by default. >:)`)
                .setTimestamp(new Date());
                await reply.edit({embeds: [endEmbed], components: [] });
            });

            if(!initialUserInteraction) return;


            const initialUserChoice = choice.find(
                (select) => select.name === initialUserInteraction.customId,
            );


            let text2, sellprice2;
            [text2, sellprice2] = fishing(fishingRods.fishingRod, rolls);

            // await initialUserInteraction.reply({
            //     content: `<@${userId}> is Fishing now.\n`,
            // })

            FishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: `<@${userId}> Caught:\n` + text2});
            FishEmbed.setDescription(' ');

            let userProfileFixed = await UserProfile.findOne({ userId: interaction.member.id, });
            let targetUserProfileFixed = await UserProfile.findOne({ userId: targetUser.id, });

            if(sellprice1 > sellprice2){
                FishEmbed.setColor(0xCB2F59);
                FishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: `${targetUser} **WINS: $${(amount_bet*2).toLocaleString("en-US")}**`});
                targetUserProfileFixed.balance += amount_bet;
                targetUserProfileFixed.balance += amount_bet;
                userFishBattleStats.losses++;
                targetFishBattleStats.wins++;
                // cooldown.endsAt = Date.now() + 60_000;
                await Promise.all([userProfileFixed.save(), targetUserProfileFixed.save()]);

            }else if(sellprice1 < sellprice2){
                FishEmbed.setColor(0x40A124);
                FishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: `<@${userId}> **WINS: $${(amount_bet*2).toLocaleString("en-US")}**`});
                userProfileFixed.balance += amount_bet;
                userProfileFixed.balance += amount_bet;
                userFishBattleStats.wins++;
                targetFishBattleStats.losses++;
                // cooldown.endsAt = Date.now() + 60_000;
                await Promise.all([userProfileFixed.save(), targetUserProfileFixed.save()]);


            }else{
                FishEmbed.setColor(0x949494);
                FishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: `**TIE!?!?!!**`});
                userProfileFixed.balance += amount_bet;
                targetUserProfileFixed.balance += amount_bet;
                // cooldown.endsAt = Date.now() + 60_000;
                await Promise.all([userProfileFixed.save(), targetUserProfileFixed.save()]);
            }

            await reply.edit({embeds: [FishEmbed], components: [] });

            // await Promise.all([cooldown.save(), userProfile.save()]);
            await Promise.all([userProfile.save(), targetUserProfile.save(), targetFishBattleStats.save(), userFishBattleStats.save()]);


            
        } catch (error) {
            console.log(`Error handling /fishbattle: ${error}`);
        }        
    },

    data: {
        name: 'testfishbattle',
        description: 'battle another user, winner is the person that fishes the most valuable fish.',
        options: [
            {
                name: 'user',
                description: 'user you want to fight',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'amount',
                description: 'amount to bet',
                type: 4,
                required: true,
            },
            {
                name: 'fish',
                description: 'amount of fish to roll (1-4)',
                type: 4,
                required: true,
            },
        ]
    }
}
