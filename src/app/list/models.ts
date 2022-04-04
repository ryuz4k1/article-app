import { fromCouple, modelDataMatcher } from '../utils/model-utils';


export interface ServerArticleModel {
    id?: number;
    title?: string;
    body?: string;
    author?: string;
    createdDate?: string;
}


export class ArticleModel {
    public id?: number = null;
    public title?: string = null;
    public body?: string = null;
    public author?: string = null;
    public createdDate?: Date = null;

    constructor(data: Partial<ArticleModel> = {}) {
        modelDataMatcher(data, this);
    }

    public static fromServerData(data: Partial<ServerArticleModel>): ArticleModel {
        return fromCouple(data, ArticleModel, {
        });
    }

}



export class UpsertArticleModel {
    public id?: number = null;
    public title?: string = null;
    public body?: string = null;
    public author?: string = null;
    public createdDate?: Date = null;


    constructor(data: Partial<UpsertArticleModel> = {}) {
        modelDataMatcher(data, this);
    }

    public static fromClientData(data: Partial<ArticleModel>): UpsertArticleModel {
        return fromCouple(data, UpsertArticleModel, {

        });
    }
}
