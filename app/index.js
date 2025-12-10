const express = require('express');
const path = require('path');
const { Client } = require('pg'); // <-- PostgreSQL client
const app = express();

const port = process.env.PORT || 8080;

// ==========================
//  CONEXIÓN A POSTGRES (RENDER)
// ==========================

const client = new Client({
  host: process.env.DB_HOST,     // ejemplo: dpg-cxxxxx.render.com
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false    // Render requiere SSL
  }
});

client.connect()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa."))
  .catch(err => console.error("❌ Error conectando a la base de datos:", err));

// Guardamos conexión en app
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
