const LinesData = require('../../schemas/LinesData');
const UserProfile = require('../../schemas/UserProfile');


module.exports = {
    run: async ({interaction}) => {     
        try {

            const userId = interaction.user.id;
            const line_title = interaction.options.getString('title');
            const line_desc = interaction.options.getString('desc');
            const line_value = interaction.options.getNumber('value');
            const creation_val = interaction.options.getInteger('creation_id');
            const lineName = line_title;
            const descript = line_desc;
            const lineNumber = line_value;
            const creationId = creation_val;
            let realId = 0;
            
            let userProfile = await UserProfile.findOne({ userId, });
            let linesData = await LinesData.findOne({ userId });
            
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
            
            linesData = new LinesData({ userId, lineName, descript, lineNumber, realId, creationId})

            const organizedById = await LinesData
                .find()
                .sort({creationId: -1});

            console.log(organizedById.length);
            

            linesData.realId = organizedById.length + 1;


            await Promise.all([linesData.save(), userProfile.save()]);
            await interaction.editReply(`Created Line With\nTitle: **${line_title}**\nDesc: **${line_desc}**\nValue: **${line_value}**`);
        } catch (error) {
            console.log(`Error handling /createLines : ${error}`);
        }        
    },

    data: {
        name: 'createlines',
        description: 'create a line for betting. only accessible by few.',
        options: [{ 
            name: 'title',
            description: 'title of the line you want to create',
            type: 3,
            required: true,
            }, 
            {
            name: 'desc',
            description: 'description of the line.',
            type: 3,
            required: true,
            },
            {
            name: 'creation_id',
            description: 'creation id for dev',
            type: 4,
            required: true,
            }, 
            {
            name: 'value',
            description: 'betting value of the line.',
            type: 10,
            required: true,
            },
        ],
    }
}