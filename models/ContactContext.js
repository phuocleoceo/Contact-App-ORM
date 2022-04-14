import { BaseModel, types } from 'expo-sqlite-orm'
import * as  SQLite from 'expo-sqlite'

export default class ContactContext extends BaseModel
{
    constructor(obj)
    {
        super(obj);
    }

    static get database()
    {
        return async () => SQLite.openDatabase("MyContact.db");
    }

    static get tableName()
    {
        return "contact";
    }

    static searchContact(name)
    {
        const sql = `SELECT * FROM contact WHERE name LIKE '%${name}%'`;
        const params = [];
        return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows);
    }

    static get columnMapping()
    {
        return {
            id: { type: types.INTEGER, primary_key: true },
            name: { type: types.TEXT, not_null: true },
            phone: { type: types.TEXT, not_null: true },
            email: { type: types.TEXT },
            img: { type: types.TEXT },
        }
    }
}