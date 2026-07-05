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
    card.className = "fund-card";

    const tagsHtml = fund.tags.slice(0, 3).map(function(tag) {
      return `<span class="badge">${tag}</span>`;
    }).join("");

    const nisaClass = fund.nisa.includes("NISA") ? "nisa-ok" : "nisa-ng";

    card.innerHTML = `
      <div class="fund-card-top">
        <span class="rank-badge">${fund.badge}</span>
        <span class="fund-type">${fund.type}</span>
      </div>

      <h3>${fund.name}</h3>

      <div class="yield-box">
        <div>
          <span class="yield-label">利回り目安</span>
          <strong>${fund.yieldDisplay}</strong>
        </div>
        <div>
          <span class="yield-label">分配</span>
          <strong>${fund.frequency}</strong>
        </div>
      </div>

      <p class="fund-point">${fund.point}</p>

      <div class="mini-info">
        <span>コスト：${fund.fee}</span>
        <span class="${nisaClass}">${fund.nisa}</span>
      </div>

      <div class="badges">
        ${tagsHtml}
      </div>

      <button class="detail-btn" onclick="location.href='${fund.url}'">
        詳しく見る →
      </button>
    `;

    fundList.appendChild(card);
  });
}

function searchFunds() {
  const input = document.getElementById("searchInput");

  if (!input) return;

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
      fund.yieldDisplay + " " +
      fund.frequency + " " +
      fund.fee + " " +
      fund.nisa + " " +
      fund.badge + " " +
      fund.point + " " +
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

  if (input) {
    input.value = "";
  }

  displayFunds(funds);
}

function calculateDividend() {
  const amountInput = document.getElementById("amount");
  const rateInput = document.getElementById("yieldRate");
  const resultBox = document.getElementById("result");

  if (!amountInput || !rateInput || !resultBox) return;

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

  if (!incomeInput || !rateInput || !resultBox) return;

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

if (typeof funds !== "undefined") {
  displayFunds(funds);
}
