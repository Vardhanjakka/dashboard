let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

function renderStudents(data = students) {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    data.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        showToast("Please fill all fields");
        return;
    }

    students.push({ name, email });
    saveToStorage();
    renderStudents();
    showToast("Student Added Successfully");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveToStorage();
    renderStudents();
    showToast("Student Deleted");
}

document.getElementById("search").addEventListener("input", function(e) {
    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderStudents(filtered);
});

renderStudents();