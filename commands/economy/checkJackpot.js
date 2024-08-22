const JackpotFish = require('../../schemas/JackpotFish');

module.exports = {
    run: async ({interaction}) => {
        if(!interaction.inGuild()){
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }
        try {
            const guildId = interaction.guild.id;
            let jackpotFish = await JackpotFish.findOne({ guildId });

            if(!jackpotFish){
                jackpotFish= new JackpotFish({guildId});
            }

            let worth = jackpotFish.value;
            worth = parseFloat(worth.toFixed(2)).toLocaleString('en-US');

            
            await interaction.deferReply();


            let desc = `*The Jackpot fish, currenty worth* ***$${worth}***, *still swims around the lake, waiting to be caught by a lucky fisherman... It was last caught* ***${jackpotFish.nextCatch}*** *fish ago...*`;
            await interaction.editReply(desc);
            desc = '';

        } catch (error) {
            console.log(`Error handling /checkjackpot : ${error}`)
        }        
    },
    data: {
        name: 'checkjackpot',
        description: 'see the monetary value of the jackpot fish.',
    }
}
