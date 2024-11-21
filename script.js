// 投票を送信する
function vote(option, topic_id) {
    fetch('vote.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `option=${option}&topic_id=${topic_id}`
    })
    .then(response => response.text())
    .then(() => fetchResults()); // 投票後に結果を更新
}

// 投票結果を取得して表示
function fetchResults() {
    fetch('results.php') // サーバーから結果を取得
        .then(response => response.json())
        .then(data => {
            // HTML内の各お題の結果エリアを取得
            const resultsDiv1 = document.getElementById('results1');
            const resultsDiv2 = document.getElementById('results2');
            const resultsDiv3 = document.getElementById('results3');


            // 初期化
            resultsDiv1.innerHTML = '';
            resultsDiv2.innerHTML = '';
            resultsDiv3.innerHTML = '';


            // お題ごとにデータを振り分けて表示
            data.forEach(option => {
                if (Number(option.topic_id) === 1) { // お題１のデータ
                    resultsDiv1.innerHTML += `<p>${option.option_name}：${option.vote_count} 票</p>`;
                } else if (Number(option.topic_id) === 2) { // お題２のデータ
                    resultsDiv2.innerHTML += `<p>${option.option_name}：${option.vote_count} 票</p>`;
                } else if (Number(option.topic_id) === 3) { // お題３のデータ
                    resultsDiv3.innerHTML += `<p>${option.option_name}：${option.vote_count} 票</p>`;
                }    
            });
        })
}

// ページ読み込み時に結果を表示
document.addEventListener('DOMContentLoaded', fetchResults);
