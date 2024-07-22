'use strict';

const body = document.querySelector('body');
const employeeForm = document.createElement('form');

const tableHead = document.querySelector('thead');
const tableBody = document.querySelector('tbody');
const table = document.querySelector('table');
const tableRows = [...tableBody.rows];
const workersData = () => [...table.tBodies[0].rows];

let previousClickedTitleIndex = -1;
let direction;

// sorting the table
function convertToNumber(string) {
  const number = Number(string.replace(/[$,]/g, ''));

  return `${number}`;
}

tableHead.addEventListener('click', (e) => {
  const index = e.target.cellIndex;

  if (previousClickedTitleIndex !== index) {
    direction = 1;
  } else {
    direction = -1;
  }

  previousClickedTitleIndex = index;

  if (direction === -1) {
    previousClickedTitleIndex = -1;
  }

  tableRows.sort((a, b) => {
    const el1 = a.children[index].innerText;
    const el2 = b.children[index].innerText;

    if (/\d/.test(el1)) {
      return (
        (Number(convertToNumber(el1)) - Number(convertToNumber(el2))) *
        direction
      );
    }

    return el1.localeCompare(el2) * direction;
  });

  tableBody.append(...tableRows);
});

// selected row

tableBody.addEventListener('click', (clickEvent) => {
  const target = clickEvent.target;

  workersData().forEach((el) => {
    if (el.contains(target)) {
      el.classList.toggle('active');
    } else {
      el.closest('tr').classList.remove('active');
    }
  });
});

// add form to the table
employeeForm.className = `new-employee-form`;
body.append(employeeForm);

employeeForm.innerHTML = `
  <label>
    Name:
    <input
      name="name"
      type="text"
      data-qa="name"
      required
    >
  </label>

  <label>
    Position:
    <input
      name="position"
      type="text"
      data-qa="position"
      required
    >
  </label>

  <label>
    Office:
    <select
      name="office"
      data-qa="office"
      required
    ></select>
  </label>

    <label>
    Age:
    <input
      name="age"
      type="number"
      data-qa="age"
      required
    >
  </label>

  <label>
    Salary:
    <input
      name="salary"
      type="number"
      data-qa="salary"
      required
    >
  </label>

  <button>Save to Table</button>
`;

// add office to select
const selectButton = document.querySelector('select');
const selectCities = [
  `Tokyo`,
  `Singapore`,
  `London`,
  `New York`,
  `Edinburgh`,
  `San Francisco`,
];

for (const city of selectCities) {
  const option = new Option(`${city}`);

  option.value = city.toLowerCase();

  selectButton.append(option);
}
