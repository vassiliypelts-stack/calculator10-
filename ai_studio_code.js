const priceInput = document.getElementById('price');
const dpInput = document.getElementById('dpPercent');

function calculate() {
    const price = parseInt(priceInput.value);
    const dpPercent = parseInt(dpInput.value);
    const years = 25;
    const bankRate = 20;

    const dpValue = (price * dpPercent) / 100;
    const loan = price - dpValue;

    // Расчет аннуитета
    const calculateAnnuity = (loan, rate) => {
        const i = (rate / 12) / 100;
        const n = years * 12;
        return loan * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    };

    const fundMonthly = calculateAnnuity(loan, 10) + 1000; // +1000 за ежегодный взнос
    const bankMonthly = calculateAnnuity(loan, bankRate);
    
    const entryTotal = dpValue + (price * 0.13) + 150000 + 23100;

    // Обновление UI
    document.getElementById('priceLabel').innerText = price.toLocaleString() + ' ₽';
    document.getElementById('dpPercentLabel').innerText = dpPercent + '%';
    document.getElementById('totalEntry').innerText = entryTotal.toLocaleString() + ' ₽';
    document.getElementById('fundMonthly').innerText = fundMonthly.toLocaleString() + ' ₽';
    document.getElementById('bankMonthly').innerText = bankMonthly.toLocaleString() + ' ₽';
}

priceInput.addEventListener('input', calculate);
dpInput.addEventListener('input', calculate);
calculate();

document.getElementById('shareButton').addEventListener('click', () => {
    alert('Расчет скопирован!'); // Логику копирования текста можно взять из App.tsx выше
});