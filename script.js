here// ========== Register ==========
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.username === username)) {
        alert("Username already exists!");
        return;
      }
      users.push({ name, username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully!");
      window.location.href = "index.html";
    });
  }

  // ========== Login ==========
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const valid = users.find(u => u.username === username && u.password === password);
      if (valid) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // ========== Logout ==========
  window.logout = function() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }

  // ========== Add Employee ==========
  const addForm = document.getElementById("addEmployeeForm");
  if (addForm) {
    addForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("empName").value;
      const dept = document.getElementById("empDept").value;
      const salary = document.getElementById("empSalary").value;

      let employees = JSON.parse(localStorage.getItem("employees")) || [];
      const id = Date.now();
      employees.push({ id, name, dept, salary, status: "Absent" });
      localStorage.setItem("employees", JSON.stringify(employees));

      alert("Employee added successfully!");
      addForm.reset();
    });
  }

  // ========== Employee List ==========
  const empTable = document.getElementById("employeeTable");
  if (empTable) renderEmployees();

  function renderEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const tbody = empTable.querySelector("tbody");
    tbody.innerHTML = "";
    employees.forEach((emp, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>${emp.salary}</td>
        <td>
          <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
          <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  window.editEmployee = function(id) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(e => e.id === id);
    const newName = prompt("Enter new name:", emp.name);
    const newDept = prompt("Enter new department:", emp.dept);
    const newSalary = prompt("Enter new salary:", emp.salary);
    emp.name = newName || emp.name;
    emp.dept = newDept || emp.dept;
    emp.salary = newSalary || emp.salary;
    localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees();
  };

  window.deleteEmployee = function(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees = employees.filter(e => e.id !== id);
    localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees();
  };

  // ========== Salary Table ==========
  const salaryTable = document.getElementById("salaryTable");
  if (salaryTable) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const tbody = salaryTable.querySelector("tbody");
    tbody.innerHTML = "";
    employees.forEach((emp, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>${emp.salary}</td>`;
      tbody.appendChild(tr);
    });
  }

  // ========== Attendance Table ==========
  const attendanceTable = document.getElementById("attendanceTable");
  if (attendanceTable) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const tbody = attendanceTable.querySelector("tbody");
    tbody.innerHTML = "";
    employees.forEach((emp, index) => {
      const tr = document.createElement("tr");
      const isPresent = emp.status === "Present";
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>
          <button class="toggle ${isPresent ? 'present' : 'absent'}"
            onclick="toggleAttendance(${emp.id})">
            ${emp.status}
          </button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  window.toggleAttendance = function(id) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(e => e.id === id);
    emp.status = emp.status === "Present" ? "Absent" : "Present";
    localStorage.setItem("employees", JSON.stringify(employees));
    location.reload();
  };
});
