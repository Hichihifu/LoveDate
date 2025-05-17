// Hàm kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Hàm tính số năm và số ngày kể từ ngày 02/12/2024
function calculateDays() {
    // Ngày quá khứ cố định là 02/12/2024
    const pastDate = new Date('2024-12-02');
    
    // Ngày hiện tại
    const currentDate = new Date();

    // Đảm bảo chỉ tính ngày, không tính giờ
    pastDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Tính số năm đã qua
    let yearDifference = currentDate.getFullYear() - pastDate.getFullYear();
    
    // Nếu chưa qua ngày 02/12 của năm hiện tại thì giảm năm xuống
    if (currentDate < new Date(currentDate.getFullYear(), 11, 2)) {
        yearDifference = yearDifference - 1;
    }

    let totalDays = 0;
    let years = 0;
    let days = 0;

    // Tính số ngày từ 02/12/2024 đến hiện tại
    let currentYear = pastDate.getFullYear();
    
    // Lặp qua từng năm từ 2024 đến năm hiện tại
    for (let i = currentYear; i < currentDate.getFullYear(); i++) {
        // Kiểm tra năm nhuận
        if (isLeapYear(i)) {
            totalDays += 366;
        } else {
            totalDays += 365;
        }
    }
    
    // Tính số ngày trong năm hiện tại
    const daysInCurrentYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 11, 2)) / (1000 * 3600 * 24));
    totalDays += daysInCurrentYear;

    // Cập nhật số năm và số ngày
    years = Math.floor(totalDays / 365);
    days = totalDays % 365;

    let resultText;

    // Nếu số năm là 0, chỉ hiển thị số ngày
    if (years === 0) {
        resultText = `${days} ngày`;
    } else {
        resultText = `${years} năm và ${days} ngày`;
    }

    // Hiển thị kết quả
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = resultText;
}

// Hàm cập nhật thời gian hiện tại mỗi giây
function updateTime() {
    const now = new Date();
    const day = now.toLocaleDateString('vi-VN');  // Định dạng ngày
    const time = now.toLocaleTimeString('vi-VN');  // Định dạng giờ, phút, giây

    // Cập nhật ngày hiện tại
    const currentDayElement = document.getElementById('current-day');
    currentDayElement.innerHTML = `${day}`;

    // Cập nhật thời gian hiện tại
    const currentTimeElement = document.getElementById('current-time');
    currentTimeElement.innerHTML = `${time}`;
}

// Cập nhật thời gian mỗi giây
setInterval(updateTime, 1000);

// Gọi hàm tính số ngày khi trang được tải
window.onload = function() {
    calculateDays();
    updateTime(); // Cập nhật thời gian ngay khi tải trang
};
