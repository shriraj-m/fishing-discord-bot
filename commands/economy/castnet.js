const {EmbedBuilder} = require('discord.js');
const Cooldowns = require('../../schemas/Cooldowns');
const UserProfile = require('../../schemas/UserProfile');
const FishFound = require('../../schemas/FishFound');
const FishingRods = require('../../schemas/UserFishingInfo');
const UserArtifacts = require('../../schemas/UserArtifacts');
const JackpotFish = require('../../schemas/JackpotFish');
const UserHazmatInfo = require('../../schemas/UserHazmatInfo');
const MysteryEgg = require('../../schemas/MysteryEgg');


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
    {fish: "Turtle", price: 25, lW: 5, hW: 30, rod: 0 },
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
    {fish: "Kirby", price: 30, lW: 25, hW: 30, rod: 0 },
    {fish: "Lightfish", price: 25, lW: 1, hW: 10, rod: 0 },
    {fish: "Marblefish", price: 20, lW: 25, hW: 35, rod: 0 },
    {fish: "Paddlefish", price: 25, lW: 5, hW: 15, rod: 0 },
    {fish: "Oxygen Cell (25%)", price: 20, lW: 10, hW: 15, rod: 0 },
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
    {fish: "Sapphire Gemstonefish", price: 65, lW: 25, hW: 75, rod: 0 },
    {fish: "Ruby Gemstonefish", price: 60, lW: 25, hW: 75, rod: 0 },
    {fish: "Emerald Gemstonefish", price: 70, lW: 25, hW: 75, rod: 0 },
    {fish: "Topaz Gemstonefish", price: 60, lW: 25, hW: 75, rod: 0 },
    {fish: "Citrine Gemstonefish", price: 50, lW: 25, hW: 75, rod: 0 },
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
    {fish: "Oxygen Cell (50%)", price: 50, lW: 10, hW: 15, rod: 0 },
    {fish: "Scorpionfish", price: 55, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Weltfish", price: 90, lW: 10, hW: 15, rod: 3 },
    {fish: "Lustrous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
    {fish: "Luminous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
]

const epicFish = [
    {fish: "Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Mbappefish", price: 125, lW: 5, hW: 20, rod: 0 },
    {fish: "Aurafish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Motionfish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Stalinefish", price: 135, lW: 5, hW: 20, rod: 0 },
    {fish: "Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Sl1ckfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Goldfish (The Species)", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Goldfish (The Snack)", price: 105, lW: 0.1, hW: 0.1, rod: 0 },
    {fish: "Rosetoyfish", price: 165, lW: 1, hW: 2, rod: 0 },
    {fish: "Madelyn-Clinefish", price: 165, lW: 130, hW: 150, rod: 0 },
    {fish: "Oxygen Cell (75%)", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Elder Guardian", price: 140, lW: 75, hW: 125, rod: 1 },
    {fish: "Makifish", price: 125, lW: 155, hW: 155, rod: 1 },
    {fish: "Diamond Catfish", price: 150, lW: 25, hW: 150, rod: 1 },
    {fish: "Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Kanto Kenta Kahuna", price: 145, lW: 60, hW: 280, rod: 2 },
]

const legendaryFish = [
    {fish: "Narwhal", price: 80, lW: 1500, hW: 2500, rod: 0 },
    {fish: "Messifish", price: 325, lW: 10, hW: 20, rod: 0 },
    {fish: "Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Giant Squid", price: 170, lW: 300, hW: 1000, rod: 0 },
    {fish: "Oxygen Cell (100%)", price: 520, lW: 10, hW: 15, rod: 0 },
    {fish: "Le-Sunshine", price: 300, lW: 200, hW: 300, rod: 0 },
    {fish: "Sapphire Catfish", price: 400, lW: 50, hW: 200, rod: 1 },
    {fish: "Ruby Catfish", price: 400, lW: 45, hW: 200, rod: 1 },
    {fish: "Emerald Catfish", price: 400, lW: 55, hW: 200, rod: 1 },
    {fish: "Topaz Catfish", price: 400, lW: 60, hW: 200, rod: 1 },
    {fish: "Yunjinfish", price: 500, lW: 117, hW: 117, rod: 1 },
    {fish: "Tole Tole", price: 340, lW: 15, hW: 20, rod: 1 },
    {fish: "Chaewonfish", price: 500, lW: 93, hW: 93, rod: 1 },
    {fish: "Numby", price: 310, lW: 15, hW: 25, rod: 1 },
]

const exoticFish = [
    {fish: "Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Satorufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Sugurufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Blue Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
    {fish: "Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Platinum Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    {fish: "Swimsuit Acheron", price: 3000, lW: 140, hW: 140, rod: 2},
]


const commonRelic = [
    {fish: "Music Note", price: 1, lW: 10, hW: 10, rod: 0 },
]

const uncommonRelic = [
    {fish: "Shiny Hook", price: 1, lW: 5, hW: 5, rod: 0 },
]

const rareRelic = [
    {fish: "Sapphire Gem", price: 1, lW: 30, hW: 30, rod: 0 },
]

const exoticRelic = [
    {fish: "Poker Chip", price: 1, lW: 35, hW: 100, rod: 0 },
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

function determineFishing(){
    return true;
}

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

        const commandName = "castnet";
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;
        let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
        let cooldown = await Cooldowns.findOne({ userId, commandName });
        let fishFound = await FishFound.findOne({ userId, });
        let fishingRods = await FishingRods.findOne({ userId, });
        let userArtifacts = await UserArtifacts.findOne({ userId, });
        let jackpotFish = await JackpotFish.findOne({ guildId });
        let userHazmatInfo = await UserHazmatInfo.findOne({userId});
        let mysteryEgg = await MysteryEgg.findOne({userId});
        


        if(interaction.channelId != 1227330742523269142){ //fish = 1227273573727604848 //lake-azure-haven = 1227330742523269142
            await interaction.editReply(`please head to <#1227330742523269142> to use this command`);
            return;
        }
        if(!fishFound){
            fishFound = new FishFound({userId})
        }
        if(!userProfile){
            userProfile = new UserProfile({userId});
        }
        if(!userArtifacts){
            userArtifacts = new UserArtifacts({userId});
        }
        if(!fishingRods){
            fishingRods = new FishingRods({userId})
        }
        if(!userHazmatInfo){
            userHazmatInfo = new UserHazmatInfo({userId})
        }
        if(fishingRods.castNet == -1){
            await interaction.editReply(`Sorry, you are unable to cast net for the time being.`);
            return;
        }
        if (cooldown && Date.now() < cooldown.endsAt) {
            const { default: prettyMs } = await import('pretty-ms'); 

            await interaction.editReply({
                content: `You can use /castnet again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
                ephemeral: true,
            });
            return;
        }
        if (!cooldown) {
            cooldown = new Cooldowns({userId, commandName});
        }

        let typeOfFish;
        const rodType = fishingRods.fishingRod;
        let text = "";
        let sellprice = 0;
        let fishEmbed = new EmbedBuilder();
        let maybeRelic;
        let relicName;
        let relicWeight;
        let relicStr;
        let rolls = Math.floor(generateRandomNumber(8,13))


        function determineMutation(){
            let mutate = Math.floor(generateRandomNumber(1, 31));
            let typeOfMutation = Math.floor(generateRandomNumber(1,101));
            console.log('mutating: ' + mutate);
            let result = "";
            let multimoney = 1;
            let multiweight = 1;
            if(mutate == 9){ 
                if(typeOfMutation >= 1 && typeOfMutation <= 15){
                    result += "***MUTATION X***\n";
                    multimoney = 15;
                    multiweight = 1;
                }else if(typeOfMutation >= 16 && typeOfMutation <= 30){
                    result += "***MUTATION Y***\n";
                    multiweight = 20;
                    multimoney = 1;
                }else if(typeOfMutation >= 31 && typeOfMutation <= 45){
                    result += "***MUTATION A***\n";
                    multiweight = 2;
                    multimoney = 10;
                }else if(typeOfMutation >= 46 && typeOfMutation <= 60){
                    result += "***MUTATION V***\n";
                    multiweight = 15;
                    multimoney = 5;
                }else if(typeOfMutation >= 61 && typeOfMutation <= 75){
                    result += "***MUTATION Z***\n";
                    multiweight = 10;
                    multimoney = 7.5;        
                }else if(typeOfMutation >= 76 && typeOfMutation <= 81){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += ":dna: ***Variant: ICE***\n";
                    multiweight = 1;
                    multimoney = 5;
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.iceshards++;
                        result += ":four_leaf_clover: You Found 1 Rare **Ice Shard\n**";
                    } 
                }else if(typeOfMutation >= 82 && typeOfMutation <= 87){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += ":dna: ***Variant: FIRE***\n";
                    multiweight = 1;
                    multimoney = 5;
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.fireshards++;
                        result += ":four_leaf_clover: You Found 1 Rare **Fire Shard\n**";
                    }         
                }else if(typeOfMutation >= 88 && typeOfMutation <= 93){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += ":dna: ***Variant: WIND***\n";
                    multiweight = 1;
                    multimoney = 5;  
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.windshards++;
                        result += ":four_leaf_clover: You Found 1 Rare **Wind Shard**\n";
                    }       
                }else if(typeOfMutation == 100 || typeOfMutation == 99){
                    result += ":dna: ***SUPER RARE VOID MUTATION***\n";
                    let decision = Math.floor(generateRandomNumber(1,11));
                    if(decision == 1){
                        fishFound.voidshards++;
                        result += ":four_leaf_clover: You Found 1 EXTREMELY Rare **Void Shard**\n";
                    }  
                    let firstRoll = Math.floor(generateRandomNumber(35, 101));
                    let secondRoll = Math.floor(generateRandomNumber(1,firstRoll+1));
                    multimoney = secondRoll;
                    multiweight = firstRoll - secondRoll;
                    result += `:dna: ***Variant: (${multimoney}-${multiweight})***\n`;
                }else if(typeOfMutation >= 94 && typeOfMutation <= 98){
                    result += "***VERY RARE MUTATION 8041***\n";
                    let decision = Math.floor(generateRandomNumber(1,3));
                    if(decision == 1){
                        result += ":dna: ***Variant: (XX)***\n";
                        multiweight = 80.41;
                        multimoney = 1;
                    }else{
                        result += ":dna: ***Variant: (XY)***\n";
                        multiweight = 1;
                        multimoney = 80.41;
                    }
                }
                return [1, result, multimoney, multiweight];
            }else{
                return [0, result, multimoney, multiweight];
            }
        }

        function decypher(artifact){
            let hasArtifact;
            let value;
            let text = artifact;
            hasArtifact = text.substring(0, text.indexOf('-'));
            value = text.substring(text.indexOf('-')+1, text.length);
            hasArtifact = parseInt(hasArtifact);
            value = parseFloat(value);
            return [hasArtifact, value];
        }
        
        function relic(rarity){
            let relicDecider = Math.floor(generateRandomNumber(1,101));
            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rarity, rodType)));
            let weight = generateRandomNumber(rarity[x].lW, rarity[x].hW + 0.1).toFixed(1);
            let str = "";
            if(relicDecider == 1){
                if(rarity[x].fish == "Poker Chip"){
                    let text = userArtifacts.pokerChip;
                    let previous = text.substring(text.indexOf('-')+1, text.length);
                    if(previous > weight){
                        str += `:star: *Your Current Relic Value is* ***Greater*** *Than This One.*\n`;
                        str += `:star: ***Not Replacing***`;
                    }else{
                        userArtifacts.pokerChip = `1-${weight}`;
                    }
                } 
                return [1, rarity[x].fish, weight, str];    
            }
            if(relicDecider <= 25){
                if(rarity[x].fish == "Sapphire Gem"){
                    userArtifacts.sapphireGem = `1-${weight}`;
                    str += `:star: *This one looks different, are its eyes made of Sapphire??!!*\n`
                    return [1, rarity[x].fish, weight, str];    
                }
            }
            if(relicDecider <= 20){
                if(rarity[x].fish == "Music Note"){
                    userArtifacts.musicNote = `1-${weight}`;
                    str += `:star: *Looks Like Oshawott Was Carrying Something!!*\n`
                    return [1, rarity[x].fish, weight, str];    
                }else if(rarity[x].fish == "Shiny Hook"){
                    userArtifacts.shinyHook = `1-${weight}`;
                    str += `:star: *There's Something Shiny Stuck in the Turtle*\n`
                    return [1, rarity[x].fish, weight, str];    
                }
            }
            return [0, " ", 0, " "];
        }


        function fishing(typeOfFish, rodLevel, occurance){
            let skip = 0;
            let desc = "";
            let mRResult;
            let mRBool = 0;
            let mRMoney;
            let mRWeight;
            let money = 0;
            let moneyMade = 0;
            let upgradeL = 0;
            let upgradeR = 0;
            for(let i = 0; i < occurance; i++){
                if(determineFishing(rodLevel)){
                    let baseCommon = 41;
                    let baseUncommon = 42;
                    let hasSH, multiSH;
                    [hasSH, multiSH] = decypher(userArtifacts.shinyHook);
                    if(hasSH == 1){
                        console.log("has artifact");
                        baseCommon -= multiSH;
                        baseUncommon -= multiSH;
                    }
                    typeOfFish = Math.floor(generateRandomNumber(1,101)); //determines rarity of fish   
                    console.log("fish: " + typeOfFish);   
                    if(typeOfFish >= 2 && typeOfFish <= 41){
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(commonFish, rodLevel)));
                        let weight = generateRandomNumber(commonFish[x].lW, commonFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += `:radioactive: `;
                                desc += mRResult;
                                weight *= mRWeight;
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                        money = (commonFish[x].price * (1 + (weight * 0.1)));
                        if(mRBool == 1){ money *= mRMoney};
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
                        if(commonFish[x].fish == "Oshawott"){
                            [maybeRelic, relicName, relicWeight, relicStr] = relic(commonRelic);
                            if(maybeRelic == 1){
                                desc += `:trophy: ***RARE ARTIFACT!!!!***\n`;
                                desc += `:star: *Artifact:* ***${relicName}***\n`;
                                desc += `:star: *Value:*  ***${relicWeight}***\n`;
                                desc += relicStr;
                            }
                        }  
                        fishFound.common++;
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                            mysteryEgg.tracker++;
                        }
                    }else if(typeOfFish >= 42 && typeOfFish <= 71){
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(uncommonFish, rodLevel)));
                        let weight = generateRandomNumber(uncommonFish[x].lW, uncommonFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        fishEmbed.setColor(0xadf40b);
                        [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += `:radioactive: `;
                                desc += mRResult;
                                weight *= mRWeight;
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                        money = (uncommonFish[x].price * (3 + (weight * 0.1)));
                        if(uncommonFish[x].fish == "Oxygen Cell (25%)"){
                            desc += `:green_circle: **${uncommonFish[x].fish}**\n`;
                            userHazmatInfo.oxygencellValue += 25;
                        }else{
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `:green_circle: **${uncommonFish[x].fish}** `;
                            //-----------------good rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Koi"){
                                fishFound.koi++;
                                if(fishFound.koi <= 5){
                                    desc += `**(${fishFound.koi}/5)** `
                                }
                            }
                            //-------------------------------------------------------------

                            //-----------------great rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Caramel Salmon"){
                                fishFound.carasalmon++;
                                if(fishFound.carasalmon <= 5){
                                    desc += `**(${fishFound.carasalmon}/5)** `
                                }
                            }
                            //-------------------------------------------------------------

                            //-----------------super rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Gengarfish"){
                                fishFound.gengarfish++;
                                if(fishFound.gengarfish <= 5){
                                    desc += `**(${fishFound.gengarfish}/5)** `
                                }
                            }
                            //-------------------------------------------------------------
                            desc += `/ **${weight}** lbs / `;
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
                            if(uncommonFish[x].fish == "Turtle"){
                                [maybeRelic, relicName, relicWeight, relicStr] = relic(uncommonRelic);
                                if(maybeRelic == 1){
                                    desc += `:trophy: ***PRETTY RARE ARTIFACT!!!!***\n`;
                                    desc += `:star: *Artifact:* ***${relicName}***\n`;
                                    desc += `:star: *Value:*  ***${relicWeight}***\n`;
                                    desc += relicStr;
                                }
                            }     
                        }                   
                        fishFound.uncommon++;
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                            mysteryEgg.tracker++;
                        }
                    }else if(typeOfFish >= 72 && typeOfFish <= 86){
                        //rare
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rareFish, rodLevel)));
                        let weight = generateRandomNumber(rareFish[x].lW, rareFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += `:radioactive: `;
                                desc += mRResult;
                                weight *= mRWeight;
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                        money = (rareFish[x].price * (6 + (weight * 0.1)));
                        if(rareFish[x].fish == "Oxygen Cell (50%)"){
                            desc += `:blue_circle: **${rareFish[x].fish}**\n`;
                            userHazmatInfo.oxygencellValue += 50;
                        }else{
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `:blue_circle: **${rareFish[x].fish}** `;
                            //-----------------ultra rod capabilities-----------------------
                            if(rareFish[x].fish == "Weltfish"){
                                fishFound.weltfish++;
                                if(fishFound.weltfish <= 5){
                                    desc += `**(${fishFound.weltfish}/5)** `
                                }
                            }
                            //--------------------master rod capability----------------------
                            if(rareFish[x].fish == "Lustrous Zephyrfish"){
                                fishFound.lustzephyr++;
                                if(fishFound.lustzephyr <= 5){
                                    desc += `**(${fishFound.lustzephyr}/5)**`
                                }
                            }
                            //-------------------------------------------------------------
                            desc += `/ **${weight}** lbs / `;
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
                        }
                        moneyMade += parseFloat(money.toFixed(2));
                        if(rareFish[x].fish == "Sapphire Gemstonefish"){
                            [maybeRelic, relicName, relicWeight, relicStr] = relic(rareRelic);
                            if(maybeRelic == 1){
                                desc += `:trophy: ***VERY RARE ARTIFACT!!!!***\n`;
                                desc += `:star: *Artifact:* ***${relicName}***\n`;
                                desc += `:star: *Value:*  ***${relicWeight}***\n`;
                                desc += relicStr;
                            }
                        }
                        fishFound.rare++;
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                            mysteryEgg.tracker++;
                        }
                    }else if(typeOfFish >= 87 && typeOfFish <= 96){
                        //epic
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(epicFish, rodLevel)));          
                        let weight = generateRandomNumber(epicFish[x].lW, epicFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += `:radioactive: `;
                                desc += mRResult;
                                weight *= mRWeight;
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                        money = (epicFish[x].price * (10 + (weight * 0.1)));
                        if(epicFish[x].fish == "Oxygen Cell (75%)"){
                            desc += `:purple_circle: **${epicFish[x].fish}**\n`;
                            userHazmatInfo.oxygencellValue += 75;
                        }else{
                            if(mRBool == 1){ money *= mRMoney};
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
                            
                            fishFound.epic++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }  
                    }else if(typeOfFish >= 97 && typeOfFish <= 100){
                        //legendary
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(legendaryFish, rodLevel)));
                        let weight = generateRandomNumber(legendaryFish[x].lW, legendaryFish[x].hW + 0.1).toFixed(1);
                        let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                        let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                        fishEmbed.setColor(0xe58d31);
                        [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += `:radioactive: `;
                                desc += mRResult;
                                weight *= mRWeight;
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                        money = (legendaryFish[x].price * (25 + (weight * 0.1)));
                        if(legendaryFish[x].fish == "Oxygen Cell (100%)"){
                            desc += `:orange_circle: **${legendaryFish[x].fish}**\n`;
                            userHazmatInfo.oxygencellValue += 100;
                        }else{
                            if(mRBool == 1){ money *= mRMoney};
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
                        }
                        fishFound.legendary++;
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                            mysteryEgg.tracker++;
                        }
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                            mysteryEgg.tracker++;
                        }
                    }else if(typeOfFish == 1){
                        //exotic
                        [maybeRelic, relicName, relicWeight, relicStr] = relic(exoticRelic);
                        if(maybeRelic == 1){
                            desc += `:trophy: ***EXTREMELY RARE EXOTIC ARTIFACT!!!!***\n`;
                            desc += `:star: *Artifact:* ***${relicName}***\n`;
                            desc += `:star: *Value:*  ***${relicWeight}***\n`;
                            desc += relicStr;
                        }else{
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(exoticFish, rodLevel)));
                            let weight = generateRandomNumber(exoticFish[x].lW, exoticFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            if(exoticFish[x].fish == "Swimsuit Acheron"){ gender = 2; }
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += `:radioactive: `;
                                    desc += mRResult;
                                    weight *= mRWeight;
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (exoticFish[x].price * (50 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
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
                            fishFound.exotic++
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                mysteryEgg.tracker++;
                            }
                        }
                    }
                } 
            }    
            totalMoney = moneyMade;
            fishEmbed.setDescription(`*Total Value:* ***$${moneyMade.toLocaleString('en-US')}***`);
            console.log("testing total amount: " + totalMoney);      
            jackpotFish.value += (moneyMade/10);
            return [desc, moneyMade];
        }

        if(rodType >= 0){  //basic rod
            [text, sellprice] = fishing(typeOfFish, rodType, rolls);
            sellprice = (parseFloat((sellprice * 1).toFixed(2)));
            let sellpriceText = sellprice.toLocaleString('en-US');
            fishEmbed.setColor(0xC2B280);
            if(sellprice > 0){
                let hasArtifact, artifactMulti;
                // [hasArtifact, artifactMulti] = decypher(userArtifacts.pokerChip);
                // if(hasArtifact == 1){
                //     sellprice *= (1 + (artifactMulti/100));
                    sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                    fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
                // }
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 3_600_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});
        }

        userProfile.lastFishRan = new Date();
        console.log("user balance: " + (userProfile.balance.toFixed(2)));
        console.log("----------------------------")
        userProfile.balance += parseFloat(sellprice);
        await Promise.all([cooldown.save(), mysteryEgg.save(), userProfile.save(), fishFound.save(), fishingRods.save(), userArtifacts.save(), jackpotFish.save(), userHazmatInfo.save()]);

    } catch (error) {
        console.log(`Error handling /castnet: ${error}`);
    }
},

    data: {
        name: 'castnet',
        description: "cast a net to catch 8-12 fish!",
    }
}
