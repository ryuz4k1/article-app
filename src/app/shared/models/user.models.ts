import { fromCouple, modelDataMatcher } from 'src/app/utils/model-utils';

export interface ServerUserModel {
    id?: number;
    username?: string;
    password?: string;
}


export class UserModel {
    public id?: number = null;
    public username?: string = null;
    public password?: string = null;

    constructor(data: Partial<UserModel> = {}) {
        modelDataMatcher(data, this);
    }

    public static fromServerData(data: Partial<ServerUserModel>): UserModel {
        return fromCouple(data, UserModel, {
        });
    }

}

