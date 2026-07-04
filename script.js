const fundList = document.getElementById("fundList");

function displayFunds(list) {
  if (!fundList) return;

  fundList.innerHTML = "";

  if (!list || list.length === 0) {
    fundList.innerHTML = `
      <div class="card">
        <h3>該当する商品がありません</h3>
        <p>別のキーワードで検索してください。</p>
      </div>
    `;
    return;
  }

  list.forEach(function(fund) {
    const card = document.createElement("div");
    card.className = "card";

    const tagsHtml = fund.tags.map(function(tag) {
      return `<span class="badge">${tag}</span>`;
    }).join("");

    card.innerHTML = `
      <h3>${fund.name}</h3>

      <div class="badges">
        ${tagsHtml}
      </div>

      <div class="info">
        <p><strong>種類：</strong>${fund.type}</p>
        <p><strong>利回り目安：</strong>${fund.yield}</p>
        <p><strong>分配頻度：</strong>${fund.frequency}</p>
        <p><strong>コスト：</strong>${fund.fee}</p>
        <p><strong>NISA：</strong>${fund.nisa}</p>
      </div>

      <button class="detail-btn">詳しく見る</button>
    `;

    fundList.appendChild(card);
  });
}

function searchFunds() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();

  if (keyword === "") {
    displayFunds(funds);
    return;
  }

  const result = funds.filter(function(fund) {
    const text =
      fund.name + " " +
      fund.type + " " +
      fund.yield + " " +
      fund.frequency + " " +
      fund.fee + " " +
      fund.nisa + " " +
      fund.tags.join(" ");

    return text.includes(keyword);
  });

  displayFunds(result);
}

function filterFunds(tag) {
  const result = funds.filter(function(fund) {
    return fund.tags.includes(tag);
  });

  displayFunds(result);
}

function showAllFunds() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";

  displayFunds(funds);
}

function calculateDividend() {
  const amountInput = document.getElementById("amount");
  const rateInput = document.getElementById("yieldRate");
  const resultBox = document.getElementById("result");

  const amount = Number(amountInput.value);
  const yieldRate = Number(rateInput.value);

  if (!amount || !yieldRate) {
    resultBox.innerText = "投資額と利回りを入力してください。";
    return;
  }

  const yearly = amount * (yieldRate / 100);
  const monthly = yearly / 12;

  resultBox.innerHTML =
    "年間分配金目安：約" + Math.round(yearly).toLocaleString() + "円<br>" +
    "月間分配金目安：約" + Math.round(monthly).toLocaleString() + "円";
}

function calculateNeedMoney() {
  const incomeInput = document.getElementById("targetIncome");
  const rateInput = document.getElementById("targetYield");
  const resultBox = document.getElementById("needResult");

  const income = Number(incomeInput.value);
  const rate = Number(rateInput.value);

  if (!income || !rate) {
    resultBox.innerText = "欲しい月額配当と想定利回りを入力してください。";
    return;
  }

  const yearlyIncome = income * 12;
  const need = yearlyIncome / (rate / 100);

  resultBox.innerHTML =
    "必要投資額：約" + Math.round(need).toLocaleString() + "円";
}

displayFunds(funds);
