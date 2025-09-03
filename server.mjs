import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
