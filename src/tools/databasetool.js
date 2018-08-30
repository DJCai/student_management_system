const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd21';

 /**
  * 抽离出数据处理的共同部分
  * @param {*} collectionName 数据库中集合名
  * @param {*} params   数据处理的条件
  * @param {*} callback 具体的数据处理方法
  */
 function datamethod(collectionName,params,callback){
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        callback(collection,client);
    })
 }


/**
 * 查询列表的方法
 * @param {*} collectionName 
 * @param {*} params 
 * @param {*} callback 
 */
exports.findList = (collectionName,params,callback)=>{
    datamethod(collectionName,params,(collection,client)=>{
        collection.find(params).toArray((err,docs)=>{
            client.close();
            callback(err,docs);
        })
    });
    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {
    //     const db = client.db(dbName);
    //     const collection = db.collection(collectionName);

    //     // 根据条件查询列表
    //     collection.find(params).toArray((err,docs)=>{
    //         client.close();
    //         callback(err,docs);
    //     })
    // })
}


/**
 * 查询单条数据的方法
 * @param {*} collectionName 
 * @param {*} params 
 * @param {*} callback 
 */
exports.findOne = (collectionName,param,callback)=>{
    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {
    //     const db = client.db(dbName);
    //     const collection = db.collection(collectionName);

    //     // 根据条件查询单条数据
    //     collection.findOne(param,(err,doc)=>{
    //         client.close();
    //         callback(err,doc);
    //     })
    // })

    datamethod(collectionName,param,(collection,client)=>{
        collection.findOne(param,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    });

}

exports.insertOne= (collectionName,param,callback)=>{
    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {
    //     const db = client.db(dbName);
    //     const collection = db.collection(collectionName);

    //     // 根据条件插入单条数据
    //     collection.insertOne(param,(err,doc)=>{
    //         client.close();
    //         callback(err,doc);
    //     })
    // })

    datamethod(collectionName,param,(collection,client)=>{
         // 根据条件查询单条数据
         collection.insertOne(param,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    });
}