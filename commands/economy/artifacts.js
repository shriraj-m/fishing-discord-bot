const UserProfile = require('../../schemas/UserProfile');
const UserArtifacts = require('../../schemas/UserArtifacts');


module.exports = {
    run: async ({interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }
        
        try {
            await interaction.deferReply();
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

            const userId = interaction.user.id;
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
            let userArtifacts = await UserArtifacts.findOne({ userId });

            if(!userArtifacts){
                userArtifacts = new UserArtifacts({userId});
            }
            if(!userProfile){
                userProfile = new UserProfile({userId});
            }

            let hasMN, hasPC, hasSG, hasSH, hasWyrm, hasWyvern, hasDragon, hasS1P1, hasS1P2, hasS1P3, hasS1P4, hasS1P5;
            let multiMN, multiPC, multiSG, multiSH, multiWyrm, multiWyvern, multiDragon, multiS1P1, multiS1P2, multiS1P3, multiS1P4, multiS1P5;
            let desc = '';

            [hasS1P1, multiS1P1] = decypher(userArtifacts.s1p1);
            [hasS1P2, multiS1P2] = decypher(userArtifacts.s1p2);
            [hasS1P3, multiS1P3] = decypher(userArtifacts.s1p3);
            [hasS1P4, multiS1P4] = decypher(userArtifacts.s1p4);
            [hasS1P5, multiS1P5] = decypher(userArtifacts.s1p5);

            [hasMN, multiMN] = decypher(userArtifacts.musicNote);
            [hasPC, multiPC] = decypher(userArtifacts.pokerChip);
            [hasSG, multiSG] = decypher(userArtifacts.sapphireGem);
            [hasSH, multiSH] = decypher(userArtifacts.shinyHook);
            [hasWyrm, multiWyrm] = decypher(userArtifacts.wyrm);
            [hasWyvern, multiWyvern] = decypher(userArtifacts.wyvern);
            [hasDragon, multiDragon] = decypher(userArtifacts.dragon);

            if(hasMN == 0 && hasPC == 0 && hasSG == 0 && hasSH == 0 && hasS1P1 == 0 && hasS1P2 == 0 && hasS1P3 == 0 && hasS1P4 == 0 && hasS1P5 == 0){
                await interaction.editReply(`You currently don't own any artifacts...`);
                return;
            }else{
                desc += `**Artifacts**:\n`
                if(hasS1P1 == 1){
                    desc += `**S1 #1 Fisher**: 1.3x Price Multiplier When Fishing.\n`
                }
                if(hasS1P2 == 1){
                    desc += `**S1 #2 Fisher**: 1.25x Price Multiplier When Fishing.\n`
                }
                if(hasS1P3 == 1){
                    desc += `**S1 #3 Fisher**: 1.2x Price Multiplier When Fishing.\n`
                }
                if(hasS1P4 == 1){
                    desc += `**S1 #4 Fisher**: 1.15x Price Multiplier When Fishing.\n`
                }
                if(hasS1P5 == 1){
                    desc += `**S1 #5 Fisher**: 1.1x Price Multiplier When Fishing.\n`
                }
                if(hasMN == 1){
                    desc += `**Music Note**: 1.1x Price Multiplier When Fishing.\n`
                }
                if(hasPC == 1){
                    desc += `**Poker Chip**: ${1+parseFloat((multiPC/100).toFixed(2))}x Price Multiplier when Fishing.\n`
                }
                if(hasSG == 1){
                    desc += `**Sapphire Gem**: ${1+parseFloat((multiSG/100).toFixed(2))}x Price Multiplier when Fishing.\n`
                }
                if(hasSH == 1){
                    desc += `**Shiny Hook**: Slightly Reduced Odds of Catching Common Fish when Fishing\n`
                }
                if(hasWyrm == 1){
                    desc += `**Baby Wyrm**: ${1+parseFloat((multiWyrm/100).toFixed(2))}x Price Multiplier when Fishing.\n`
                }
                if(hasWyvern == 1){
                    desc += `**Baby Wyvern**: Hunt's a Bird and Add's it to your Sell Price for each /fish\n`;
                }
                if(hasDragon == 1){
                    desc += `**Baby Dragon**: Supplies you with 1 Oxygen every time you /fish. (So every 5 fish = 1 cavefish)\n`;
                }
                await interaction.editReply(desc);
            }
        } catch (error) {
            console.log(`Error handling /artifacts: ${error}`);
        }        
    },

    data: {
        name: 'artifacts',
        description: 'displays information on artifacts... if you have any >:)',
    }
}