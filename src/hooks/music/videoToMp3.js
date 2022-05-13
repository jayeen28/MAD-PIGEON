const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
    videoToMP3: async (link) => {
        const info = await ytdl.getInfo(link);
        const audio = info.formats.find(format => format.mimeType === 'audio/mp4; codecs="mp4a.40.2"' && format.audioBitrate === 128);
        if (!audio) throw new Error('No audio found.');
        return audio.url;
    }
}