const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/api/datos', async (req, res) => {
  try {
    const users = await prisma.datos.findMany(); // Update the function to match the table name
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.post('/api/datos', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.datos.create({ // Update the function to match the table name
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
});

app.get('/api/datos/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.datos.findUnique({
      where: { id: userId },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

app.put('/api/datos/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const user = await prisma.datos.update({
      where: { id: userId },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

app.delete('/api/datos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.datos.delete({ // Update the function to match the table name
      where: { id },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


