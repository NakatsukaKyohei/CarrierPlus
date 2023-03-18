import { Message } from 'discord.js';
import * as AppConstant from '../../AppConstant';
import { MessageCreateOn } from '../../EventHandler';
import { ChannelInfo } from '../../models/ChannelInfo';
import * as MessageService from '../../services/MessageService';
import * as ProverbService from '../../services/ProverbService';
import { Action } from '../Action';
import * as String from '../../values/String'



export class Delete extends Action implements MessageCreateOn {
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

        // "delete"で始まらなければ無視
        if (!message.toString().startsWith('delete')) {
            return;
        }

        const content = message.toString().substring(7);
        const proverbs = await ProverbService.getProverbs();
        let deleteMessage = ""
        if (proverbs.length > 1){
            const deleteId = parseInt(content);
            const deleteContent =  await ProverbService.getProverb(deleteId);
            await ProverbService.deleteProverb(deleteId);


            deleteMessage = String.deleteMessage(deleteContent.content);
        } else {
            deleteMessage = String.cantDeleteMessage();
        }
        // 投稿
        this.generalChannels.forEach((generalChannel) => {
            MessageService.postMessage(generalChannel, {
                content: deleteMessage,
            }).catch((error: Error) => {
                console.error(error);
            });
        });
    }
}
