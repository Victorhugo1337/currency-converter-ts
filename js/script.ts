async function fetchExchangeRate(from: string, to: string): Promise<number> {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await res.json();
    return data.rates[to];
}

document.getElementById("convertBtn")!.addEventListener("click", async () => {
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const fromCurrency = (document.getElementById("fromCurrency") as HTMLSelectElement).value;
    const toCurrency = (document.getElementById("toCurrency") as HTMLSelectElement).value;
    const resultElement = document.getElementById("result") as HTMLElement;

    const amount = parseFloat(amountInput.value);

    if (isNaN(amount)) {
        alert("Insira um valor válido!");
        return;
    }

    try {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        const result = amount * rate;
        resultElement.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (err) {
        console.error(err);
        alert("Erro ao buscar taxas de câmbio.");
    }
});