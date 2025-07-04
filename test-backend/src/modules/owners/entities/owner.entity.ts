import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Animal } from 'src/modules/animals/entities/animal.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('person')
export class Owner {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber?: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [Animal], { nullable: true })
  @OneToMany(() => Animal, (animal) => animal.owner, {
    onDelete: 'RESTRICT',
  })
  animals?: Animal[];
}
