import { Message } from 'discord.js';
import * as AppConstant from '../../AppConstant';
import { MessageCreateOn, ReadyOnce } from '../../EventHandler';
import { ChannelInfo } from '../../models/ChannelInfo';
import * as MessageService from '../../services/MessageService';
import * as ProverbService from '../../services/ProverbService';
import { Action } from '../Action';
import * as String from '../../values/String'



export class List extends Action implements MessageCreateOn {
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

        // "list"で始まらなければ無視
        if (!message.toString().startsWith('list')) {
            return;
        }

        const proverbs = await ProverbService.getProverbs();
        var proverbList: string = "";
        for(let i in proverbs) {
            proverbList = proverbList + proverbs[i].id + "   " + proverbs[i].content + "\n";
        }
        // 投稿
        this.generalChannels.forEach((generalChannel) => {
            MessageService.postMessage(generalChannel, {
                content: String.listMessage(proverbList),
            }).catch((error: Error) => {
                console.error(error);
            });
        });
    }
}
