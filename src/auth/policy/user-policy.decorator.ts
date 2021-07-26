import { SetMetadata } from '@nestjs/common';
import { AppAbility } from './user-ability.factory';

export type UserPolicyHandler = (ability: AppAbility) => boolean;
export const UserPolicyMetadataKey = 'user_claim_policies';
export const UserPolicy = (...handlers: UserPolicyHandler[]) => SetMetadata(UserPolicyMetadataKey, handlers);
