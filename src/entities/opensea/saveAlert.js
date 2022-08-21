const req = require("../../helpers/req");
const Alert = require('../../models/opensea/alert');

const saveAlert = async (floor_price, data, interaction) => {
    if (data.price <= floor_price) return interaction.reply({ content: `Your desired price is already ${data.price < floor_price ? 'lower than' : 'equal to'} the current floor price.`, ephemeral: true });
    const alert = new Alert({
        userId: interaction.user?.id,
        collectionSlug: data.collectionslug,
        price: data.price
    });
    await alert.save();
    interaction.reply({ content: 'Alert created.', ephemeral: true });
}

module.exports = async (interaction) => {
    try {
        let data = {};
        interaction.options?._hoistedOptions.forEach(option => data[option.name] = option.value);
        data.price = parseFloat(data.price);
        if (isNaN(data.price)) return interaction.reply({ content: 'Invalid price.', ephemeral: true });
        await req({ method: 'GET', url: `https://api.opensea.io/collection/${data.collectionslug}` })
            .then((res) => saveAlert(res.data.collection?.stats?.floor_price, data, interaction))
            .catch(e => e.response?.status === 404 && interaction.reply({ content: 'Collection not found.', ephemeral: true }))
    }
    catch (e) {
        console.log(e)
        interaction.reply({ content: 'Something went wrong.', ephemeral: true });
    }
}