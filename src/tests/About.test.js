import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

const pokedexData = [
  /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
  /one can filter pokémon by type, and see more details for each one of them/i,
];

const dataImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

const pokedexHeading = () => screen.getByRole('heading', { name: /about pokédex/i });

describe('Verifica se a página contém as informações sobre a Pokédex', () => {
  it('Verifica se a contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    expect(pokedexHeading()).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(pokedexData[0])).toBeInTheDocument();
    expect(screen.getByText(pokedexData[1])).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe(dataImg);
  });
});
