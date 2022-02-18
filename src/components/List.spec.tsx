import { render, fireEvent, waitFor, waitForElementToBeRemoved, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import List from './List';
/*
test('sum', () => {
  const { getByText } = render(<App />)

  // getBy = 1 elemento, se o elemento nao estiver em tela, falhará
  // getAll = Todos os elementos
  // query = Não falha caso não encontre o elemento, podemos utilizar para teste se um elemento não esta em tela.
  // find = Quase igual ao get, mas espera o elemento aparecer em tela


  // Verificando a existencia de uma class
  expect(getByText('Hello World')).toHaveAttribute('class', 'test');
})

*/

//describe: quando criamos varios teste para uma unidade, começamos com describe 
describe('List Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<List initialItems={['Gustavo', 'Ana', 'Luiza']} />)

    expect(getByText('Gustavo')).toBeInTheDocument();
    expect(getByText('Ana')).toBeInTheDocument();
    expect(getByText('Luiza')).toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Jonnas')
    userEvent.click(addButton);

    // sem Promise
    // expect(getByText('Jonnas')).toBeInTheDocument();

    // Com Promise
    expect(await findByText('Jonnas')).toBeInTheDocument();

    // outra forma com Promise:
    // waitFor: basicamente fica rodando um loop até obter a responta. é possível limitar o loop(numero de vezes) passando um parametro
    await waitFor(() => {
      expect(getByText('Jonnas')).toBeInTheDocument();
    })
  })

  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText, queryByText } = render(<List initialItems={['Gustavo']} />)

    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0]);

    await waitForElementToBeRemoved(() => {
      return getByText('Gustavo')
    })

    expect(queryByText('Gustavo')).not.toBeInTheDocument();

    // Outra forma
    await waitFor(() => {
      expect(queryByText('Gustavo')).not.toBeInTheDocument();
    })

  })

})