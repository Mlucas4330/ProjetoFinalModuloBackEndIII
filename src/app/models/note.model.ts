import { v4 as createUuid } from 'uuid';
import { UserModel } from './user.model';

export class NoteModel {
    private _id: string;

    constructor(private _title: string, private _description: string, private _user: UserModel) {
        this._id = createUuid();
    }

    public get title() {
        return this._title;
    }

    public get description() {
        return this._description;
    }

    public get user() {
        return this._user;
    }

    public get id() {
        return this._id;
    }

    public toJson() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            user: this._user
        };
    }

    public static create(id: string, title: string, description: string, user: UserModel) {
        const notes = new NoteModel(title, description, user);
        notes._id = id;

        return notes;
    }
}
