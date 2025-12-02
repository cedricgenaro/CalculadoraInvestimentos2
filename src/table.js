// Função acessória que irá verficar se o elemento é um Array e se está vazio
const isNomEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  //usando a função auxiliar testamos os argumentos passados para a função
  if (
    !isNomEmptyArray(columnsArray) ||
    !isNomEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      'Para a correta execução, precisamos de uma rray com as colunas, outro com informações das linhas e também um id de um objeto do tipo table'
    );
  }
  // Tentamos capiturar o objeto table e verificamos se é um table
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error('Id informado não corresponde a nenhum elemento table');
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }

  const tableHeaderReference =
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);

  // Estilizando a linha do cabeçalho
  const headerRow = document.createElement('tr');
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );
  for (const tableColumnsObject of columnsArray) {
    const headerElement = /*html*/ `<th class='text-center'>${tableColumnsObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }

  const tableBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  // Para preencher as linhas da nossa tabela, vamos utilizar um Iterator
  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');
    // Colore a linha impar
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200');
    }
    // Prenche cada coluna de uma linha por vez
    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}
