const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

const getCurrencies = async () => {
  const response = await fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json"
  );
  const data = await response.json();
  const result = await data;
  return result;
};

getCurrencies().then((result) => {
  const arrayCurrencies = result.filter(
    (currency) =>
      currency.cc === "USD" || currency.cc === "GBP" || currency.cc === "EUR"
  );
  rates.USD = arrayCurrencies[1];
  rates.EUR = arrayCurrencies[2];
  rates.GBP = arrayCurrencies[0];
  elementUSD.textContent = rates.USD.rate.toFixed(2);
  elementEUR.textContent = rates.EUR.rate.toFixed(2);
  elementGBP.textContent = rates.GBP.rate.toFixed(2);
});

const convertValue = () => {
  result.value = (
    parseFloat(input.value) / parseFloat(rates[select.value].rate)
  ).toFixed(2);
};

const convertValueCurrency = () => {
  input.value = (
    parseFloat(result.value) * parseFloat(rates[select.value].rate)
  ).toFixed(2);
};

input.addEventListener("input", convertValue);

select.addEventListener("input", convertValue);

result.addEventListener("input", convertValueCurrency);

getCurrencies();

setInterval(getCurrencies, 60000);
