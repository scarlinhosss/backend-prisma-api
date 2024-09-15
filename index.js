const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express;
app.use(express.json());

app.get('/revenues', async (req, res) =>  {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.post('/revenues', async (req, res) => {
    const {origin, value } = req.body;
    const finances = await prisma.finances.create({
        data: { origin, value },
    });
    res.json(finances);
})

app.put('/revenues/:id', async (req, res) => {
    const { id } = req.params;
    const { origin, value } = req.body;
    const revenue = await prisma.revenue.update({
        where: { id: Number(id) },
        data: { origin, value },
    });
    res.json(revenues);
});

app.delete('/revenues/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.revenue.delete({
        where: {id: Number(id) },
    });
    res.json({message: 'Usuário deletado' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});