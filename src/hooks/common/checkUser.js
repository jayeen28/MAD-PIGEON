const checkRole = async (interaction) => {//check if the user is the owner or the admin
    const adminRole = process.env.ADMIN_ROLE;
    let availableRoles = interaction.member.roles.cache.map(r => r.name)
    const foundRole = availableRoles.filter(r => r.toLowerCase() === adminRole.toLowerCase());

    if (interaction.user.id === interaction.member.guild.ownerId || foundRole.length) {//if the user is the owner or the admin
        return { normalUser: false }
    }
    return { normalUser: true }
}

const isOwnReq = async (userInfo, interaction) => {//check if the normal user is the user who requested for the information.
    if (interaction.user.id === userInfo?.userId) {
        return true;
    }
    return false;
}

module.exports = { checkRole, isOwnReq }