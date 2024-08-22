const Cooldowns = require('../../schemas/Cooldowns');

module.exports = () => {
    setInterval(async () => {
        try {
            const cooldowns = await Cooldowns.find().select('endsAt');

            for(const cooldown of cooldowns){
                if (Date.now() < cooldown.endsAt) return;

                await Cooldowns.deleteOne({_id: cooldown._id });
            }
        } catch (error) {
            console.log(`Error clearing cooldowns ${error}`);
        }
    }, 3.6e6);
};