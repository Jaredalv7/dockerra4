const express = require('express');
const path = require('path');
const { Client } = require('pg'); 
const app = express();

const port = process.env.PORT || 8080;

// ==========================
//  CONEXIÓN A POSTGRES (RENDER)
// ==========================

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa."))
  .catch(err => console.error("❌ Error conectando a la base de datos:", err));

app.set("db", client);

// ==========================
//  ARCHIVOS ESTÁTICOS
// ==========================
app.use(express.static(path.join(__dirname, 'public')));

// ==========================
//  ENDPOINT HEALTH
// ==========================
app.get('/api/health', async (req, res) => {
  try {
    await client.query("SELECT NOW()");
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.json({ status: 'error', database: err });
  }
});

// ==========================
//  NUEVO ENDPOINT – Obtener datos reales
// ==========================
app.get("/api/demogorgons", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM demogorgons");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error ejecutando SELECT:", error);
    res.status(500).json({ error: "Error consultando datos" });
  }
});

// ==========================
//  PÁGINA PRINCIPAL
// ==========================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================
//  INICIAR SERVIDOR
// ==========================
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en puerto ${port}`);
});
