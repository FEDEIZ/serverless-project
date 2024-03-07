const createPlayerScore = require('../../lambdas/endpoints/createPlayerScore')
const eventGenerator = require('../testUtils/eventGenerator')
const validators = require('../testUtils/validators')

describe('Create Player score integration tests', () =>{
    test('it should take a body and return an API Gateway response',async () =>{

        const event = eventGenerator({
            body: {
                name: 'tom',
                score: 43
            }
        })

        const res = await createPlayerScore.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);

    })
})