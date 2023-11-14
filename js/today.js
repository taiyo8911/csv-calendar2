// 今日の日付を取得して表示する
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const dayOfWeek = today.getDay();
const days = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土'
};
const dayOfWeekString = days[dayOfWeek];

// 今日の日付を表示
const todayElement = document.getElementById('today');
todayElement.textContent = `${year}年${month}月${day}日（${dayOfWeekString}）`;