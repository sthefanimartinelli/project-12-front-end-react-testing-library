import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
