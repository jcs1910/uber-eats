import { MutationOutput } from 'src/common/dtos/output.dto';
import { PickType, ObjectType, InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field(type => String, { nullable: true })
  token?: string;
}
