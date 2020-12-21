import { CoreOutput } from 'src/common/dtos/output.dto';
import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
