const UserProfile = require('../../schemas/UserProfile');
const LinesData = require('../../schemas/LinesData');
const LinesBets = require('../../schemas/LinesBets');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
        let realId = 1;
        let linesData = await LinesData.findOne({ realId,});
        // let linesBets = await linesBets.findOne({ userId, });


        let linesEmbed = new EmbedBuilder()
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


        linesEmbed.setDescription(desc);


		const row = new ActionRowBuilder()
			.addComponents(next);
        await interaction.editReply({
            embeds: [linesEmbed],
            components: [row],
        });

    } catch (error) {
        console.log(`Error handling /lines: ${error}`);
    }
},
    data: {
        name: 'lines',
        description: 'Displays the current lines!',
    }
}