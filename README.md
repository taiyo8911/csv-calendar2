# CSVカレンダー

CSVファイルから日付とタイトルを読み込んで、カレンダー形式で表示するWebアプリケーションです。繁忙期や閑散期などのスケジュール情報を視覚的に確認できます。

## 機能

- **CSVファイルからのデータ読み込み**: 日付とタイトルの情報をCSVファイルから取得
- **1年間のカレンダー表示**: 今月から12ヶ月分のカレンダーを表示
- **今日の日付と予定を表示**: ページ上部に今日の日付と予定を強調表示
- **色分け表示**: 繁忙期を3段階で色分け
  - **最繁忙期**: ピンク
  - **繁忙期**: オレンジ
  - **閑散期**: 水色
- **レスポンシブなUI**: スクロール可能なカレンダーで快適に閲覧

## デモ

今日の日付がハイライト(黄色)で表示され、該当する予定がページ上部に表示されます。

## 使い方

### 1. プロジェクトの準備

プロジェクトをダウンロードまたはクローンします:

```bash
git clone <repository-url>
cd csv-calendar2
```

### 2. CSVファイルの準備

`csv/test.csv` にデータを配置します。CSVファイルの形式は以下の通りです:

```csv
月日,タイトル
5/3,最繁忙期
5/4,閑散期
6/1,繁忙期
```

**データ形式**:
- **1列目**: 月/日 (例: `5/3`, `12/25`)
- **2列目**: タイトル (例: `最繁忙期`, `繁忙期`, `閑散期`)

### 3. アプリケーションの起動

Webブラウザで `index.html` を開きます:

```bash
open index.html
```

または、ローカルサーバーを起動して開くこともできます:

```bash
# Python 3の場合
python -m http.server 8000

# ブラウザで http://localhost:8000 にアクセス
```

## ファイル構成

```
csv-calendar2/
├── index.html          # メインのHTMLファイル
├── style.css           # スタイルシート
├── js/
│   ├── calendar.js     # カレンダー表示とCSV読み込み処理
│   └── today.js        # 今日の日付を表示
├── csv/
│   └── test.csv        # サンプルデータ(CSVファイル)
└── README.md           # このファイル
```

## カスタマイズ

### CSVファイルの変更

`csv/test.csv` を編集して、独自のスケジュールデータを追加できます。

### 色の変更

`style.css` と `js/calendar.js` で色の設定を変更できます:

**style.css**:
```css
.legend-text .legend_1 {
    background-color: pink;      /* 最繁忙期の色 */
}
.legend-text .legend_2 {
    background-color: orange;    /* 繁忙期の色 */
}
.legend-text .legend_3 {
    background-color: skyblue;   /* 閑散期の色 */
}
```

**calendar.js** (62-78行目):
```javascript
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
```

### タイトルの種類を追加

`calendar.js` の `switch` 文に新しいケースを追加することで、独自のタイトルと色を設定できます。

## 技術スタック

- **HTML5**: 構造
- **CSS3**: スタイリング
- **Vanilla JavaScript**: ロジック処理
  - DOM操作
  - XMLHttpRequestでCSV読み込み
  - 日付計算

## ブラウザ対応

モダンブラウザ(Chrome, Firefox, Safari, Edge)で動作します。

## ライセンス

このプロジェクトはオープンソースです。自由に使用・改変できます。

## 貢献

バグ報告や機能追加の提案は、Issueまたはプルリクエストでお願いします。

## 作者

csv-calendar2プロジェクト

---

**注意**: このアプリケーションはクライアントサイドのみで動作します。サーバーサイドの処理は不要です。
