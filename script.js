// Класс Student
class Student {
    constructor(fullName, birthDate, email, yearOfAdmission, course, groupNumber, sessions) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.email = email;
        this.yearOfAdmission = yearOfAdmission;
        this.course = course;
        this.groupNumber = groupNumber;
        this.sessions = sessions;  // количество сессий
        this.grades = this.generateGrades(sessions);
    }

    // Генерация оценок по 3 на каждую сессию
    generateGrades(sessions) {
        let grades = [];
        for (let i = 0; i < sessions * 3; i++) {
            grades.push(Math.floor(Math.random() * 4) + 2); // случайные оценки от 2 до 5
        }
        return grades;
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

// Создаем массив студентов
const students = [
    new Student("Иванов Иван", "2002-05-14", "ivanov@mail.com", 2020, 3, "A-01", 2),
    new Student("Петрова Анна", "2003-07-02", "petrova@mail.com", 2021, 2, "B-02", 3),
    new Student("Сидоров Алексей", "2001-03-20", "sidorov@mail.com", 2019, 4, "A-01", 1),
    new Student("Николаев Николай", "2002-10-01", "nikolaev@mail.com", 2020, 3, "A-01", 2),
    new Student("Смирнова Ольга", "2003-04-15", "smirnova@mail.com", 2021, 2, "B-02", 3),
    new Student("Кузнецова Мария", "2002-08-19", "kuznetsova@mail.com", 2020, 3, "A-01", 2),
    new Student("Попов Сергей", "2001-12-30", "popov@mail.com", 2019, 4, "A-01", 1),
    new Student("Елисеева Вера", "2003-06-25", "eliseeva@mail.com", 2021, 2, "B-02", 3),
    new Student("Воробьев Дмитрий", "2002-11-13", "vorobyev@mail.com", 2020, 3, "A-01", 2),
    new Student("Федорова Алина", "2003-09-08", "fedorova@mail.com", 2021, 2, "B-02", 3)
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

// Функция для отображения студентов с баллом ниже среднего
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
}

// Отображаем всех студентов при загрузке страницы
showAllStudents();
