import { Discord } from './network/Discord';
import { Sindoi } from './actions/Sindoi';
import { General } from './actions/General';
import { Action } from './actions/Action';
import { Greeting } from './actions/Greeting';
import { Register } from './actions/proverb/Register';
import { List } from './actions/proverb/List';
import { Delete } from './actions/proverb/Delete';


const actions: Action[] = [new Sindoi(), new General(), new Greeting(), new Register(), new List(), new Delete()];

Discord.shared.addActions(actions);
