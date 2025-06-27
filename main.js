const settings = require('./settings');
require('./config.js');
const { isBanned } = require('./lib/isBanned');
const yts = require('yt-search');
const { fetchBuffer } = require('./lib/myfunc');
const fs = require('fs');
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const path = require('path');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const { addWelcome, delWelcome, isWelcomeOn, addGoodbye, delGoodBye, isGoodByeOn } = require('./lib/index');

// Command imports
const tagAllCommand = require('./Anonycmd/tagall');
const { 
    autosCommand,
    autorCommand,
    autotCommand,
    autordCommand,
    handleTyping,
    handleRecording,
    handleRead 
} = require('./Anonycmd/auto');
const helpCommand = require('./Anonycmd/kiki');
const banCommand = require('./Anonycmd/ban');
const { promoteCommand } = require('./Anonycmd/promote');
const { demoteCommand } = require('./Anonycmd/demote');
const muteCommand = require('./Anonycmd/mute');
const unmuteCommand = require('./Anonycmd/unmute');
const stickerCommand = require('./Anonycmd/sticker');
const isAdmin = require('./lib/isAdmin');
const warnCommand = require('./Anonycmd/warn');
const warningsCommand = require('./Anonycmd/warnings');
const ttsCommand = require('./Anonycmd/tts');
const { tictactoeCommand, handleTicTacToeMove } = require('./Anonycmd/tictactoe');
const { incrementMessageCount, topMembers } = require('./Anonycmd/topmembers');
const getppCommand = require('./Anonycmd/getpp');
const ownerCommand = require('./Anonycmd/owner');
const deleteCommand = require('./Anonycmd/delete');
const { handleAntilinkCommand, handleLinkDetection } = require('./Anonycmd/antilink');
const { Antilink } = require('./lib/antilink');
const memeCommand = require('./Anonycmd/meme');
const tagCommand = require('./Anonycmd/tag');
const jokeCommand = require('./Anonycmd/joke');
const quoteCommand = require('./Anonycmd/quote');
const factCommand = require('./Anonycmd/fact');
const weatherCommand = require('./Anonycmd/weather');
const newsCommand = require('./Anonycmd/news');
const kickCommand = require('./Anonycmd/kick');
const simageCommand = require('./Anonycmd/simage');
const attpCommand = require('./Anonycmd/attp');
const { startHangman, guessLetter } = require('./Anonycmd/hangman');
const { startTrivia, answerTrivia } = require('./Anonycmd/trivia');
const { complimentCommand } = require('./Anonycmd/compliment');
const { insultCommand } = require('./Anonycmd/insult');
const { eightBallCommand } = require('./Anonycmd/eightball');
const { lyricsCommand } = require('./Anonycmd/lyrics');
const { dareCommand } = require('./Anonycmd/dare');
const { truthCommand } = require('./Anonycmd/truth');
const { clearCommand } = require('./Anonycmd/clear');
const pingCommand = require('./Anonycmd/ping');
const aliveCommand = require('./Anonycmd/alive');
const blurCommand = require('./Anonycmd/img-blur');
const welcomeCommand = require('./Anonycmd/welcome');
const goodbyeCommand = require('./Anonycmd/goodbye');
const githubCommand = require('./Anonycmd/github');
const { handleAntiBadwordCommand, handleBadwordDetection } = require('./lib/antibadword');
const antibadwordCommand = require('./Anonycmd/antibadword');
const { handleChatbotCommand, handleChatbotResponse } = require('./Anonycmd/chatbot');
const takeCommand = require('./Anonycmd/take');
const { flirtCommand } = require('./Anonycmd/flirt');
const characterCommand = require('./Anonycmd/character');
const wastedCommand = require('./Anonycmd/wasted');
const shipCommand = require('./Anonycmd/ship');
const groupInfoCommand = require('./Anonycmd/groupinfo');
const resetlinkCommand = require('./Anonycmd/resetlink');
const staffCommand = require('./Anonycmd/staff');
const unbanCommand = require('./Anonycmd/unban');
const emojimixCommand = require('./Anonycmd/emojimix');
const { handlePromotionEvent } = require('./Anonycmd/promote');
const { handleDemotionEvent } = require('./Anonycmd/demote');
const viewOnceCommand = require('./Anonycmd/viewonce');
const clearSessionCommand = require('./Anonycmd/clearsession');
const { autoStatusCommand, handleStatusUpdate } = require('./Anonycmd/autostatus');
const { simpCommand } = require('./Anonycmd/simp');
const { stupidCommand } = require('./Anonycmd/stupid');
const pairCommand = require('./Anonycmd/pair');
const stickerTelegramCommand = require('./Anonycmd/stickertelegram');
const textmakerCommand = require('./Anonycmd/textmaker');
const { 
    handleCommand,
    handleMessageRevocation,
    handleMessageEdit,
    storeMessage
} = require('./Anonycmd/antidelete');
const clearTmpCommand = require('./Anonycmd/cleartmp');
const setProfilePicture = require('./Anonycmd/setpp');
const instagramCommand = require('./Anonycmd/instagram');
const facebookCommand = require('./Anonycmd/facebook');
const playCommand = require('./Anonycmd/play');
const tiktokCommand = require('./Anonycmd/tiktok');
const songCommand = require('./Anonycmd/song');
const aiCommand = require('./Anonycmd/ai');

// Global settings
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "https://whatsapp.com/channel/0029VbB67yD1dAw1pUSonz3S";
global.ytch = "𝐌𝐀𝐗𝐓𝐄𝐂𝐇_𝐗𝐌𝐃";

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363400964601488@newsletter',
            newsletterName:'𝐌𝐀𝐗𝐓𝐄𝐂𝐇_𝐗𝐌𝐃',
            serverMessageId: -1
        }
    }
};

async function handleMessages(sock, messageUpdate, printLog) {
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');

        // Handle auto features for every message
        await handleTyping(sock, chatId);
        await handleRecording(sock, chatId);
        await handleRead(sock, message);

        // Store message for antidelete feature
        if (message.message) {
            storeMessage(message);
        }

        // Handle message revocation
        if (message.message?.protocolMessage?.type === 0) {
            await handleMessageRevocation(sock, message);
            return;
        }

        let userMessage = message.message?.conversation?.trim().toLowerCase() ||
            message.message?.extendedTextMessage?.text?.trim().toLowerCase() || '';
        userMessage = userMessage.replace(/\.\s+/g, '.').trim();

        // Only log command usage
        if (userMessage.startsWith('.')) {
            console.log(`📝 Command used in ${isGroup ? 'group' : 'private'}: ${userMessage}`);
        }

        // Check if user is banned (skip ban check for unban command)
        if (isBanned(senderId) && !userMessage.startsWith('.unban')) {
            if (Math.random() < 0.1) {
                await sock.sendMessage(chatId, {
                    text: '❌ You are banned from using the bot. Contact an admin to get unbanned.',
                    ...channelInfo
                });
            }
            return;
        }

        // First check if it's a game move
        if (/^[1-9]$/.test(userMessage) || userMessage.toLowerCase() === 'surrender') {
            await handleTicTacToeMove(sock, chatId, senderId, userMessage);
            return;
        }

        if (!message.key.fromMe) incrementMessageCount(chatId, senderId);

        // Check for bad words
        if (isGroup && userMessage) {
            await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
        }

        // Then check for command prefix
        if (!userMessage.startsWith('.')) {
            if (isGroup) {
                await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
                await Antilink(message, sock);
                await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
            }
            return;
        }

        // List of admin commands
        const adminCommands = ['.mute', '.unmute', '.ban', '.unban', '.promote', '.demote', '.kick', '.tagall', '.antilink'];
        const isAdminCommand = adminCommands.some(cmd => userMessage.startsWith(cmd));

        // List of owner commands
        const ownerCommands = ['.mode', '.autostatus', '.antidelete','.antiedit', '.cleartmp', '.setpp', '.clearsession'];
        const isOwnerCommand = ownerCommands.some(cmd => userMessage.startsWith(cmd));

        let isSenderAdmin = false;
        let isBotAdmin = false;

        // Check admin status only for admin commands in groups
        if (isGroup && isAdminCommand) {
            const adminStatus = await isAdmin(sock, chatId, senderId);
            isSenderAdmin = adminStatus.isSenderAdmin;
            isBotAdmin = adminStatus.isBotAdmin;

            if (!isBotAdmin) {
                await sock.sendMessage(chatId, { text: 'Please make the bot an admin to use admin commands.', ...channelInfo });
                return;
            }

            if (
                userMessage.startsWith('.mute') ||
                userMessage === '.unmute' ||
                userMessage.startsWith('.ban') ||
                userMessage.startsWith('.unban') ||
                userMessage.startsWith('.promote') ||
                userMessage.startsWith('.demote')
            ) {
                if (!isSenderAdmin && !message.key.fromMe) {
                    await sock.sendMessage(chatId, {
                        text: 'Sorry, only group admins can use this command.',
                        ...channelInfo
                    });
                    return;
                }
            }
        }

        // Check owner status for owner commands
        if (isOwnerCommand) {
            if (!message.key.fromMe) {
                await sock.sendMessage(chatId, {
                    text: '🚫 This command is only available for the owner!',
                    ...channelInfo
                });
                return;
            }
        }

        // Check access mode
        try {
            const data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (!data.isPublic && !message.key.fromMe) {
                return;
            }
        } catch (error) {
            console.error('Error checking access mode:', error);
        }

        // Command handlers
        switch (true) {
            case userMessage === '.simage': {
                const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                if (quotedMessage?.stickerMessage) {
                    await simageCommand(sock, quotedMessage, chatId);
                } else {
                    await sock.sendMessage(chatId, { text: 'Please reply to a sticker with the .simage command to convert it.', ...channelInfo });
                }
                break;
            }
            case userMessage.startsWith('.kick'):
                const mentionedJidListKick = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await kickCommand(sock, chatId, senderId, mentionedJidListKick, message);
                break;
            case userMessage.startsWith('.mute'):
                const muteDuration = parseInt(userMessage.split(' ')[1]);
                if (isNaN(muteDuration)) {
                    await sock.sendMessage(chatId, { text: 'Please provide a valid number of minutes.\neg to mute 10 minutes\n.mute 10', ...channelInfo });
                } else {
                    await muteCommand(sock, chatId, senderId, muteDuration);
                }
                break;
            case userMessage === '.unmute':
                await unmuteCommand(sock, chatId, senderId);
                break;
            case userMessage.startsWith('.ban'):
                await banCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.unban'):
                await unbanCommand(sock, chatId, message);
                break;
            case userMessage === '.help' || userMessage === '.menu' || userMessage === '.bot' || userMessage === '.list':
                await helpCommand(sock, chatId, global.channelLink);
                break;
            case userMessage === '.sticker' || userMessage === '.s':
                await stickerCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.warnings'):
                const mentionedJidListWarnings = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await warningsCommand(sock, chatId, mentionedJidListWarnings);
                break;
            case userMessage.startsWith('.warn'):
                const mentionedJidListWarn = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await warnCommand(sock, chatId, senderId, mentionedJidListWarn, message);
                break;
            case userMessage.startsWith('.tts'):
                const text = userMessage.slice(4).trim();
                await ttsCommand(sock, chatId, text);
                break;
            case userMessage === '.delete' || userMessage === '.del':
                await deleteCommand(sock, chatId, message, senderId);
                break;
            case userMessage.startsWith('.attp'):
                await attpCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.mode'):
                let data;
                try {
                    data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
                } catch (error) {
                    console.error('Error reading access mode:', error);
                    await sock.sendMessage(chatId, { text: 'Failed to read bot mode status', ...channelInfo });
                    return;
                }

                const currentMode = data.isPublic ? 'public' : 'private';
                await sock.sendMessage(chatId, {
                    text: `Current bot mode: *${currentMode}*\n\nUse commands:\n.public - Allow everyone to use bot\n.private - Restrict to owner only`,
                    ...channelInfo
                });
                break;
            case userMessage.startsWith('.public'):
            case userMessage.startsWith('.private'):
                if (!message.key.fromMe) {
                    await sock.sendMessage(chatId, { text: 'Only bot owner can use this command!', ...channelInfo });
                    return;
                }

                let modeData;
                try {
                    modeData = JSON.parse(fs.readFileSync('./data/messageCount.json'));
                } catch (error) {
                    console.error('Error reading access mode:', error);
                    await sock.sendMessage(chatId, { text: 'Failed to read bot mode status', ...channelInfo });
                    return;
                }

                const action = userMessage.startsWith('.public') ? 'public' : 'private';
                try {
                    modeData.isPublic = action === 'public';
                    fs.writeFileSync('./data/messageCount.json', JSON.stringify(modeData, null, 2));
                    await sock.sendMessage(chatId, { text: `Bot is now in *${action}* mode`, ...channelInfo });
                } catch (error) {
                    console.error('Error updating access mode:', error);
                    await sock.sendMessage(chatId, { text: 'Failed to update bot access mode', ...channelInfo });
                }
                break;
            case userMessage === '.owner':
                await ownerCommand(sock, chatId);
                break;
            case userMessage === '.tagall':
                if (isSenderAdmin || message.key.fromMe) {
                    await tagAllCommand(sock, chatId, senderId);
                } else {
                    await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use the .tagall command.', ...channelInfo });
                }
                break;
            case userMessage.startsWith('.tag'):
                const messageText = userMessage.slice(4).trim();
                const replyMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
                await tagCommand(sock, chatId, senderId, messageText, replyMessage);
                break;
            case userMessage.startsWith('.antilink'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, {
                        text: 'This command can only be used in groups.',
                        ...channelInfo
                    });
                    return;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, {
                        text: 'Please make the bot an admin first.',
                        ...channelInfo
                    });
                    return;
                }
                await handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin);
                break;
            case userMessage === '.meme':
                await memeCommand(sock, chatId);
                break;
            case userMessage === '.joke':
                await jokeCommand(sock, chatId);
                break;
            case userMessage === '.quote':
                await quoteCommand(sock, chatId);
                break;
            case userMessage === '.fact':
                await factCommand(sock, chatId);
                break;
            case userMessage.startsWith('.weather'):
                const city = userMessage.slice(9).trim();
                if (city) {
                    await weatherCommand(sock, chatId, city);
                } else {
                    await sock.sendMessage(chatId, { text: 'Please specify a city, e.g., .weather London', ...channelInfo });
                }
                break;
            case userMessage === '.news':
                await newsCommand(sock, chatId);
                break;
            case userMessage.startsWith('.ttt') || userMessage.startsWith('.tictactoe'):
                const tttText = userMessage.split(' ').slice(1).join(' ');
                await tictactoeCommand(sock, chatId, senderId, tttText);
                break;
            case userMessage.startsWith('.move'):
                const position = parseInt(userMessage.split(' ')[1]);
                if (isNaN(position)) {
                    await sock.sendMessage(chatId, { text: 'Please provide a valid position number for Tic-Tac-Toe move.', ...channelInfo });
                } else {
                    tictactoeMove(sock, chatId, senderId, position);
                }
                break;
            case userMessage === '.topmembers':
                topMembers(sock, chatId, isGroup);
                break;
            case userMessage.startsWith('.hangman'):
                startHangman(sock, chatId);
                break;
            case userMessage.startsWith('.guess'):
                const guessedLetter = userMessage.split(' ')[1];
                if (guessedLetter) {
                    guessLetter(sock, chatId, guessedLetter);
                } else {
                    sock.sendMessage(chatId, { text: 'Please guess a letter using .guess <letter>', ...channelInfo });
                }
                break;
            case userMessage.startsWith('.trivia'):
                startTrivia(sock, chatId);
                break;
            case userMessage.startsWith('.answer'):
                const answer = userMessage.split(' ').slice(1).join(' ');
                if (answer) {
                    answerTrivia(sock, chatId, answer);
                } else {
                    sock.sendMessage(chatId, { text: 'Please provide an answer using .answer <answer>', ...channelInfo });
                }
                break;
            case userMessage.startsWith('.compliment'):
                await complimentCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.insult'):
                await insultCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.8ball'):
                const question = userMessage.split(' ').slice(1).join(' ');
                await eightBallCommand(sock, chatId, question);
                break;
            case userMessage.startsWith('.lyrics'):
                const songTitle = userMessage.split(' ').slice(1).join(' ');
                await lyricsCommand(sock, chatId, songTitle);
                break;
            case userMessage.startsWith('.simp'):
                const quotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await simpCommand(sock, chatId, quotedMsg, mentionedJid, senderId);
                break;
            case userMessage.startsWith('.stupid') || userMessage.startsWith('.itssostupid') || userMessage.startsWith('.iss'):
                const stupidQuotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                const stupidMentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                const stupidArgs = userMessage.split(' ').slice(1);
                await stupidCommand(sock, chatId, stupidQuotedMsg, stupidMentionedJid, senderId, stupidArgs);
                break;
            case userMessage === '.dare':
                await dareCommand(sock, chatId);
                break;
            case userMessage === '.truth':
                await truthCommand(sock, chatId);
                break;
            case userMessage === '.clear':
                if (isGroup) await clearCommand(sock, chatId);
                break;
            case userMessage.startsWith('.promote'):
                const mentionedJidListPromote = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await promoteCommand(sock, chatId, mentionedJidListPromote, message);
                break;
            case userMessage.startsWith('.demote'):
                const mentionedJidListDemote = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await demoteCommand(sock, chatId, mentionedJidListDemote, message);
                break;
            case userMessage === '.ping':
                await pingCommand(sock, chatId);
                break;
            case userMessage === '.alive':
                await aliveCommand(sock, chatId);
                break;
            case userMessage.startsWith('.blur'):
                const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                await blurCommand(sock, chatId, message, quotedMessage);
                break;
            case userMessage.startsWith('.welcome'):
                if (isGroup) {
                    if (!isSenderAdmin) {
                        const adminStatus = await isAdmin(sock, chatId, senderId);
                        isSenderAdmin = adminStatus.isSenderAdmin;
                    }

                    if (isSenderAdmin || message.key.fromMe) {
                        await welcomeCommand(sock, chatId, message);
                    } else {
                        await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use this command.', ...channelInfo });
                    }
                } else {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo });
                }
                break;
            case userMessage.startsWith('.goodbye'):
                if (isGroup) {
                    if (!isSenderAdmin) {
                        const adminStatus = await isAdmin(sock, chatId, senderId);
                        isSenderAdmin = adminStatus.isSenderAdmin;
                    }

                    if (isSenderAdmin || message.key.fromMe) {
                        await goodbyeCommand(sock, chatId, message);
                    } else {
                        await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use this command.', ...channelInfo });
                    }
                } else {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo });
                }
                break;
            case userMessage === '.git':
            case userMessage === '.github':
            case userMessage === '.sc':
            case userMessage === '.script':
            case userMessage === '.repo':
                await githubCommand(sock, chatId);
                break;
            case userMessage.startsWith('.antibadword'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo });
                    return;
                }

                const adminStatus = await isAdmin(sock, chatId, senderId);
                isSenderAdmin = adminStatus.isSenderAdmin;
                isBotAdmin = adminStatus.isBotAdmin;

                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '*Bot must be admin to use this feature*', ...channelInfo });
                    return;
                }

                await antibadwordCommand(sock, chatId, message, senderId, isSenderAdmin);
                break;
            case userMessage.startsWith('.chatbot'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo });
                    return;
                }

                const chatbotAdminStatus = await isAdmin(sock, chatId, senderId);
                if (!chatbotAdminStatus.isSenderAdmin) {
                    await sock.sendMessage(chatId, { text: '*Only admins can use this command*', ...channelInfo });
                    return;
                }

                const match = userMessage.slice(8).trim();
                await handleChatbotCommand(sock, chatId, message, match);
                break;
            case userMessage.startsWith('.take'):
                const takeArgs = userMessage.slice(5).trim().split(' ');
                await takeCommand(sock, chatId, message, takeArgs);
                break;
            case userMessage === '.flirt':
                await flirtCommand(sock, chatId);
                break;
            case userMessage.startsWith('.character'):
                await characterCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.waste'):
                await wastedCommand(sock, chatId, message);
                break;
            case userMessage === '.ship':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups!', ...channelInfo });
                    return;
                }
                await shipCommand(sock, chatId, message);
                break;
            case userMessage === '.groupinfo' || userMessage === '.infogp' || userMessage === '.infogrupo':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups!', ...channelInfo });
                    return;
                }
                await groupInfoCommand(sock, chatId, message);
                break;
            case userMessage === '.resetlink' || userMessage === '.revoke' || userMessage === '.anularlink':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups!', ...channelInfo });
                    return;
                }
                await resetlinkCommand(sock, chatId, senderId);
                break;
            case userMessage === '.staff' || userMessage === '.admins' || userMessage === '.listadmin':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups!', ...channelInfo });
                    return;
                }
                await staffCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.emojimix') || userMessage.startsWith('.emix'):
                await emojimixCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.tg') || userMessage.startsWith('.stickertelegram') || userMessage.startsWith('.tgsticker') || userMessage.startsWith('.telesticker'):
                await stickerTelegramCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.getpp'):
                await getppCommand(sock, chatId, message);
                break;
            case userMessage === '.vv':
                await viewOnceCommand(sock, chatId, message);
                break;
            case userMessage === '.clearsession' || userMessage === '.clearsesi':
                await clearSessionCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.autostatus'):
                const autoStatusArgs = userMessage.split(' ').slice(1);
                await autoStatusCommand(sock, chatId, message, autoStatusArgs);
                break;
            case userMessage.startsWith('.autot on'):
                await autotCommand(sock, chatId, message, ['on']);
                break;
            case userMessage.startsWith('.autot off'):
                await autotCommand(sock, chatId, message, ['off']);
                break;
            case userMessage.startsWith('.autor on'):
                await autorCommand(sock, chatId, message, ['on']);
                break;
            case userMessage.startsWith('.autor off'):
                await autorCommand(sock, chatId, message, ['off']);
                break;
            case userMessage.startsWith('.autord on'):
                await autordCommand(sock, chatId, message, ['on']);
                break;
            case userMessage.startsWith('.autord off'):
                await autordCommand(sock, chatId, message, ['off']);
                break;
            case userMessage.startsWith('.autos'):
                await autosCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.autot'):
            case userMessage.startsWith('.autor'):
            case userMessage.startsWith('.autord'):
                await sock.sendMessage(chatId, { 
                    text: '🚫 Invalid format! Use: .command on/off',
                    ...channelInfo 
                });
                break;
            case userMessage.startsWith('.simp'):
                await simpCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.pair') || userMessage.startsWith('.rent'): {
                const q = userMessage.split(' ').slice(1).join(' ');
                await pairCommand(sock, chatId, message, q);
                break;
            }
            case userMessage.startsWith('.metallic'):
                await textmakerCommand(sock, chatId, message, userMessage, 'metallic');
                break;
            case userMessage.startsWith('.ice'):
                await textmakerCommand(sock, chatId, message, userMessage, 'ice');
                break;
            case userMessage.startsWith('.snow'):
                await textmakerCommand(sock, chatId, message, userMessage, 'snow');
                break;
            case userMessage.startsWith('.impressive'):
                await textmakerCommand(sock, chatId, message, userMessage, 'impressive');
                break;
            case userMessage.startsWith('.matrix'):
                await textmakerCommand(sock, chatId, message, userMessage, 'matrix');
                break;
            case userMessage.startsWith('.light'):
                await textmakerCommand(sock, chatId, message, userMessage, 'light');
                break;
            case userMessage.startsWith('.neon'):
                await textmakerCommand(sock, chatId, message, userMessage, 'neon');
                break;
            case userMessage.startsWith('.devil'):
                await textmakerCommand(sock, chatId, message, userMessage, 'devil');
                break;
            case userMessage.startsWith('.purple'):
                await textmakerCommand(sock, chatId, message, userMessage, 'purple');
                break;
            case userMessage.startsWith('.thunder'):
                await textmakerCommand(sock, chatId, message, userMessage, 'thunder');
                break;
            case userMessage.startsWith('.leaves'):
                await textmakerCommand(sock, chatId, message, userMessage, 'leaves');
                break;
            case userMessage.startsWith('.1917'):
                await textmakerCommand(sock, chatId, message, userMessage, '1917');
                break;
            case userMessage.startsWith('.arena'):
                await textmakerCommand(sock, chatId, message, userMessage, 'arena');
                break;
            case userMessage.startsWith('.hacker'):
                await textmakerCommand(sock, chatId, message, userMessage, 'hacker');
                break;
            case userMessage.startsWith('.sand'):
                await textmakerCommand(sock, chatId, message, userMessage, 'sand');
                break;
            case userMessage.startsWith('.blackpink'):
                await textmakerCommand(sock, chatId, message, userMessage, 'blackpink');
                break;
            case userMessage.startsWith('.glitch'):
                await textmakerCommand(sock, chatId, message, userMessage, 'glitch');
                break;
            case userMessage.startsWith('.fire'):
                await textmakerCommand(sock, chatId, message, userMessage, 'fire');
                break;
            case userMessage.startsWith('.antidelete'):
            case userMessage.startsWith('.antiedit'):
                const commandParts = userMessage.trim().split(/\s+/);
                const feature = commandParts[0].substring(1);
                const args = commandParts.slice(1).join(' ');
                await handleCommand(sock, chatId, message, args.length > 0 ? `${feature} ${args}` : feature);
                break;
            case userMessage === '.surrender':
                await handleTicTacToeMove(sock, chatId, senderId, 'surrender');
                break;
            case userMessage === '.cleartmp':
                await clearTmpCommand(sock, chatId, message);
                break;
            case userMessage === '.setpp':
                await setProfilePicture(sock, chatId, message);
                break;
            case userMessage.startsWith('.instagram') || userMessage.startsWith('.igdl') || userMessage.startsWith('.ig'):
                await instagramCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.fb') || userMessage.startsWith('.facebook'):
                await facebookCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.song') || userMessage.startsWith('.music'):
                await playCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.play') || userMessage.startsWith('.mp3') || userMessage.startsWith('.ytmp3') || userMessage.startsWith('.yts'):
                await songCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.tiktok') || userMessage.startsWith('.tt'):
                await tiktokCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.gpt') || userMessage.startsWith('.gemini'):
                await aiCommand(sock, chatId, message);
                break;
            default:
                if (isGroup) {
                    if (userMessage) {
                        await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
                    }
                    await Antilink(message, sock);
                    await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
                }
                break;
        }
    } catch (error) {
        console.error('🚫 Error in message handler:', error.message);
        if (chatId) {
            await sock.sendMessage(chatId, {
                text: '🚫 Failed to process command!',
                ...channelInfo
            });
        }
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action, author } = update;
        
        if (!id.endsWith('@g.us')) return;

        const groupMetadata = await sock.groupMetadata(id);
        const groupName = groupMetadata.subject || "this group";
        const memberCount = groupMetadata.participants.length;

        if (action === 'promote') {
            await handlePromotionEvent(sock, id, participants, author);
            return;
        }
        
        if (action === 'demote') {
            await handleDemotionEvent(sock, id, participants, author);
            return;
        }

        if (action === 'add') {
            const isWelcomeEnabled = await isWelcomeOn(id);
            if (!isWelcomeEnabled) return;

            const welcomeMessages = [
                `🌟 Welcome @{user} to *${groupName}*! We're now *${memberCount}* strong! 🎉`,
                `👋 Hello @{user}! Welcome to *${groupName}* - our awesome community of *${memberCount}* members!`,
                `🔥 @{user} has joined *${groupName}*! Let's make it *${memberCount}* times more amazing!`,
                `🎊 Welcome aboard @{user}! *${groupName}* just got better with you as member #${memberCount}!`,
                `💫 @{user} joined *${groupName}*! Now at *${memberCount}* members - the party's getting bigger!`
            ];
            
            const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

            for (const participant of participants) {
                const user = participant.split('@')[0];
                const formattedMessage = randomWelcome.replace('{user}', user);
                
                try {
                    const ppUrl = await sock.profilePictureUrl(participant, 'image');
                    await sock.sendMessage(id, {
                        image: { url: ppUrl },
                        caption: formattedMessage,
                        mentions: [participant]
                    });
                } catch (ppError) {
                    console.log(`No profile picture for ${participant}, sending text only`);
                    await sock.sendMessage(id, {
                        text: formattedMessage,
                        mentions: [participant]
                    });
                }
            }
        }
        
        if (action === 'remove') {
            const isGoodbyeEnabled = await isGoodByeOn(id);
            if (!isGoodbyeEnabled) return;

            const goodbyeMessages = [
                `🚪 @{user} left *${groupName}*... down to *${memberCount}* members. Bye, I guess. 👋`,
                `😒 @{user} couldn't handle *${groupName}* and left. Now we're *${memberCount}* strong.`,
                `👀 @{user} abandoned *${groupName}*... their loss. *${memberCount}* of us remain.`,
                `💔 @{user} left *${groupName}* - down to *${memberCount}* members. We'll survive... probably.`,
                `🙄 Another one bites the dust - @{user} left *${groupName}*. *${memberCount}* members remain.`
            ];
            
            const randomGoodbye = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];

            for (const participant of participants) {
                const user = participant.split('@')[0];
                const formattedMessage = randomGoodbye.replace('{user}', user);
                
                try {
                    const ppUrl = await sock.profilePictureUrl(participant, 'image');
                    await sock.sendMessage(id, {
                        image: { url: ppUrl },
                        caption: formattedMessage,
                        mentions: [participant]
                    });
                } catch (ppError) {
                    console.log(`No profile picture for ${participant}, sending text only`);
                    await sock.sendMessage(id, {
                        text: formattedMessage,
                        mentions: [participant]
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error in handleGroupParticipantUpdate:', error);
    }
}

module.exports = {
    handleMessages,
    handleGroupParticipantUpdate,
    handleStatus: async (sock, status) => {
        await handleStatusUpdate(sock, status);
    }
};