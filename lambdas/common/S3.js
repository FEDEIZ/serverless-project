const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, Bucket){
        const params = {
            Bucket,            
            Key: fileName
        };

        let data = await s3Client.getObject(params).promise();

        if(!data){
            throw Error(`There was an error get the file ${fileName} from ${Bucket}`)
        }

        if(fileName.slice(fileName.length - 4, fileName.length) === 'json'){
            data = data.Body.toString(); 
        }
        
        return data;
    },

    async write(data, fileName, Bucket){
        const params = {
            Bucket,
            Body: JSON.stringify(data),
            Key: fileName
        };

        const newData = await s3Client.putObject(params).promise();

        if(!newData){
            throw Error('There was an error writing the file')
        }

        return newData;
    }
};

module.exports = S3;