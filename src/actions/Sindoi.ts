import { DMChannel, Message } from 'discord.js';
import { ChannelInfo } from '../models/ChannelInfo';
import { MessageCreateOn } from '../EventHandler';
import * as MessageService from '../services/MessageService';
import { Action } from './Action';
import * as AppConstant from '../AppConstant';
import * as String from '../values/String'


export class Sindoi extends Action implements MessageCreateOn {
    private sindoiChannels: ChannelInfo[] = [
        { guildId: AppConstant.androidVictim.guildId, channelId: AppConstant.androidVictim.channels.sindoiId },
        { guildId: AppConstant.tsukumoNoSato.guildId, channelId: AppConstant.tsukumoNoSato.channels.sindoiId },
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

        // "sindoi"で始まらなければ無視
        if (!message.toString().startsWith('sindoi')) {
            return;
        }

        // 本文の生成
        const content = message.toString().substring(7);
        // 画像を取得
        const attachment = Array.from(message.attachments.values());

        // 投稿
        this.sindoiChannels.forEach((sindoiChannel) => {
            MessageService.postMessage(sindoiChannel, {
                content: String.sindoiMessage(content),
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
