import dynamoDb, { TABLE_NAME } from '../../lib/dynamodb';

export default async function handler(req: any, res: any) {
  const TableName = TABLE_NAME;

  // CREATE or UPDATE a Pokémon
  if (req.method === 'POST') {
    const pokemon = req.body;

    // Validate input
    if (!pokemon.id || typeof pokemon.id !== 'number') {
      return res.status(400).json({ error: 'Pokemon must have a numeric "id"' });
    }

    const params = {
      TableName,
      Item: {
        ...pokemon,
        id: Number(pokemon.id), // Ensure it's a number
      },
    };

    try {
      await dynamoDb.put(params).promise();
      res.status(201).json({ message: 'Pokemon inserted/updated', pokemon });
    } catch (err) {
      res.status(500).json({ error: 'Insert failed', details: err });
    }
  }

  // READ all or one Pokémon by ID
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      const params = {
        TableName,
        Key: {
          id: Number(id), // Ensure it's a number
        },
      };

      try {
        const result = await dynamoDb.get(params).promise();
        if (!result.Item) {
          return res.status(404).json({ error: 'Pokemon not found' });
        }
        return res.status(200).json(result.Item);
      } catch (err) {
        return res.status(500).json({ error: 'Fetch failed', details: err });
      }
    } else {
      try {
        const data = await dynamoDb.scan({ TableName }).promise();
        return res.status(200).json(data.Items);
      } catch (err) {
        return res.status(500).json({ error: 'Scan failed', details: err });
      }
    }
  }

  // DELETE a Pokémon by ID
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing ID to delete' });
    }

    const params = {
      TableName,
      Key: {
        id: Number(id),
      },
    };

    try {
      await dynamoDb.delete(params).promise();
      res.status(200).json({ message: `Pokemon with id ${id} deleted` });
    } catch (err) {
      res.status(500).json({ error: 'Delete failed', details: err });
    }
  }

  // Method not allowed
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
