import { Client, Guild, Channel, Intents } from 'discord.js';
import { Action } from '../actions/Action';
import * as AppConstant from '../AppConstant';
import { MessageCreateOn, MessageDeleteOn, ReadyOnce } from '../EventHandler';

// singleton
export class Discord {
    public static readonly shared = new Discord();

    private client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
        partials: ['CHANNEL'],
    });

    private constructor() {
        this.client.login(AppConstant.token).then(() => {
            console.log('Carrier logined');
        });
    }

    public addActions(actions: Action[]): void {
        this.client.addActions(actions);
    }

    public async getGuild(guildId: string): Promise<Guild> {
        return await this.client.guilds.fetch(guildId);
    }

    public async getChannel(channelId: string): Promise<Channel | null> {
        return await this.client.channels.fetch(channelId);
    }
}

declare module 'discord.js' {
    interface Client {
        addActions(actions: Action[]): void;
    }
}

Client.prototype.addActions = function (actions: Action[]): void {
    this.once('ready', (client: Client) => {
        const canReadyOnce = (action: Action): action is ReadyOnce => {
            return (action as ReadyOnce).readyOnce !== undefined;
        };

        actions.forEach((action) => {
            if (canReadyOnce(action)) {
                action.readyOnce(client).catch((error) => {
                    console.error(error);
                });
            }
        });
    });

    this.on('messageCreate', (message) => {
        const canMessageCreateOn = (action: Action): action is MessageCreateOn => {
            return (action as MessageCreateOn).messageCreateOn !== undefined;
        };

        actions.forEach((action) => {
            if (canMessageCreateOn(action)) {
                action.messageCreateOn(message).catch((error) => {
                    console.error(error);
                });
            }
        });
    });

    this.on('messageDelete', (message) => {
        const canMessageDeleteOn = (action: Action): action is MessageDeleteOn => {
            return (action as MessageDeleteOn).messageDeleteOn !== undefined;
        };

        actions.forEach((action) => {
            if (canMessageDeleteOn(action)) {
                action.messageDeleteOn(message).catch((error) => {
                    console.error(error);
                });
            }
        });
    });
};
