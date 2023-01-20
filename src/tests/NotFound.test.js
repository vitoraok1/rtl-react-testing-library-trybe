import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const notFoundTitle = () => screen.getByRole('heading', { name: /page requested not found/i });
const notFoundImg = () => screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
const sourceImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testes na página de requisição não encontrada', () => {
  it('Verifique se a página contém um heading h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/teste');
    });

    expect(notFoundTitle()).toBeInTheDocument();
  });

  it('Verifique se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/teste');
    });

    expect(notFoundImg()).toBeInTheDocument();
    expect(notFoundImg()).toHaveAttribute('src', sourceImg);
  });
});
