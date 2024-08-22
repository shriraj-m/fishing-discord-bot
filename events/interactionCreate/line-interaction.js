const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const LinesData = require('../../schemas/LinesData')

let realId = 2;
module.exports = (interaction) => {
    async function linesInteraction(){
        try {
            
            if(!interaction.isButton()) return;
            console.log('bit');
            let linesData = await LinesData.findOne({ realId });
            const amount_of_lines= await LinesData
            .find()
            .sort({realId: -1});
            await interaction.deferReply();
            console.log(amount_of_lines.length);
            if(realId > amount_of_lines.length){
                realId = 2;
                await interaction.editReply('There are no more lines. Please wait until more are posted!');
                return;
            }

            let linesEmbedEdit = new EmbedBuilder()
            .setTitle('1408 LINES!')
            .setColor(0xFFD700)


            const next = new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Next')
                .setEmoji('⏭️')
                .setStyle(ButtonStyle.Secondary);

            let desc = "";
            const tOL = linesData.lineName;
            const fl_tOL = tOL.charAt(0).toUpperCase();
            const c_tOL= fl_tOL + tOL.slice(1);
            desc += `Line Name: **${c_tOL}**\n`;
            const descOL = linesData.descript;
            desc += `Line Description: **${descOL}**.\n`;
            const ln_OL = linesData.lineNumber;
            desc += `Betting Line: **${ln_OL}**.`;


            linesEmbedEdit.setDescription(desc);


            const row = new ActionRowBuilder()
                .addComponents(next);
            console.log(realId);
            
            if(realId <= amount_of_lines.length+1){
                realId++;
            }
            

            await interaction.editReply({
                embeds: [linesEmbedEdit],
                components: [row],
            });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}