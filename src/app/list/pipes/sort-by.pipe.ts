import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from '../models';

@Pipe({
  name: 'sortById'
})
export class SortByIdPipe implements PipeTransform {

  constructor() {}

  public async transform(articles: ArticleModel[]): Promise<ArticleModel[]> {
    if (articles && articles.length) {
        return articles.sort((a, b) => a.id > b.id ? -1 : 1);
    }
    return [];
  }
}
