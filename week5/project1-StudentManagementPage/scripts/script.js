const inputName = document.getElementById("inputName");
const inputScore = document.getElementById("inputScore");
const addButton = document.getElementById("addButton");
const studentTableBody = document.getElementById("studentTableBody");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const scoreColumnHeader = document.getElementById("scoreColumnHeader");
let currentID = studentTableBody.getElementsByTagName("tr").length;

let students = [
    // Dummy datas
    { name: "Nguyễn Văn A", score: 8.5 },
    { name: "Trần Thị B", score: 7.2 },
    { name: "Phạm Văn C", score: 9.0 },
    { name: "Hoàng Thị D", score: 6.8 },
    { name: "Võ Văn E", score: 8.3 },
    { name: "Đinh Thị F", score: 7.5 },
    { name: "Bùi Văn G", score: 5.2 },
    { name: "Lý Thị H", score: 8.7 },
    { name: "Dương Văn I", score: 6.5 },
    { name: "Vương Thị J", score: 9.2 },
    { name: "Đặng Văn K", score: 7.8 },
    { name: "Hà Thị L", score: 6.2 },
    { name: "Tô Văn M", score: 4.9 },
    { name: "Cao Thị N", score: 5.5 },
    { name: "Khương Văn O", score: 7.6 },
    { name: "Phan Thị P", score: 8.1 },
    { name: "Huỳnh Văn Q", score: 6.9 },
    { name: "Tạ Thị R", score: 9.1 },
    { name: "Dư Văn S", score: 7.3 },
    { name: "Kiều Thị T", score: 8.4 },
    { name: "Lương Văn U", score: 5.8 },
    { name: "Hồ Thị V", score: 8.6 },
    { name: "Chu Văn W", score: 6.7 },
    { name: "Từ Thị X", score: 7.9 },
    { name: "Tư Văn Y", score: 2.0 },
    { name: "Tạ Văn Z", score: 4.4 },
    { name: "Tuyên Thị AA", score: 8.8 },
    { name: "Trương Văn AB", score: 7.1 },
    { name: "Bạch Thị AC", score: 9.3 },
    { name: "Tần Văn AD", score: 5.9 },
    { name: "Sơn Thị AE", score: 8.0 },
    { name: "Tiết Văn AF", score: 6.6 },
    { name: "Sung Thị AG", score: 7.7 },
    { name: "Tích Văn AH", score: 1.5 },
    { name: "Tuấn Thị AI", score: 3.3 },
    { name: "Thanh Văn AJ", score: 8.9 },
    { name: "Thái Thị AK", score: 7.4 },
    { name: "Thảo Văn AL", score: 6.1 },
    { name: "Thắm Thị AM", score: 9.0 },
    { name: "Thạnh Văn AN", score: 7.2 },
    { name: "Thị Văn AO", score: 8.3 },
    { name: "Thuân Thị AP", score: 5.7 },
    { name: "Thuần Văn AQ", score: 8.7 },
    { name: "Thuỷ Thị AR", score: 6.8 },
    { name: "Thuộc Văn AS", score: 0.6 },
    { name: "Thuyên Thị AT", score: 8.1 },
    { name: "Thuyên Văn AU", score: 6.5 },
    { name: "Thúc Thị AV", score: 8.4 },
    { name: "Thúy Văn AW", score: 7.0 },
    { name: "Thúy Thị AX", score: 9.2 }
];
let filteredStudents = [];
let scoreSortOrder = "default"; // "default", "desc", "asc"

function applyFilters() {
    // Lọc theo tên
    const searchTerm = searchInput.value.trim().toLowerCase();
    filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchTerm));
    if (filteredStudents.length === 0) {
        studentTableBody.innerHTML = "<tr><td colspan='5' class='text-center'>Không có kết quả</td></tr>";
        totalStudents.textContent = 0;
        averageScore.textContent = "0.00";
        return;
    }
    // Đồng thời lọc theo xếp loaị/điểm nếu chọn
    sortStudents();
    sortByScore();
    renderTable();
}

function sortByScore() {
    // Lọc theo điểm (default->desc->asc->default)
    if (scoreSortOrder === "desc") {
        scoreColumnHeader.textContent = "Điểm ▼";
        filteredStudents.sort((a, b) => b.score - a.score);
    } else if (scoreSortOrder === "asc") {
        scoreColumnHeader.textContent = "Điểm ▲";
        filteredStudents.sort((a, b) => a.score - b.score);
    }
    else{
        scoreColumnHeader.textContent = "Điểm";
    }
    // If "default", do nothing (maintain original order)
}

function sortStudents() {
    const sortValue = sortSelect.value;
    
    // Nếu không chọn, giữ nguyên danh sách đã lọc theo tên
    if (sortValue === "") {
        return;
    }
    
    // Ánh xạ giá trị sortSelect sang xếp loại tương ứng
    const evaluationMap = {
        "eval-excellent": "Giỏi",
        "eval-good": "Khá",
        "eval-average": "Trung bình",
        "eval-poor": "Yếu"
    };
    
    // Lọc students dựa trên xếp loại tương ứng với giá trị đã chọn
    const targetEvaluation = evaluationMap[sortValue];
    if (targetEvaluation) {
        filteredStudents = filteredStudents.filter(student => scoreEvaluation(student.score) === targetEvaluation);
    }
}
function renderTable() {
    // Hàm render bảng dữ liệu student ra giao diện
    studentTableBody.innerHTML = "";
    filteredStudents.forEach((student, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${scoreEvaluation(student.score)}</td>
            <td>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(newRow);
    });
    totalStudents.textContent = students.length;
    const average = students.reduce((sum, student) => sum + student.score, 0) / students.length;
    averageScore.textContent = average.toFixed(2);
}

// Hàm đánh giá xếp loại dựa trên điểm số
function scoreEvaluation(score) {
    if (score >= 8.5) {
        return "Giỏi";
    } else if (score >= 7) {
        return "Khá";
    } else if (score >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const name = inputName.value.trim();
    const score = parseFloat(inputScore.value);
    const regexScore = /^\d+(\.\d{1,2})?$/;
    if (name === "" || isNaN(score) || !regexScore.test(inputScore.value) || score < 1 || score > 10) {
        alert("Please enter a valid name and score (1-10).");
        return;
    }

    students.push({ name, score });
    applyFilters();

    inputName.value = "";
    inputScore.value = "";
});

studentTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
        const row = event.target.closest("tr");
        const rowIndex = Array.from(studentTableBody.children).indexOf(row);
        students.splice(rowIndex, 1);
        applyFilters();
    }
});

// Initialize table with dummy data
filteredStudents = students;
renderTable();

// Add event listeners for search and sort
searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);

// Add event listener for score column header
scoreColumnHeader.addEventListener("click", () => {
    if (scoreSortOrder === "default") {
        scoreSortOrder = "asc";
    } else if (scoreSortOrder === "desc") {
        scoreSortOrder = "default";
    } else {
        scoreSortOrder = "desc";
    }
    applyFilters();
});

