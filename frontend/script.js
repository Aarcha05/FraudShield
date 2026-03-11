document.getElementById("fraudForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.className = "";
    resultDiv.innerHTML = "⏳ Checking...";

    let data = {
        Time: parseFloat(document.getElementById("Time").value) || 0,
        Amount: parseFloat(document.getElementById("Amount").value) || 0
    };

    for (let i = 1; i <= 28; i++) {
        data["V" + i] = parseFloat(document.getElementById("V" + i).value) || 0;
    }

    try {
        const response = await fetch("/predict", {  // ✅ works locally AND on Render
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.Fraud === 1) {
            resultDiv.className = "fraud";
            resultDiv.innerHTML = `🚨 FRAUD DETECTED <br> Probability: ${(result.Probability * 100).toFixed(2)}%`;
        } else {
            resultDiv.className = "safe";
            resultDiv.innerHTML = `✅ Legit Transaction <br> Probability: ${(result.Probability * 100).toFixed(2)}%`;
        }

    } catch (error) {
        resultDiv.className = "fraud";
        resultDiv.innerHTML = "❌ Error connecting to server. Please try again.";
    }
});