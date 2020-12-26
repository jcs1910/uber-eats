import { v4 as uuidv4 } from 'uuid';
import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { User } from './user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType({ isAbstract: true })
@ObjectType() // graphql object type
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(type => String)
  code: string;

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
