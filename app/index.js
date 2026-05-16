const express = require('express');
const winston = require('winston');
const client = require('prom-client');
const path = require('path');

const app = express();
const port = 5000;

// Configurare Loguri JSON
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new winston.transports.Console()]
});

// METRICI
const httpRequestLatency = new client.Histogram({
    name: 'http_request_latency_seconds',
    help: 'Durata cererilor',
    labelNames: ['endpoint']
});

const ordersTotal = new client.Counter({
    name: 'shop_orders_total',
    help: 'Numar total de comenzi plasate',
    labelNames: ['status']
});

ordersTotal.labels('success').inc(0);
ordersTotal.labels('failed').inc(0);

// Endpoint pentru Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Servim interfata grafica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint Comanda (Succes)
app.post('/api/order', (req, res) => {
    const end = httpRequestLatency.startTimer();
    const delay = Math.random() * 200; // Rapid
    setTimeout(() => {
        ordersTotal.inc({ status: 'success' });
        logger.info({ message: "Comanda plasata cu succes", amount: 50 });
        res.status(201).json({ message: "Comanda confirmata!" });
        end({ endpoint: '/api/order' });
    }, delay);
});

// Endpoint Comanda (Eroare/Lenta)
app.post('/api/order-error', (req, res) => {
    const end = httpRequestLatency.startTimer();
    const delay = 2000; // Foarte lent
    setTimeout(() => {
        ordersTotal.inc({ status: 'failed' });
        logger.error({ message: "Eroare procesare plata", error: "Gateway Timeout" });
        res.status(500).json({ error: "Plata a esuat!" });
        end({ endpoint: '/api/order-error' });
    }, delay);
});

app.listen(port, '0.0.0.0', () => {
    logger.info({ message: "Pizza Shop Server pornit pe portul 5000" });
});