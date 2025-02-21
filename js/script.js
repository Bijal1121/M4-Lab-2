// CREATE AN ARRAY OF EMPLOYEES
let employees = JSON.parse(localStorage.getItem('employees')) || [
    { id: 10000000, name: "Ram Sharma", ext: 1234, email: "rsharma@yahoo.com", department: "Marketing" },
    { id: 20000000, name: "Jay Shah", ext: 5678, email: "jays@google.com", department: "Marketing" },
    { id: 30000000, name: "Bijal Bharadva", ext: 4321, email: "bbijal@outlook.com", department: "Engineering" },
    { id: 40000000, name: "Pearl Patel", ext: 8765, email: "pearlpatel@gmail.com", department: "Sales" },
    { id: 50000000, name: "Charlie Cooper", ext: 1357, email: "charlie.cooper@outlook.com", department: "Executive" }
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY


// GET DOM ELEMENTS
const empTable = document.querySelector("#empTable tbody");
const empCount = document.querySelector("#empCount");
const form = document.querySelector("#addForm");
const idInput = document.querySelector("#id");
const nameInput = document.querySelector("#name");
const extInput = document.querySelector("#extension");
const emailInput = document.querySelector("#email");
const deptInput = document.querySelector("#department");


// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
document.addEventListener("DOMContentLoaded", buildGrid);


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault(); 
    // GET THE VALUES FROM THE TEXT BOXES
    const newEmployee = {
        id: parseInt(idInput.value),
        name: nameInput.value.trim(),
        ext: parseInt(extInput.value),
        email: emailInput.value.trim(),
        department: deptInput.value
    };
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    idInput.focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.tagName === "BUTTON") {
        if (confirm("Are you sure you want to delete this employee?")) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        const rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        // BUILD THE GRID
        buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.innerHTML = "";
    // REBUILD THE TBODY FROM SCRATCH
    for (const emp of employees) {
        let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.ext}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td><button class="btn btn-danger btn-sm">Delete</button></td>
            </tr>
        `;
        empTable.innerHTML += row;
    }

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE

    // BIND THE TBODY TO THE EMPLOYEE TABLE

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = `(${employees.length})`;
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
};