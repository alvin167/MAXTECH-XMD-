async function githubCommand(sock, chatId) {
    const repoInfo = `*[𝐌𝐀𝐗𝐓𝐄𝐂𝐇_𝐗𝐌𝐃]*

*📂 GitHub Repository:*
https://github.com/Maxtech254/MAXTECH-XMD-/forks  

*📢 Official Channel:*
https://whatsapp.com/channel/0029VbB67yD1dAw1pUSonz3S
_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand;
