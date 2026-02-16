import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'


const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend'});
});

app.get('/api/activities', async (req, res) => {
    try{
        const data = await fs.readFile('./data/activities.json', 'utf-8')
        const activities = JSON.parse(data)
        res.json(activities)
    } catch {
        res.status(500).json({error: 'Failed to read activities',})
    }
    
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

