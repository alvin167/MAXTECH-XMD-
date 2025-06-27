const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function aliveCommand(sock, chatId, message) {
    try {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: ' 𝕊ℙ𝔼𝔼𝔻' });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        const botInfo = `
┏━━   [𝐌𝐀𝐗𝐓𝐄𝐂𝐇_𝐗𝐌𝐃]   ━━┓
┃ ⏱️ Uptime   : ${uptimeFormatted}
┃ 💀 Version  : v${settings.version}
┃ 💀  status  : *ONLINE*
┃                     
┗━━━━━━━━━━━━━━━━┛`.trim();

        // Send image with caption
        await sock.sendMessage(chatId, {
            image: { url: 'https://files.catbox.moe/ibo6lv.jpg' },
            mimetype: 'image/jpeg',
            caption: botInfo,
            contextInfo: {
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400964601488@newsletter',
                    newsletterName: '𝐌𝐀𝐗𝐓𝐄𝐂𝐇_𝐗𝐌𝐃 BY 𝐌𝐀𝐗𝐓𝐄𝐂𝐇 𝐃𝐄𝐕 ',
                    serverMessageId: -1
                }
            },
            quoted: message
        });

        // Send audio as voice note
        await sock.sendMessage(chatId, {
            audio: { url: 'https://files.catbox.moe/v8fkap.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            quoted: message
        });

    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get bot status.' });
    }
}

module.exports = aliveCommand;
