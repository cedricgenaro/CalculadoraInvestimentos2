// Função acessória que irá verficar se o elemento é um Array e se está vazio
const isNomEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

const createTable = (columnsArray, dataArray, tableId) => {
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
  createTableBody();
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }

  const tableHeaderReference =
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);

  const headerRow = document.createElement('tr');
  for (const tableColumnsObject of columnsArray) {
    const headerElement = /*html*/ `<th class='text-center'>${tableColumnsObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}

function createTableBody() {}
