// Инициализация иконок Lucide
lucide.createIcons();

// Элементы
const priceIn = document.getElementById('price');
const dpIn = document.getElementById('dp');
const yearsIn = document.getElementById('years');
const rateIn = document.getElementById('bankRate');

const formatNum = (num) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(num);
};

function doCalculate() {
    const P = parseInt(priceIn.value);
    const DPP = parseInt(dpIn.value);
    const Y = parseInt(yearsIn.value);
    const BR = parseFloat(rateIn.value);

    // Константы Фонда
    const FUND_R = 10;
    const COM = 13;
    const ENT = 150000;
    const REG = 23100;
    const ANNUAL_COOP = 12000;
    const MO_COOP = 1000;

    const DP_VAL = (P * DPP) / 100;
    const LOAN = P - DP_VAL;

    // Аннуитет
    const calcAnn = (loan, rate, years) => {
        if (loan <= 0) return 0;
        const i = (rate / 12) / 100;
        const n = years * 12;
        return loan * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    }

    const fundMo = calcAnn(LOAN, FUND_R, Y) + MO_COOP;
    const bankMo = calcAnn(LOAN, BR, Y);
    
    const entryTotal = DP_VAL + (P * (COM/100)) + ENT + REG;
    
    const fundTotalPaid = (fundMo * Y * 12);
    const bankTotalPaid = (bankMo * Y * 12);
    const totalSaving = Math.max(0, bankTotalPaid - fundTotalPaid);

    // Обновляем UI
    document.getElementById('priceVal').innerText = formatNum(P);
    document.getElementById('dpPercentVal').innerText = DPP + '%';
    document.getElementById('dpRubVal').innerText = formatNum(DP_VAL);
    document.getElementById('totalEntry').innerText = formatNum(entryTotal);
    document.getElementById('fundMonthly').innerText = formatNum(fundMo);
    document.getElementById('bankMonthlySmall').innerText = formatNum(bankMo);
    document.getElementById('monthlySave').innerText = formatNum(Math.max(0, bankMo - fundMo));
    document.getElementById('totalSave').innerText = formatNum(totalSaving);
}

// Слушатели
[priceIn, dpIn, yearsIn, rateIn].forEach(el => el.addEventListener('input', doCalculate));

// Старт
doCalculate();

// Копирование
function copyResults() {
    const text = `
🏠 РАСЧЕТ ПО КВАРТИРЕ

💰 Цена: ${document.getElementById('priceVal').innerText}
💸 Вход в сделку: ${document.getElementById('totalEntry').innerText}

🟢 ФОНД (10% + взносы):
- Платёж: ${document.getElementById('fundMonthly').innerText}/мес
- Экономия: ${document.getElementById('monthlySave').innerText}/мес

🔴 БАНК (Ипотека):
- Платёж: ${document.getElementById('bankMonthlySmall').innerText}/мес

💎 ВАША ОБЩАЯ ВЫГОДА: ${document.getElementById('totalSave').innerText}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('mainBtn');
        const old = btn.innerHTML;
        btn.innerHTML = 'СКОПИРОВАНО! ✅';
        btn.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btn.innerHTML = old;
            btn.style.backgroundColor = '#2563eb';
            lucide.createIcons();
        }, 2000);
    });
}