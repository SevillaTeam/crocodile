import { SiteTheme as siteThemeRepository } from '../../db-postgres/models/site-theme.model';
import { BaseRESTService, FindRequest, CreateRequest } from './interface';

export class ThemeService implements BaseRESTService {
  public find = ({ id, title }: FindRequest) => {
    if (id) {
      return siteThemeRepository.findByPk(id);
    }
    return siteThemeRepository.findOne({
      where: {
        theme: `%${title}%`, // Защита от SQL Injection присутствует
      },
    });
  };

  public create = (data: CreateRequest) => {
    // @ts-ignore
    return siteThemeRepository.create(data);
  };
}
