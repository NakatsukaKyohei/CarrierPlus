import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class weather {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @PrimaryColumn({ type: 'text' })
  public description: string;
  
  constructor(description: string) {
    this.description = description;
  }
}
