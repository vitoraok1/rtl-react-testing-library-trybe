import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const homeLink = () => screen.getByRole('link', { name: /home/i });
const aboutLink = () => screen.getByRole('link', { name: /about/i });
const favoriteLink = () => screen.getByRole('link', { name: /favorite pokémon/i });
const notFound = () => screen.getByRole('heading', { name: /page requested not found/i });

describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  it('Verifica se o primeiro link renderizado possui o texto "Home"', () => {
    renderWithRouter(<App />);

    expect(homeLink()).toBeInTheDocument();
  });

  it('Verifica se o primeiro link renderizado possui o texto "About"', () => {
    renderWithRouter(<App />);

    expect(aboutLink()).toBeInTheDocument();
  });

  it('Verifica se o primeiro link renderizado possui o texto "Home"', () => {
    renderWithRouter(<App />);

    expect(favoriteLink()).toBeInTheDocument();
  });
});

describe('Verifica se os links redirecionam o usuário para uma página específica', () => {
  it('Verifica se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(homeLink());

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(aboutLink());

    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(favoriteLink());

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/teste');
    });

    expect(notFound()).toBeInTheDocument();
  });
});
