import { Client } from 'discord.js';
import * as AppConstant from '../AppConstant';
import { ReadyOnce } from '../EventHandler';
import { ChannelInfo } from '../models/ChannelInfo';
import * as MessageService from '../services/MessageService';
import * as ProverbService from '../services/ProverbService';
import * as WeatherService from '../services/WeatherService';
import { Action } from './Action';
import * as String from '../values/String'

import dayjs from 'dayjs';
import 'dayjs/locale/ja';

export class Greeting extends Action implements ReadyOnce {
    private generalChannels: ChannelInfo[] = [
        { guildId: AppConstant.androidVictim.guildId, channelId: AppConstant.androidVictim.channels.generalId },
        { guildId: AppConstant.tsukumoNoSato.guildId, channelId: AppConstant.tsukumoNoSato.channels.generalId },
    ];
    
    async readyOnce(client: Client): Promise<void> {
        const proverbs = await ProverbService.getProverbs()
        const weatherDescription = await WeatherService.getWeatherDescription('nagoya')
        const today = Greeting.formatDate(new Date());
        const content = String.greeting(today, weatherDescription.description, proverbs[Math.floor(Math.random() * proverbs.length)].content)

        // 投稿
        this.generalChannels.forEach((generalChannel) => {
            MessageService.postMessage(generalChannel, {
                content: content
            }).catch((error: Error) => {
                console.error(error);
            });
        });
    }

    static formatDate(date: Date): string {
        return dayjs(date)
        .locale('ja')
        .format('M月D日dd曜日');
    };
    
}
