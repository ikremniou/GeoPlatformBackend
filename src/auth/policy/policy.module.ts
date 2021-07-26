import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { UserAbilityFactory } from './user-ability.factory';

@Module({
    imports: [RolesModule],
    providers: [UserAbilityFactory],
    exports: [UserAbilityFactory]
})
export class PolicyModule {}
