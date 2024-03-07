const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_Responses');
const tableName = process.env.tableNameWS;

exports.handler = async event => {

    const {connectionId: connectionID} = event.requestContext;

    await Dynamo.delete(connectionID, tableName);

    return Responses._200({message: 'disconnected'});

};