import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';

export const UserStatus = {
  active: 'active',
  blocked: 'blocked'
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export class User {
  public readonly id: number;
  public readonly username: string;
  public email: string;
  public status: UserStatus;
  @Exclude({ toPlainOnly: true })
  public password: string;
  public role?: Role;
}
