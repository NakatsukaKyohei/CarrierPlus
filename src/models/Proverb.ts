import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class proverb {
  @PrimaryGeneratedColumn('increment')
  public id!: number;
  
  @PrimaryColumn({ type: 'text' })
  public content: string;
  
  constructor(content: string) {
    this.content = content;
  }
}
