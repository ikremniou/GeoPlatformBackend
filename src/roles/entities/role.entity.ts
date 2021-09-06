import { Claim } from 'src/claims/entities/claim.entity';
import { User } from 'src/users/entities/user.entity';

export class Role {
  public readonly id: number;
  public name: string;
  public claims?: Claim[];
  public users?: User[];
}
