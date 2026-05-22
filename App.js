import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [busca, setBusca] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);

  async function buscarPokemon() {
    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase()}`);
      const dados = await resposta.json();
      setPokemon(dados);
    } catch (error) {
      console.error('Pokémon não encontrado:', error);
    }
  }
  const coresPorTipo = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    flying: '#A890F0',
    normal: '#A8A878',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return (
    <View style={styles.container}>
    <View style={styles.gradiente} />
    <Text style={styles.titulo_app}>Pokédex</Text>
      <TextInput
        placeholder="Digite o nome do pokémon"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />
      <Button
        title="Buscar"
        onPress={buscarPokemon}
      />
      {pokemon && (
        <View style={styles.card}>
          <Text style={styles.nome}>{pokemon.name}</Text>
          <Text style={styles.peso}>Peso: {pokemon.weight / 10} kg</Text>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 170, height: 170 }}
          />
          <Text style={styles.titulo}>Tipos:</Text>
          <View style={styles.tiposContainer}>
          {pokemon.types.map((item) => (
            <Text 
              style={[styles.tipo, { backgroundColor: coresPorTipo[item.type.name] }]}
              key={item.type.name}
            > 
              {item.type.name}
            </Text>
          ))}
          </View>
          <Text style={styles.titulo}>Movimentos principais:</Text>
          <View style={styles.movimentosContainer}>
          {pokemon.moves.slice(0, 5).map((item) => (
            <Text style={styles.movimento} key={item.move.name}>{item.move.name}</Text>
          ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b0303c6', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderColor: '#0000005d',
    borderWidth: 1.5,
  },
  card: {
    backgroundColor: '#dbdbdb',
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderColor: '#0000005d',
    borderWidth: 1.5,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
    marginBottom: 5,
  },
  peso: {
    fontSize: 16,
    color: '#5b5b5b',
    marginBottom: 10,
  },
  tiposcontainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  tipo: {
    backgroundColor: '#AA0000',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 25,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  movimentosContainer: {
    width: '100%',
    marginTop: 10,
  },
  movimento: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginTop: 10,
  },
  gradiente: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3284cb',
    opacity: 0.4,
  },
  titulo_app: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 2,
  },
});
