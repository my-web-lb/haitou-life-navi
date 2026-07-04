const fundList = document.getElementById("fundList");

function displayFunds(list) {
  fundList.innerHTML = "";

  list.forEach(fund => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${fund.name}</h3>
      <div class="badges">
        ${fund.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}
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
  const keyword = document.getElementById("searchInput").value.trim();

  if (keyword === "") {
    displayFunds(funds);
    return;
  }

  const result = funds.filter(fund => {
    const text = `
      ${fund.name}
      ${fund.type}
      ${fund.yield}
      ${fund.frequency}
      ${fund.fee}
      ${fund.nisa}
      ${fund.tags.join(" ")}
    `;

    return text.includes(keyword);
  });

  displayFunds(result);
}

function filterFunds(tag) {
  const result = funds.filter(fund => fund.tags.includes(tag));
  displayFunds(result);
}

function showAllFunds() {
  document.getElementById("searchInput").value = "";
  displayFunds(funds);
}

function calculateDividend() {
  const amount = Number(document.getElementById("amount").value);
  const yieldRate = Number(document.getElementById("yieldRate").value);

  if (!amount || !yieldRate) {
    document.getElementById("result").innerText = "投資額と利回りを入力してください。";
    return;
  }

  const yearly = amount * (yieldRate / 100);
  const monthly = yearly / 12;

  document.getElementById("result").innerHTML = `
    年間分配金目安：約${Math.round(yearly).toLocaleString()}円<br>
    月間分配金目安：約${Math.round(monthly).toLocaleString()}円
  `;
}

displayFunds(funds);
