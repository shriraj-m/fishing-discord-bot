const LinesBets = require('../../schemas/LinesBets');
const LinesData = require('../../schemas/LinesData');
const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    run: async ({interaction}) => {
        try {
            const userId = interaction.user.id;
            const line_title = interaction.options.getString('title').toLowerCase();
            const line_winner = interaction.options.getString('title').toLowerCase();
            const creation_val = interaction.options.getInteger('creation_id');
            const lineName = line_title;
            const creationId = creation_val;
            
            let userProfile = await UserProfile.findOne({ userId, });
            let linesData = await LinesData.findOne({ lineName, });
            
            if (!interaction.inGuild()) {
                interaction.reply({
                    content: "This command can only be executed inside a server.",
                    ephemeral: true,
                });
                return;
            }
            await interaction.deferReply();

            if(userId != 571813905551065119 && userId != 401571571862339586){
                interaction.editReply('sorry, you are not mandu or nowie.');
                return;
            }

        } catch (error) {
            console.log(`Error handling /endlines ${error}`);
        }        
    },

    data: {
        name: 'endlines',
        description: 'end a specific line and send the payouts. ',
        options: [{ 
            name: 'title',
            description: 'title of the line you want to end',
            type: 3,
            required: true,
            }, 
            { 
            name: 'ou',
            description: 'did over or under win',
            type: 3,
            required: true,
            },
            {
            name: 'creation_id',
            description: 'creation id for dev',
            type: 4,
            required: true,
            }, 
        ],
    }
    
}
