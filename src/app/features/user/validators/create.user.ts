import { NextFunction, Request, Response } from 'express';

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, pass } = req.body;

    if (!name) {
        return res.status(400).send({
            ok: false,
            message: 'Name not provided!'
        });
    }

    if (!email) {
        return res.status(400).send({
            ok: false,
            message: 'Email not provided!'
        });
    }

    if (!pass) {
        return res.status(400).send({
            ok: false,
            message: 'Senha not provided!'
        });
    }

    next();
};
