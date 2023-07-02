const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");
const fs = require("node:fs");

const DatabasePath = path.join(__dirname, "./SavedData.db");
const { STARTING_VALUE } = require("./../Config");
function OpenConnection(){
    return new sqlite3.Database(DatabasePath, sqlite3.OPEN_READWRITE, (error) => {
        if (error){
            console.error(error);
            return;
        }
    });
}

function InitDB(){
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(DatabasePath)){
            fs.writeFileSync(DatabasePath, "");
        }
        const db = OpenConnection();
        db.serialize(() => {
            /*
            TODO:
            你還記得我們怎樣才能把資料 INSERT 進資料表嗎？
            完成下面的 INSERT 指令吧！
            */
            let sql = `CREATE TABLE IF NOT EXISTS Players ( id TEXT PRIMARY KEY, money INTEGER, role TEXT );`
            db.exec(sql, (error) => {
                db.close();
                if (error){
                    console.error(error);
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    });
}

async function CreateUser(id){
    return new Promise((resolve, reject) => {
        const db = OpenConnection();
        GetUser(id, true).then((data) => console.log(data));
        db.serialize(() => {
            /*
            TODO:
            應該還記得怎樣 INSERT 資料進去吧 🥺
            */
            let sql = `--Please insert query here`;
            console.log(sql);
            db.exec(sql, (error) => {
                db.close();
                if (error){
                    console.error(error);
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    });
}

async function GetUser(id, All){
    return new Promise((resolve, reject) => {
        const db = OpenConnection();
        let sql;
        if (All){
            /*
            TODO:
            我們怎樣才能把叫 Players 的資料表上的資料拿出來

            小朋友才做選擇，我全部都要
            */
            sql = `--AAAAAA`;
        } else {
            /*
            TODO:
            欸欸怎樣才能找到一個某特定的記錄 (wait WHERE am I...🤔)
            */
            sql = `--WHERES THE LAMB SAUCE`;
        }
        db.all(sql, (error, results) => {
            db.close();
            if (error){
                console.error(error);
                resolve(null);
            }
            return resolve(results);
        });
    });
}

async function UpdateUser(id, money){
    return new Promise((resolve, reject) => {
        const db = OpenConnection();
        /*
        TODO:
        怎樣才能 UPDATE 一個記錄 🤔
        */
        let sql = `--Oh look, angry birds update`;
        db.exec(sql, (error) => {
            db.close();
            if (error){
                console.error(error);
                return resolve(false);
            }
            return resolve(true);
        })
    });
}


async function RemoveUser(id, TargetId){
    return new Promise((resolve, reject) => {
        const db = OpenConnection();
        /*
        刪除資料應該沒有直接刪掉 SavedData.db 快吧
        */
        let sql = `--Error 404`;
        db.exec(sql, (error) => {
            db.close();
            if (error){
                return resolve(false);
            }
            return resolve(true);
        });
    });
}

module.exports = {
    InitDB: InitDB,
    CreateUser: CreateUser,
    GetUser: GetUser,
    UpdateUser: UpdateUser,
    RemoveUser: RemoveUser
}