// lib/dynamodb.js
import AWS from 'aws-sdk';

export const TABLE_NAME = 'Items';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000/',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

// Low-level client for table creation
const rawClient = new AWS.DynamoDB({
  region: 'localhost',
  endpoint: 'http://localhost:8000/',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

async function ensureTableExists() {
  try {
    const tables = await rawClient.listTables().promise();
    if (!tables.TableNames?.includes(TABLE_NAME)) {
      console.log(`Creating table "${TABLE_NAME}"...`);
      await rawClient
        .createTable({
          TableName: TABLE_NAME,
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        })
        .promise();

      // Wait for table to become ACTIVE
      await rawClient
        .waitFor('tableExists', { TableName: TABLE_NAME })
        .promise();

      console.log(`Table "${TABLE_NAME}" created.`);
    } else {
      console.log(`Table "${TABLE_NAME}" already exists.`);
    }
  } catch (err:any) {
    console.error('Error ensuring table exists:', err.message);
  }
}

// Immediately check when this file is imported
await ensureTableExists();

export default dynamoDb;