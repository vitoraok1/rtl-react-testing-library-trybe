import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const noFavoritePokemon = () => screen.getByText(/no favorite pokémon found/i);
const checkBox = () => screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
const moreDetails = () => screen.getByRole('link', { name: /more details/i });
const pokeName = () => screen.getByTestId('pokemon-name');

describe('Testes na página de Pokemons favoritos', () => {
  it('Verifica se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    expect(noFavoritePokemon()).toBeInTheDocument();
  });

  it('Verifica se apenas são exibidos os Pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const pickedPokemon = /pikachu/i;
    expect(moreDetails()).toBeDefined();

    userEvent.click(moreDetails());

    expect(pokeName()).toHaveTextContent(pickedPokemon);
    expect(pokeName()).toBeInTheDocument();
    expect(checkBox()).toBeDefined();

    userEvent.click(checkBox());

    act(() => {
      history.push('/favorites');
    });

    const favoritePikachu = screen.getByText(/pikachu/i);
    expect(favoritePikachu).toBeInTheDocument();
  });
});
