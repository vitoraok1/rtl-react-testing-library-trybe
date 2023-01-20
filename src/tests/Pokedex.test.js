import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const encounteredTitle = () => screen.getByRole('heading', { name: /encountered pokémon/i });
const nextPokemonBtn = () => screen.getByRole('button', { name: /próximo pokémon/i });
const fireTypeBtn = () => screen.getByText(/fire/i);
const psychicTypeBtn = () => screen.getAllByTestId('pokemon-type-button')[4];
const nextBtn = () => screen.getByRole('button', {
  name: /próximo pokémon/i,
});
const allBtn = () => screen.getByText(/all/i);

describe('Testes no componente Pokedéx', () => {
  it('Verifique se a a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    expect(encounteredTitle()).toBeInTheDocument();
  });

  it('Verifica se o botão contém o texto "Próximo Pokémon"', () => {
    renderWithRouter(<App />);

    expect(nextPokemonBtn()).toBeInTheDocument();
    expect(nextPokemonBtn()).toHaveTextContent('Próximo Pokémon');
  });

  it('Verifica se é exibido o próximo Pokémon da lista ao clicar no botão', () => {
    renderWithRouter(<App />);

    userEvent.click(fireTypeBtn());
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(psychicTypeBtn());
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/alakazam/i);

    userEvent.click(nextBtn());
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/mew/i);

    userEvent.click(allBtn());
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
