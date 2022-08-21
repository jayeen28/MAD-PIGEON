const req = require("../../helpers/req");
const Alert = require('../../models/opensea/alert');
const handleDm = require("../common/handleDm");
const client = require("./client");

const sendAlert = async (alert) => {
    try {
        const { data } = await req({ method: 'GET', url: `${process.env.OPENSEA_API}/collection/${alert.collectionSlug}` });
        const floor_price = data.collection?.stats?.floor_price;
        const message = `Alert!
        Collection: mynft-ctosgoknax
        Current Price: ${floor_price}
        Your Targeted Price: ${alert.price}`;
        handleDm(alert.userId, message);
    }
    catch (e) {
        console.log(e)
    }
}

const processEvent = async event => {
    try {
        const alerts = await Alert.find({});
        const slugs = alerts.map(alert => alert.collectionSlug);
        const slug = event.payload?.collection?.slug;
        const isFound = slugs.includes(slug);
        if (!isFound) return;
        const alert = alerts[slugs.indexOf(slug)];
        sendAlert(alert);
    }
    catch (e) {

    }
}

client.onItemListed('*', processEvent);

const saveAlert = async (floor_price, data, interaction) => {
    if (!floor_price) return interaction.reply({ content: 'Floor price not found at opensea.', ephemeral: true });
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
        req({ method: 'GET', url: `${process.env.OPENSEA_API}/collection/${data.collectionslug}` })
            .then((res) => saveAlert(res.data.collection?.stats?.floor_price, data, interaction))
            .catch(e => { return e.response?.status === 404 && interaction.reply({ content: 'Collection not found.', ephemeral: true }) })
    }
    catch (e) {
        console.log(e);
    }
}