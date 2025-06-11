import fetch from 'node-fetch'; // Only needed for Node <18
import fs from 'fs/promises';   // Use Promises version of fs

const data = await fs.readFile('pokemons.json', 'utf8');
const pokemonList = JSON.parse(data);

async function sendPokemon(pokemon) {
  // Add a unique "id" field to each item
  const itemWithId = { id: pokemon.pokemonNumber, ...pokemon };

  const res = await fetch('http://localhost:3000/api/pokemon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemWithId),
  });

  const data = await res.json();
  console.log(`Inserted ${itemWithId.pokemonName}:`, data);
}

async function bulkInsert() {
  for (const pokemon of pokemonList) {
    try {
      await sendPokemon(pokemon);
    } catch (err) {
      console.error(`Error inserting ${pokemon.pokemonName}:`, err.message);
    }
  }
}

bulkInsert();