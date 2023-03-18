import { Message, DMChannel } from 'discord.js';
import { ChannelInfo } from '../models/ChannelInfo';
import { MessageCreateOn } from '../EventHandler';
import * as MessageService from '../services/MessageService';
import { Action } from './Action';
import * as AppConstant from '../AppConstant';
import * as String from '../values/String'


export class General extends Action implements MessageCreateOn {
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

        // ">>"で始まらなければ無視
        if (!message.toString().startsWith('>>')) {
            return;
        }

        // 本文の生成
        const content = message.toString().substring(3);
        const generalMessage = String.generalMessage(message.author.username, content)
        // 画像を取得
        const attachment = Array.from(message.attachments.values());

        // 投稿
        this.generalChannels.forEach((generalChannel) => {
            MessageService.postMessage(generalChannel, {
                content: generalMessage,
                files: attachment,
            }).catch((error: Error) => {
                console.error(error);
            });
        });

        // DMではない場合メッセージの削除
        if (!(message.channel instanceof DMChannel)) {
            await message.delete();
        }
    }
}
