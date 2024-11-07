// Класс Student
class Student {
    constructor(fullName, birthDate, email, yearOfAdmission, course, groupNumber, sessions, grades) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.email = email;
        this.yearOfAdmission = yearOfAdmission;
        this.course = course;
        this.groupNumber = groupNumber;
        this.sessions = sessions;
        this.grades = grades;  // Ручной ввод оценок
    }

    // Метод для вычисления среднего балла студента
    calculateAverageGrade() {
        const sum = this.grades.reduce((a, b) => a + b, 0);
        return sum / this.grades.length;
    }
}

// Функция для вычисления среднего балла группы
function calculateGroupAverage(students) {
    const totalAverage = students.reduce((sum, student) => sum + student.calculateAverageGrade(), 0);
    return totalAverage / students.length;
}

// Массив студентов
const students = [
    new Student("Иванов Иван", "2002-05-14", "ivanov@mail.com", 2020, 3, "A-01", 2, [4, 5, 4, 3, 4, 5]),
    new Student("Петрова Анна", "2003-07-02", "petrova@mail.com", 2021, 2, "А-01", 3, [5, 4, 3, 5, 4, 5, 4, 3, 5]),
    new Student("Сидоров Алексей", "2001-03-20", "sidorov@mail.com", 2019, 4, "A-01", 1, [3, 4, 5]),
    new Student("Кузнецова Мария", "2000-11-10", "kuznetsova@mail.com", 2020, 5, "А-01", 2, [5, 4, 4, 3, 5, 4, 3, 4, 4, 5, 4, 5]),
    new Student("Михайлов Сергей", "1999-06-25", "mikhailov@mail.com", 2021, 3, "А-01", 3, [2, 3, 5, 4, 3, 5, 4, 4, 4, 3, 2, 5, 4, 3, 4]),
    new Student("Григорьева Ольга", "2002-01-18", "grigorieva@mail.com", 2022, 2, "А-01", 4, [5, 5, 4, 4, 5, 3, 5, 4, 4, 4, 3, 4]),
    new Student("Лебедев Виктор", "2001-09-30", "lebedev@mail.com", 2020, 4, "А-01", 1, [4, 5, 3]),
    new Student("Тимофеева Ирина", "2000-02-15", "timofeeva@mail.com", 2021, 3, "А-01", 3, [5, 4, 5, 3, 5, 4, 4, 4, 5, 4, 5, 4, 3]),
    new Student("Новиков Дмитрий", "2001-12-04", "novikov@mail.com", 2019, 2, "А-01", 2, [4, 3, 3, 5, 4, 5, 3, 4, 5]),
    new Student("Жукова Светлана", "2002-04-11", "zhukova@mail.com", 2022, 5, "А-01", 3, [4, 5, 4, 5, 3, 4, 4, 4, 5, 3, 5, 5, 4, 4, 5, 5, 3, 4, 5, 4]),

];

// Функция для отображения всех студентов
function showAllStudents() {
    const studentTableBody = document.getElementById("studentTable").querySelector("tbody");
    studentTableBody.innerHTML = ""; // Очищаем таблицу перед вставкой

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.fullName}</td>
            <td>${student.birthDate}</td>
            <td>${student.email}</td>
            <td>${student.yearOfAdmission}</td>
            <td>${student.course}</td>
            <td>${student.groupNumber}</td>
            <td>${student.grades.join(", ")}</td>
            <td>${student.calculateAverageGrade().toFixed(2)}</td>
        `;

        studentTableBody.appendChild(row);
    });
}

// Функция для отображения среднего балла группы
function showGroupAverage() {
    const groupAverage = calculateGroupAverage(students);
    document.getElementById("groupAverage").textContent = `Средний балл группы: ${groupAverage.toFixed(2)}`;
}

// Функция для отображения студентов с баллом ниже среднего и печати
function showBelowAverageStudents() {
    const groupAverage = calculateGroupAverage(students);
    const belowAverageStudents = students.filter(student => student.calculateAverageGrade() < groupAverage);

    const studentTableBody = document.getElementById("studentTable").querySelector("tbody");
    studentTableBody.innerHTML = ""; // Очищаем таблицу перед вставкой

    belowAverageStudents.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.fullName}</td>
            <td>${student.birthDate}</td>
            <td>${student.email}</td>
            <td>${student.yearOfAdmission}</td>
            <td>${student.course}</td>
            <td>${student.groupNumber}</td>
            <td>${student.grades.join(", ")}</td>
            <td>${student.calculateAverageGrade().toFixed(2)}</td>
        `;

        studentTableBody.appendChild(row);
    });

    // Запускаем процесс печати
    setTimeout(() => {
        window.print(); // Открываем диалог печати
    }, 500); // Задержка, чтобы данные успели отобразиться
}

// Функция для добавления нового студента
function addStudent() {
    const fullName = document.getElementById("fullName").value;
    const birthDate = document.getElementById("birthDate").value;
    const email = document.getElementById("email").value;
    const yearOfAdmission = parseInt(document.getElementById("yearOfAdmission").value);
    const course = parseInt(document.getElementById("course").value);
    const groupNumber = document.getElementById("groupNumber").value;
    const sessions = parseInt(document.getElementById("sessions").value);
    const gradesInput = document.getElementById("grades").value;

    // Проверка на то, что количество оценок в 3 раза больше количества сессий
    const grades = gradesInput.split(",").map(grade => parseInt(grade.trim()));
    if (grades.length !== sessions * 3) {
        alert(`Количество оценок должно быть в 3 раза больше количества сессий (всего должно быть ${sessions * 3} оценок).`);
        return;
    }

    const newStudent = new Student(fullName, birthDate, email, yearOfAdmission, course, groupNumber, sessions, grades);
    students.push(newStudent);
    showAllStudents();  // Обновляем список студентов

    // Закрыть форму
    document.getElementById("addStudentForm").style.display = "none";
}

// Функция для отображения формы добавления студента
function showAddStudentForm() {
    document.getElementById("addStudentForm").style.display = "block";
}

// Отображаем всех студентов при загрузке страницы
showAllStudents();
