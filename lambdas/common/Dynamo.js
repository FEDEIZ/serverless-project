const AWS = require('aws-sdk');

let options = undefined;

if(process.env.JEST_WORKER_ID){
    options= {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false
    }
}
//console.log('JEST_WORKER_ID',process.env.JEST_WORKER_ID)
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(ID, TableName){
        const params = {
            TableName,
            Key: {ID}
        }
        const data = await documentClient.get(params).promise();
        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID for ${ID} from ${TableName}`)
        }

        return data.Item;
    },

    async write(data, TableName){
        if(!data.ID){
            throw Error('no ID on the data');
        }
        const params= { TableName, Item: data};

        const res = await documentClient.put(params).promise();

        if(!res){
            throw Error(`There was an error inserting ID of ${data.ID} into table ${TableName}`)
        }

        return data;
    },

    async delete(ID, TableName){
        const params = {
            TableName,
            Key: {ID}
        };

        const res = await documentClient.delete(params).promise();

        if(!res){
            throw Error(`There was an error deleting ID of ${data.ID} into table ${TableName}`)
        }

        return data;
    }

}

module.exports = Dynamo;