export const token = process.env['DISCORD_BOT_TOKEN']

export const androidVictim = {
    guildId: process.env['VICTIM_ID'] || "",
    channels: {
        sindoiId: process.env['VICTIM_SINDOI'] || "",
        generalId: process.env['VICTIM_GENERAL'] || "",
    },
};

export const tsukumoNoSato = {
    guildId: process.env['TSUKUMO_ID'] || "",
    channels: {
        sindoiId: process.env['TSUKUMO_SINDOI'] || "",
        generalId: process.env['TSUKUMO_GENERAL'] || "",
    },
};

export const openWeatherMap = process.env['OPEN_WEATHER_MAP_TOKEN'] || ""
