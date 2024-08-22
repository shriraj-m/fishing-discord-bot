const UserProfile = require('../../schemas/UserProfile');
const UserArtifacts = require('../../schemas/UserArtifacts');
const FishFound = require('../../schemas/FishFound');
const MysteryEgg = require('../../schemas/MysteryEgg');
const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, UserSelectMenuBuilder, ActionRowBuilder } = require('discord.js');


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
            const userId = interaction.user.id;
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
            let userArtifacts = await UserArtifacts.findOne({ userId });
            let fishFound = await FishFound.findOne({ userId, });
            let mysteryEgg = await MysteryEgg.findOne({userId});

            if(!userArtifacts){
                userArtifacts = new UserArtifacts({userId});
            }
            if(!userProfile){
                userProfile = new UserProfile({userId});
            }
            if(!fishFound){
                fishFound = new FishFound({ userId, });
            }
            if(!mysteryEgg){
                mysteryEgg = new MysteryEgg({userId});
            }

            if(mysteryEgg.hasEgg == 0){
                interaction.reply({
                    content: "You Have **NOT** Caught a Mysterious Egg Yet. Please Fish One Up From <#1227330742523269142>", 
                    ephemeral: true,
                });
                return;
            }
            await interaction.deferReply();

            
            if(mysteryEgg.path == 0){
                const embed = new EmbedBuilder()
                    .setTitle("Mysterious Egg")
                    .setDescription('Carefully Select Which Task You Want to Complete....\nYour Task Might be Related to What it Hatches Into...')
                    .setColor(0xe166ff);
                
                const selectEmbed = new EmbedBuilder()
                    .setTitle("Mysterious Egg")
                    .setColor(0xe166ff);

                const task = new StringSelectMenuBuilder()
                .setCustomId('starter')
                .setPlaceholder('With path would you like to take?')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Catch 1,408 Fish.')
                        .setValue('hatch_wyvern'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Catch 22 Mutations.')
                        .setValue('hatch_wyrm'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Catch 31 Exotic/Legendary Fish')
                        .setValue('hatch_dragon'),
                );

                const row = new ActionRowBuilder()
                    .addComponents(task);
                
                const initialMessage = await interaction.editReply({
                    embeds: [embed],
                    components: [row],
                });

                
                // const initialUserInteraction = await reply.awaitMessageComponent({time: 30_000});
                const collector = initialMessage.createMessageComponentCollector({filter: (i) => i.user.id === userId, componentType: ComponentType.StringSelect, time: 3_600_000 });
                

                collector.on('collect', async i => {
                    const selection = i.values[0];
                    if(selection == 'hatch_wyvern'){ // path 1
                        mysteryEgg.path = 1;
                        await Promise.all([mysteryEgg.save(),]);
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 1,408 Fish**\n`;
                        desc += `Your Mysterious Egg will Hatch Once You Complete This.\n`;
                        desc += `Run This Command Again to Track Your Progress.`;
                        selectEmbed.setDescription(desc);


                        await i.update({embeds: [selectEmbed], components: [],});
                    }else if(selection == 'hatch_dragon'){ // path 3
                        mysteryEgg.path = 3;
                        await Promise.all([mysteryEgg.save(),]);
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 31 Exotic/Legendary Fish**\n`;
                        desc += `Your Mysterious Egg will Hatch Once You Complete This.\n`;
                        desc += `Run This Command Again to Track Your Progress.`;
                        selectEmbed.setDescription(desc);



                        await i.update({desc, embeds: [selectEmbed], components: [],});
                    }else{ // path 2
                        mysteryEgg.path = 2;
                        await Promise.all([mysteryEgg.save(),]);
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 22 Mutations**\n`;
                        desc += `Your Mysterious Egg will Hatch Once You Complete This.\n`;
                        desc += `Run This Command Again to Track Your Progress.`;
                        selectEmbed.setDescription(desc);



                        await i.update({desc, embeds: [selectEmbed], components: [],});
                        return;
                    }
                    
                });
            }else{
                const embed = new EmbedBuilder()
                    .setTitle("Your Mysterious Egg Tracking")
                    .setColor(0xe166ff);
                    if(mysteryEgg.path == 1){ // path 1
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 1,408 Fish**\n`;
                        desc += `●～●～●～●～●～●～●～●\n`;
                        desc += `Your Progress:\n`;
                        if(mysteryEgg.tracker < 1408){
                            desc += `**(${mysteryEgg.tracker}/1408)**\n`;
                        }else{
                            desc += `*You've Completed Your Path*\n`;
                            desc += `*Your Egg Hatched Into A:* ***Baby Wyvern***!\n`;
                            mysteryEgg.path = 0;
                            mysteryEgg.hasEgg = 0;
                            mysteryEgg.tracker = 0;
                            desc += `*Hunts down a random bird and add's it to*\n`;
                            desc += `*your total sell price each time you /fish*\n`;
                            userArtifacts.wyvern = `1-1`;
                        }
                        embed.setDescription(desc);
                    }else if(mysteryEgg.path == 2){ // path 2
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 22 Mutations**\n`;
                        desc += `●～●～●～●～●～●～●～●\n`;
                        desc += `Your Progress:\n`;
                        if(mysteryEgg.tracker < 22){
                            desc += `**(${mysteryEgg.tracker}/22)**\n`;
                        }else{
                            desc += `*You've Completed Your Path*\n`;
                            desc += `*Your Egg Hatched Into A:* ***Baby Wyrm***!\n`;
                            mysteryEgg.path = 0;
                            mysteryEgg.hasEgg = 0;
                            mysteryEgg.tracker = 0;
                            desc += `*1.5x sell price multiplier when using /fish*\n`
                            userArtifacts.wyrm = `1-50`;
                        }
                        embed.setDescription(desc);
                    }else if(mysteryEgg.path == 3){ // path 3
                        let desc = `You Selected the Path:\n`;
                        desc += `**Catch 31 Exotic/Legnedary Fish**\n`;
                        desc += `●～●～●～●～●～●～●～●\n`;
                        desc += `Your Progress:\n`;
                        if(mysteryEgg.tracker < 31){
                            desc += `**(${mysteryEgg.tracker}/31)**\n`;
                        }else{
                            desc += `*You've Completed Your Path*\n`;
                            desc += `*Your Egg Hatched Into A:* ***Baby Dragon***!\n`;
                            mysteryEgg.path = 0;
                            mysteryEgg.hasEgg = 0;
                            mysteryEgg.tracker = 0;
                            desc += `*Adds 1 Oxygen each time you /fish*\n`
                            desc += `*Meaning, every 5 /fish will give you 1 /cavefish*\n`
                            userArtifacts.dragon = `1-100`;
                        }
                        embed.setDescription(desc);
                    }
                    interaction.editReply({
                        embeds: [embed],
                    })                
            }

        await Promise.all([mysteryEgg.save(), userArtifacts.save()]);

            
        } catch (error) {
            console.log(`Error handling /mysteriousegg: ${error}`);
        }        
    },

    data: {
        name: 'mysteriousegg',
        description: "once you obtain a Mysterious Egg, you can run this command.",
    }
}