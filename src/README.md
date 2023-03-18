# ts版Carrier

discord.pyの更新停止に伴いdiscord.jsに移行したCarrierです。

## ファイル構成

src  
├── AppConstant.ts : 定数置き場  
├── EventHandler.ts : イベント名のメソッドをもつインターフェース群  
├── README.md : これ  
├── actions : 機能を実装するクラス置き場  
│   ├── Action.ts : 機能クラスを作成する際に継承するクラス  
│   ├── General.ts  
│   ├── Sindoi.ts  
│   └── Yoshi.ts  
├── main.ts : 実行ファイル  
├── models  : 構造体置き場  
│   └── ChannelInfo.ts  
├── network : 外部との連携をするクラス置き場  
│   └── Discord.ts : discord.jsのコア部分をラップしたクラス  
└── services : サービス単位のクラス置き場  
    └── MessageService.ts : discord.jsのメッセージにかかわる部分をラップしたクラス  


## 新しく機能を追加したいとき

### イベントを登録

- eventHandler.tsにイベント名+On/Onceのメソッドを持つインターフェースを宣言

```ts
export interface MessageCreateOnce {
    messageCreateOnce(message: Message): Promise<void>;
}
```

- discord.tsでclient.prototype.addActionsメソッドにイベントに対応する命令を記述

```ts
Client.prototype.addActions = function (actions: Action[]): void {

    // 既存のイベント

    // 新規作成
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
};
```

### 機能本体の追加

- actions/に上記イベント名インターフェースを実装してActionクラスを継承したクラスを作成
- 機能本体を記述

```ts
export class Sindoi extends Action implements MessageCreateOn {
    async messageCreateOn(message: Message): Promise<void> {
        // 追加したい機能の本体
    }
}

```

### 機能の実装

- main.tsにてクラスを宣言

```ts
const actions: Action[] = [new Sindoi()];
```
