import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testes do componente <App.js />', () => {
  it('Testa a existência dos links Home, About e Favorite Pokémon na tela inicial, com os respectivos nomes', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /home/i });
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorite).toBeInTheDocument();
    expect(linkToHome.className).toBe('link');
    expect(linkToAbout.className).toBe('link');
    expect(linkToFavorite.className).toBe('link');
    expect(linkToHome).toHaveTextContent(/home/i)
    expect(linkToAbout).toHaveTextContent(/about/i)
    expect(linkToFavorite).toHaveTextContent(/favorite pokémon/i)

  });

  it('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);
    const titleHome = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i })
    expect(titleHome).toBeInTheDocument;
  })

  it('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkToAbout);
    const titleAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i })
    expect(titleAbout).toBeInTheDocument;
  })

  it('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkToFavorite);
    const titleFavorite = screen.getByRole('heading', { level: 2, name: /favorite pokémon/i })
    expect(titleFavorite).toBeInTheDocument;
  })

  it('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/bleh');
    })
    const notFoundTitle = screen.getByRole('heading', { level: 2, name: /Page requested not found/i })
    expect(notFoundTitle).toBeInTheDocument();
  })
})
