const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_Responses');
const WebSocket = require('../common/websocketMessage');
const tableName = process.env.tableNameWS;

exports.handler = async event => {

    const {connectionId: connectionID} = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.get(connectionID, tableName);
        const {messages, domainName, stage} = record;

        messages.push(body.message);

        const data = {...record, messages}

        await Dynamo.write(data, tableName);

        const res = await WebSocket.send({
            domainName, 
            stage, 
            connectionID, 
            message: "This is a reply to your message"
        })

        return Responses._200({message: 'got a message'});
    } catch (error) {
        return Responses._400({message: 'message could not be received' })    
    }

    
};