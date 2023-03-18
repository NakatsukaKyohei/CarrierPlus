export const greeting = (date: string, weatherDescription: string, proverb: string): string => {
    return `今日は${date}にゃ!\n\n${weatherDescription}\n\n今日の格言は『\n${proverb}』だにゃ!\n今日も一日ご安全に!`;
};

export const registerMessage = (content: string): string => {
    return `名言「${content}」を追加しといたにゃ～`;
};

export const listMessage = (proverbList: string): string => {
    return `名言の一覧を表示するにゃ～\n-----------------------------------\n${proverbList}-----------------------------------\n`; 
};

export const deleteMessage = (content: string): string => {
    return `名言「${content}」を削除したにゃ!`;
};

export const cantDeleteMessage = (): string => {
    return `これ以上名言を消すことは許さないにゃ!`
};

export const generalMessage = (username: string, content: string): string => {
    return `${username}「${content}」`;
};

export const sindoiMessage = (content: string): string => {
    return `しんどい… ${content}`;
};
