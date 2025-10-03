import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('./dist'));

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => console.log(`Server started at port ${PORT} in http://localhost:${PORT}`));
