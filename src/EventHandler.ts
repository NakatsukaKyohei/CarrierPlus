import { Client, Message, PartialMessage } from 'discord.js';

// messageCreate
export interface MessageCreateOn {
    messageCreateOn(message: Message): Promise<void>;
}
export interface MessageCreateOnce {
    messageCreateOnce(message: Message): Promise<void>;
}

// messageDelete
export interface MessageDeleteOn {
    messageDeleteOn(message: Message | PartialMessage): Promise<void>;
}
export interface MessageDeleteOnce {
    messageDeleteOnce(message: Message | PartialMessage): Promise<void>;
}

// ready
export interface ReadyOn {
    readyOn(client: Client): Promise<void>;
}
export interface ReadyOnce {
    readyOnce(client: Client): Promise<void>;
}
