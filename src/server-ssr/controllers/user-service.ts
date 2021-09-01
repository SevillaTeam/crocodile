import { User as userRepository } from '../../db-postgres/models/user.model';
import { BaseRESTService, FindRequest, CreateRequest } from './interface';

export class UserService implements BaseRESTService {
  public find = ({ id }: FindRequest) => {
    return userRepository.findByPk(id);
  };

  public create = (data: CreateRequest) => {
    // @ts-ignore
    return userRepository.create(data);
  };
}
