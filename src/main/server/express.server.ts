import { createServer } from "../config/express.config";

export const runServer = () => {
    const app = createServer();

    app.listen(process.env.PORT, () => {
        console.log('Rodando...');
    });
};