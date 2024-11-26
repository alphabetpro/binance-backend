const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/binance-p2p", async (req, res) => {
    try {
        // Configuración de la API de Binance
        const response = await axios.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
            asset: "USDT",
            tradeType: "BUY",
            fiat: "BOB",
            page: 1,
            rows: 10
        });

        const data = response.data.data;
        const prices = data.map(item => parseFloat(item.adv.price));
        const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;

        res.json({ averagePrice: averagePrice.toFixed(2) });
    } catch (error) {
        console.error("Error fetching Binance data:", error);
        res.status(500).json({ error: "Error fetching Binance data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
