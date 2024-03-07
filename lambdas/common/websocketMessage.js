const AWS = require('aws-sdk');

const create = (domainName, stage) => {
    const endpoint = `${domainName}/${stage}`;
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2024-03-07',
        endpoint
    });
};

const send = ({domainName, stage, connectionID, message}) => {
    const ws = create(domainName, stage);
    const postParams = {
        Data: message,
        ConnectionId: connectionID
    };

    const res = ws.postToConnection(postParams).promise();
    return res;
}

module.exports = {send}