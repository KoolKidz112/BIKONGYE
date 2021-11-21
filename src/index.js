//////////////
// BIKONGYE //
//          //
//  THEKI   //
// MADETHIS //
//////////////
// Todo: actually implement purchasing
// but fully implement item rendering first

// Import items
import { items } from "./items.js";
import { cryptocurrency } from "./cryptodata.js";

// Player variables
let bal = 100;
let cbal = 0;

// Shop variables
const slist = [];

// Temporary fix for a caching error
function calculateCryptoPrices() {
  const cprices = [];
  const calcCPrice = (price) =>
    price / cryptocurrency.value - (price / cryptocurrency.value) * 0.05;
  for (let i = 0; i < items.miners.length; i++) {
    cprices.push(calcCPrice(items.miners[i].bprice));
  }
}

// DOM Variables

// START DIV
const DIV_START = document.getElementById("create");
// // Buttons
const BTN_START = document.getElementById("btn-start");
// // Inputs
const INP_CRNAME = document.getElementById("cr-name");
const INP_CRCALL = document.getElementById("cr-call");
const INP_CRVAL = document.getElementById("cr-val");

// MAIN DIV
const DIV_MAIN = document.getElementById("main");
// // DIVS
// // // STATS DIV
const DIV_STAT = document.getElementById("stats");
// // // // STATS DIV TEXT
const LBL_STMN = document.getElementById("stat-main");
const LBL_STVL = document.getElementById("stat-value");
const LBL_STBL = document.getElementById("stat-bal");
// // // BUY DIV
const DIV_BUY = document.getElementById("purchase");
// // // // BUY DIV TEXT
const LBL_PDCL = document.getElementById("purc-call");
const LBL_PDTL = document.getElementById("purc-detail");
const LBL_PRSL = document.getElementById("purc-result");
const LBL_P2DT = document.getElementById("pur2-detail");
const LBL_P2RS = document.getElementById("pur2-result");
// // // // BUY DIV BUTTONS
const BTN_PURC = document.getElementById("purc-cr");
const BTN_P2RC = document.getElementById("pur2-cr");
// // // // BUY DIV INPUT
const INP_PAMT = document.getElementById("purchase-val");
const INP_P2AT = document.getElementById("pur2-val");
// // // // ITEM SLOTS
const ITEM_SLOTS = document.querySelectorAll(".slot");
// // // // BUYABLE ITEM SLOTS
const BUY_SLOTS = document.querySelectorAll("item-slot");
const ITEM_CHOICES = document.getElementById("item-choices");

// Event listeners
BTN_START.onclick = () => {
  // Assign values to variables
  cryptocurrency.name = INP_CRNAME.value;
  cryptocurrency.sign = INP_CRCALL.value;
  cryptocurrency.value = INP_CRVAL.value;
  // Bodge
  calculateCryptoPrices();
  // Unlock initial miner
  addToList(0, "m");
  updateShopListings();
  // Remove start div and show status div
  DIV_START.classList.add("hide");
  DIV_MAIN.classList.remove("hide");
  // Set values for text
  INP_PAMT.value = cryptocurrency.value;
  INP_P2AT.value = bal;
  LBL_STMN.innerHTML = `Current cryptocurrency: <em>${cryptocurrency.name}</em> [${cryptocurrency.sign}]`;
  LBL_STVL.innerHTML = `Current value: <strong>${cryptocurrency.value}</strong>`;
  LBL_STBL.innerHTML = `Current balance: <strong>0</strong> ${cryptocurrency.sign} | <strong>${bal}</strong> BKG`;
  LBL_PDCL.innerHTML = `Purchase ${cryptocurrency.name}:`;
  LBL_PDTL.innerHTML = `BKG = ${calcPurchasable()[0]} ${cryptocurrency.sign}`;
  LBL_P2DT.innerHTML = `${cryptocurrency.sign} = ${
    calcPurchasable()[1]
  } BKG (12% fee)`;
  // i need a break
};
BTN_PURC.onclick = () => {
  if (bal >= INP_PAMT.value) {
    LBL_PRSL.style.color = "#27e83d";
    LBL_PRSL.textContent = `${calcPurchasable()[0]} ${
      cryptocurrency.name
    } successfully purchased!`;
    bal -= INP_PAMT.value;
    cbal += calcPurchasable()[0];
    updateBalanceEverywhere();
  } else {
    LBL_PRSL.style.color = "#d62f2f";
    LBL_PRSL.textContent = `You need ${
      INP_PAMT.value - bal
    } more BKG to purchase this amount of ${cryptocurrency.name}.`;
  }
};
BTN_P2RC.onclick = () => {
  if (cbal >= INP_PAMT.value) {
    LBL_P2RS.style.color = "#27e83d";
    LBL_P2RS.textContent = `${
      calcPurchasable()[1]
    } BKG successfully purchased!`;
    cbal -= INP_P2AT.value;
    bal += calcPurchasable()[1];
    updateBalanceEverywhere();
  } else {
    LBL_P2RS.style.color = "#d62f2f";
    LBL_P2RS.textContent = `You need ${INP_P2AT.value - cbal} more ${
      cryptocurrency.sign
    } to purchase this amount of BKG.`;
  }
};
INP_PAMT.addEventListener(
  "input",
  () =>
    (LBL_PDTL.innerHTML = `BKG = ${calcPurchasable()[0]} ${
      cryptocurrency.sign
    }`)
);
INP_P2AT.addEventListener("input", () => {
  LBL_P2DT.innerHTML = `${cryptocurrency.sign} = ${
    calcPurchasable()[1]
  } BKG (12% fee)`;
});

// Functions
const calcPurchasable = () => [
  INP_PAMT.value / cryptocurrency.value,
  cryptocurrency.value * INP_P2AT.value -
    cryptocurrency.value * INP_P2AT.value * 0.12
];
function updateBalanceEverywhere() {
  LBL_STBL.innerHTML = `Current balance: <strong>${
    cbal % 1 !== 0 ? cbal.toFixed(6) : cbal
  }</strong> ${cryptocurrency.sign} | <strong>${bal}</strong> BKG`;
}
function addToList(item, type) {
  switch (type) {
    case "m":
    case "miner":
      items.miners[item].enabled = true;
      slist.push(items.miners[item]);
      break;
    default:
      throw new Error(
        "Item type not specified in addToList(" + item + "," + type + ")"
      );
  }
} // CHANGE ID WHEN PURCHASE (just implementing rendering for now)
function updateShopListings() {
  for (let i = 0; i < slist.length; i++) {
    const listing = document.createElement("div");
    listing.classList.add("item-slot");
    listing.innerHTML = `<strong>${slist[i].name}</strong><br />
    <em>Max ${slist[i].hashrate} hashes per second (N/A ${cryptocurrency.sign}/s)</em><br />
    <span>${slist[i].bprice} BKG | ${slist[i].cprice} ${cryptocurrency.sign}</span>`;
    ITEM_CHOICES.appendChild(listing);
    console.log(listing);
  }
}
