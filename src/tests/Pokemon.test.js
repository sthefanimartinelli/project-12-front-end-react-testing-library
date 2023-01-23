import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const bugType = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bugType);
    const firstBugPokemonName = screen.getByText(/caterpie/i);
    expect(firstBugPokemonName).toBeInTheDocument();
    expect(firstBugPokemonName.innerHTML).toBe('Caterpie');
    const firstBugPokemonType = screen.getAllByText(/bug/i);
    expect(firstBugPokemonType[0].innerHTML).toBe('Bug');
    expect(firstBugPokemonType[1].innerHTML).toBe('Bug');
    const averageWeight = screen.getByText(/average weight: 2\.9 kg/i);
    expect(averageWeight.innerHTML).toBe('Average weight: 2.9 kg');
    const firstBugPokemonImg = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(firstBugPokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png');
    expect(firstBugPokemonImg.alt).toBe('Caterpie sprite');
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink.href).toContain('pokemon/25');
  });

  it('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonLink);
    const pokemonDetailsTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it('Testa também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonLink);
    const isFavoritePokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(isFavoritePokemon);
    const favoriteStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toContain('/star-icon.svg');
    expect(favoriteStar.alt).toBe('Pikachu is marked as favorite');
  });
});
