import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemon.js', () => {
  it('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const noFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('Testa se apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemon);
    const favoriteCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteCheckbox);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);
    const pikachuFavorite = screen.getByText(/pikachu/i);
    expect(pikachuFavorite).toBeInTheDocument();
    const charmander = screen.queryByText(/charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });
});
