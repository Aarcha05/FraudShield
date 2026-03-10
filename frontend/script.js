document.getElementById("fraudForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let data = {
        Time: parseFloat(Time.value),
        Amount: parseFloat(Amount.value)
    };

    for (let i = 1; i <= 28; i++) {
        data["V" + i] = parseFloat(document.getElementById("V" + i).value) || 0;
    }

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    document.getElementById("result").innerHTML =
        result.Fraud === 1
            ? `⚠️ FRAUD DETECTED <br> Probability: ${result.Probability.toFixed(2)}`
            : `✅ Legit Transaction <br> Probability: ${result.Probability.toFixed(2)}`;
});
