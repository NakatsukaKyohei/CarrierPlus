import proverb from '../models/Proverb';
import { Postgre } from '../network/PostgreSQL';


export const getProverb = async(deletedId: number): Promise<proverb> => {
    const connection = await Postgre.createConnection();
    const proverbRepository = await connection.getRepository(proverb);
    const deleteProverb = await proverbRepository.findOne({id: deletedId});
    return deleteProverb!
}

export const getProverbs = async(): Promise<proverb[]> => {
    const connection = await Postgre.createConnection();
    const proverbRepository = await connection.getRepository(proverb);
    const proverbs = await proverbRepository.find();
    return proverbs
}

export const deleteProverb = async(deleteId: number): Promise<void> => {
    const connection = await Postgre.createConnection();
    const proverbRepository = await connection.getRepository(proverb);
    await proverbRepository.delete({id: deleteId});
}

export const insertProverb = async(content: string): Promise<void> => {
    const connection = await Postgre.createConnection()
    const proverbRepository = await connection.getRepository(proverb);
    proverbRepository.insert(new proverb(content))
}