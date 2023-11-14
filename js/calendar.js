// 月別の日数を返す関数
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// 月の最初の曜日を返す関数
function getFirstDay(year, month) {
    return new Date(year, month, 1).getDay();
}

// カレンダーを表示する関数
function showCalendar(year, month, data) {
    // カレンダーの作成
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDay(year, month);
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthHeader = document.createElement('th');
    monthHeader.setAttribute('colspan', '7');
    monthHeader.textContent = months[month];
    headerRow.appendChild(monthHeader);
    tbody.appendChild(headerRow);

    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const dayRow = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
        const th = document.createElement('th');
        th.textContent = daysOfWeek[i];
        dayRow.appendChild(th);
    }
    tbody.appendChild(dayRow);

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < firstDay) {
                // 空のセルを追加する
            } else if (date > daysInMonth) {
                // 空のセルを追加する
            } else {
                td.textContent = date;
                if (j === 0) {
                    // 日曜日は赤色にする
                    td.style.color = 'red';
                } else if (j === 6) {
                    // 土曜日は青色にする
                    td.style.color = 'blue';
                }

                // 今日のセルにidを付与する
                const cellDate = new Date(year, month, date);
                const today = new Date();
                if (cellDate.toDateString() === today.toDateString()) {
                    td.setAttribute('id', 'todayCell');
                }

                // 配列のデータと一致する日付のセルを塗りつぶす
                for (let k = 0; k < data.length; k++) {
                    const target = data[k];
                    if (target.month === month + 1 && target.date === date) {
                        let title = target.title;
                        switch (title) {
                            case '閑散期':
                                td.style.backgroundColor = 'skyblue';
                                break;
                            case '繁忙期':
                                td.style.backgroundColor = 'orange';
                                break;
                            case '最繁忙期':
                                td.style.backgroundColor = 'pink';
                                break;
                        }
                    }
                }
                date++;
            }
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    document.getElementById('calendar').appendChild(table);
}


// 今日のスケジュールを表示する関数
function displaySchedule() {
    // 今日のセルを取得する
    const todayCell = document.getElementById("todayCell");

    // スケジュールを表示する要素を取得する
    const schedule = document.getElementById('schedule');
    // 今日のセルが存在しない場合は処理を終了する
    if (!todayCell) return;

    // 今日のセルの背景色を取得する
    const backgroundColor = window.getComputedStyle(todayCell).backgroundColor;

    // 背景色に応じてスケジュールを表示する
    switch (backgroundColor) {
        case 'rgb(135, 206, 235)':
            // 閑散期の場合
            schedule.textContent = '閑散期';
            break;
        case 'rgb(255, 165, 0)':
            // 繁忙期の場合
            schedule.textContent = '繁忙期';
            break;
        case 'rgb(255, 192, 203)':
            // 最繁忙期の場合
            schedule.textContent = '最繁忙期';
            break;
        default:
            // その他の場合
            schedule.textContent = '通常期';
    }

    // 今日のセルの背景色を黄色にする
    todayCell.style.backgroundColor = 'yellow';
}


// CSVファイルを読み取って「1/1, タイトル」を「1, 1, タイトル」という形式にする関数
function textParser(text) {
    // 改行で分割する
    const lines = text.split(/\r\n|\n|\r/);
    // 1行目はヘッダーなので削除する
    lines.shift();
    // 1行ずつ処理する
    const data = lines.map(line => {
        // カンマで分割する
        const cells = line.split(',');
        // スラッシュで分割する
        const date = cells[0].split('/');
        // 月と日とタイトルを返す
        return {
            month: parseInt(date[0]),
            date: parseInt(date[1]),
            title: cells[1]
        };
    });
    return data;
}

// CSVファイルを読み込んだらカレンダーを表示する
window.addEventListener('DOMContentLoaded', function () {
    // CSVファイルを読み込む
    const req = new XMLHttpRequest();
    req.open('get', 'csv/test.csv', true);
    req.send();

    // 読み込みが完了したら12ヶ月分のカレンダーを表示する
    req.onload = function () {
        // CSVデータを整形する
        const data = textParser(req.responseText);

        // カレンダーを表示する範囲を決定する
        const today = new Date();
        const month = today.getMonth() + 1;

        // ①今月から12月までのカレンダーを表示
        for (let i = month - 1; i < 12; i++) {
            showCalendar(today.getFullYear(), i, data);
        }
        // ②来年の1月から経過月数を引いた月までのカレンダーを表示
        for (let i = 0; i < month - 1; i++) {
            showCalendar(today.getFullYear() + 1, i, data);
        }
    };

    // カレンダー表示の1秒後に今日の予定を表示する
    setTimeout(displaySchedule, 1000);

});