import { SiteTheme as siteThemeRepository } from '../../db-postgres/models/site-theme.model';
import { UserTheme as userThemeRepository } from '../../db-postgres/models/user-theme.model';
import { BaseRESTService, FindRequest, CreateRequest } from './interface';

export class ThemeService implements BaseRESTService {
  public find = ({ id, title }: FindRequest) => {
    if (id) {
      return siteThemeRepository.findByPk(id);
    }
    return siteThemeRepository.findOne({
      where: {
        theme: `${title}`,
      },
    });
  };

  public findAll = ({ ownerId }: FindRequest) => {
    return siteThemeRepository.findAll({
      include: [
        {
          model: userThemeRepository,
          where: { ownerId: ownerId },
        },
      ],
    });
  };

  public create = (data: CreateRequest) => {
    // @ts-ignore
    return siteThemeRepository.create(data);
  };
}
