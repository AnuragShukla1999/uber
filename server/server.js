import http from 'http';
import app from './index.js';

const port = 3002;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})