import { Message } from 'discord.js';
import { ChannelInfo } from '../../models/ChannelInfo';
import { MessageCreateOn } from '../../EventHandler';
import * as MessageService from '../../services/MessageService';
import * as ProverbService from '../../services/ProverbService';
import { Action } from '../Action';
import * as AppConstant from '../../AppConstant';
import * as String from '../../values/String'


export class Register extends Action implements MessageCreateOn {
    private generalChannels: ChannelInfo[] = [
        { guildId: AppConstant.androidVictim.guildId, channelId: AppConstant.androidVictim.channels.generalId },
        { guildId: AppConstant.tsukumoNoSato.guildId, channelId: AppConstant.tsukumoNoSato.channels.generalId },
    ];

    

    async messageCreateOn(message: Message): Promise<void> {
        // 情報が欠けている場合再取得(?)
        if (message.partial) {
            await message.fetch();
        }

        // 無限ループ回避
        if (message.author.bot) {
            return;
        }

        // "proverb"で始まらなければ無視
        if (!message.toString().startsWith('proverb')) {
            return;
        }

        // 本文の生成
        const content = message.toString().substring(8);
        await ProverbService.insertProverb(content)

        // 投稿
        this.generalChannels.forEach((generalChannel) => {
            MessageService.postMessage(generalChannel, {
                content: String.registerMessage(content),
            }).catch((error: Error) => {
                console.error(error);
            });
        });
    }
}
