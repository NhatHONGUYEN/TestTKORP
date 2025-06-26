import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('animal')
export class Animal {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('date')
  dateOfBirth: string; // ou Date, selon votre usage

  @Field()
  @Column()
  species: string;

  @Field()
  @Column()
  breed: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column('float')
  weight: number;

  @Field(() => Owner)
  @ManyToOne(() => Owner, (owner) => owner.animals, { onDelete: 'RESTRICT' })
  owner: Owner;
}
