const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/models", express.static("models"));
app.use("/data", express.static("data"));

// Route pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get("/ar-select", (req, res) => res.sendFile(path.join(__dirname, "public/ar-select.html")));
app.get("/ar-select.html", (req, res) => res.sendFile(path.join(__dirname, "public/ar-select.html")));
app.get("/ar", (req, res) => res.sendFile(path.join(__dirname, "public/ar.html")));
app.get("/ar.html", (req, res) => res.sendFile(path.join(__dirname, "public/ar.html")));

app.listen(PORT, "0.0.0.0", () => {
    console.log("================================");
    console.log("🚀 Heritage AR Server Running");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📱 AR Mode: http://localhost:${PORT}/ar-select`);
    console.log("================================");
});