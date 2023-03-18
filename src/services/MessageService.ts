import { MessageOptions, TextChannel } from 'discord.js';
import { ChannelInfo } from '../models/ChannelInfo';
import { Discord } from '../network/Discord';

export const postMessage = async (channelInfo: ChannelInfo, messageOptions: MessageOptions): Promise<void> => {
    const textChannel = await fetchTextChannel(channelInfo);
    textChannel.send(messageOptions);
};

const fetchTextChannel = async (channelInfo: ChannelInfo): Promise<TextChannel> => {
    const channel = await Discord.shared.getChannel(channelInfo.channelId);
    if (!(channel instanceof TextChannel)) {
        throw Error('this channel is not TextChannel');
    }
    return channel;
};
