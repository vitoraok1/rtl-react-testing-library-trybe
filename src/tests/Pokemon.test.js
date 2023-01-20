import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const fireTypeBtn = () => screen.getByText(/fire/i);
const getImg = () => screen.getByRole('img');
const moreDetailsBtn = () => screen.getByRole('link', { name: /more details/i });
const checkBox = () => screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
const favStar = () => screen.getByRole('img', { name: /charmander is marked as favorite/i });

describe('Testes no componente Pokémon', () => {
  it('Verifica se é renderizado um card com as informaçoes de um Pokémon', () => {
    renderWithRouter(<App />);

    userEvent.click(fireTypeBtn());
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/charmander/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/fire/i);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/average weight: 8\.5 kg/i);
    expect(getImg().src).toBe('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
    expect(getImg().alt).toBe('Charmander sprite');
  });

  it('Verifica se o link de "More details" possui a URL correta', () => {
    renderWithRouter(<App />);

    userEvent.click(fireTypeBtn());
    expect(moreDetailsBtn()).toBeInTheDocument();
    expect(moreDetailsBtn()).toHaveAttribute('href', '/pokemon/4');
  });

  it('Verifica se a URL redireciona para página correta', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(fireTypeBtn());
    userEvent.click(moreDetailsBtn());
    expect(history.location.pathname).toBe('/pokemon/4');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritado', () => {
    renderWithRouter(<App />);

    userEvent.click(fireTypeBtn());
    userEvent.click(moreDetailsBtn());
    userEvent.click(checkBox());
    expect(favStar()).toBeInTheDocument();
    expect(favStar()).toHaveAttribute('src', '/star-icon.svg');
  });
});
