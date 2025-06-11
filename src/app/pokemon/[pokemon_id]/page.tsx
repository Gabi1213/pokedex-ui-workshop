'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Image, Spinner, Row, Col, ProgressBar, Card, Badge } from 'react-bootstrap';
import PokeNavBar from '@/components/pokeNavBarComp';
import Pokemon from '@/model/pokemon';

export default function PokemonPage() {
  const { pokemon_id } = useParams<{ pokemon_id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isPokemonLoaded, setPokemonLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('/api/pokemon?id=' + pokemon_id);
        if (resp.ok) {
          const data = await resp.json();
          setPokemon(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setPokemonLoaded(true);
      }
    };

    fetchData();
  }, [pokemon_id]);

  const getBadgeVariant = (name: string) => {
    if (name === pokemon?.devolution) return 'danger';
    if (name === pokemon?.evolution) return 'success';
    if (name === pokemon?.pokemonName) return 'primary';
    return 'secondary';
  };

  return (
    <>
      <PokeNavBar />
      <div
        style={{
          backgroundImage: 'url("https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/forest.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <Container className="mt-4 bg-white bg-opacity-75 rounded p-4">
          {isPokemonLoaded ? (
            pokemon ? (
              <Card className="p-3 shadow rounded-4">
                <Row>
                  <Col md={4}>
                    <Image src={pokemon.mainImage} fluid rounded />
                  </Col>
                  <Col md={8}>
                    <h2>{pokemon.pokemonName}</h2>

                    {/* Stats */}
                    <div className="mb-2">
                      <strong>Speed:</strong>
                      <ProgressBar now={pokemon.speed} max={100} label={`${pokemon.speed}`} variant="info" />
                    </div>
                    <div className="mb-2">
                      <strong>Health points:</strong>
                      <ProgressBar now={pokemon.healthPoints} max={100} label={`${pokemon.healthPoints}`} variant="danger" />
                    </div>
                    <div className="mb-2">
                      <strong>Attack:</strong>
                      <ProgressBar now={pokemon.attack} max={100} label={`${pokemon.attack}`} variant="warning" />
                    </div>
                    <div className="mb-3">
                      <strong>Defense:</strong>
                      <ProgressBar now={pokemon.defense} max={100} label={`${pokemon.defense}`} variant="success" />
                    </div>

                    {/* Pokemon types */}
                    <Card className="mb-3">
                      <Card.Header>Pokemon type</Card.Header>
                      <Card.Body>
                        {pokemon.pokemonType.map((type: string, idx: number) => (
                          <div key={idx}>{type}</div>
                        ))}
                      </Card.Body>
                    </Card>

                    {/* Evolution family */}
                    <Card>
                      <Card.Header>Evolution family</Card.Header>
                      <Card.Body>
                        {pokemon.evolutionFamily.map((name: string, idx: number) => (
                          <div key={idx}>
                            {name}{' '}
                            <Badge bg={getBadgeVariant(name)} className="ms-2">
                              {name === pokemon.devolution
                                ? 'Devolution'
                                : name === pokemon.pokemonName
                                ? 'Current'
                                : name === pokemon.evolution
                                ? 'Evolution'
                                : ''}
                            </Badge>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card>
            ) : (
              <Image
                className="img-fluid mx-auto d-block rounded"
                src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png"
              />
            )
          ) : (
            <Container>
              <Row className="justify-content-md-center p-2">
                <Spinner className="p-2" animation="border" role="status" />
              </Row>
              <Row className="justify-content-md-center p-2">Loading Pokémon...</Row>
            </Container>
          )}
        </Container>
      </div>
    </>
  );
}
