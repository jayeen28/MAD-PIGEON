const ytdl = require('ytdl-core');

module.exports = {
    videoToMP3: async (link) => {
        const info = await ytdl.getInfo(link);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        const audio = ytdl.chooseFormat(audioFormats, { quality: 'highestaudio' })
        if (!audio) return null;
        return audio.url;
    }
}