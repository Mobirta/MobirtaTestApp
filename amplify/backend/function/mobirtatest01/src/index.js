// const awsServerlessExpress = require('aws-serverless-express');
// const app = require('./app');

// /**
//  * @type {import('http').Server}
//  */
// const server = awsServerlessExpress.createServer(app);

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = (event, context) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
// };

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const server = awsServerlessExpress.createServer(app);

app.get('/get-presigned-url', async (req, res) => {
    const params = {
        Bucket: 'your-bucket-name',
        Key: req.query.filename,
        Expires: 60, // URLの有効期限(秒)
        ContentType: req.query.filetype
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        res.json({ url });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create a signed URL' });
    }
});

exports.handler = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

