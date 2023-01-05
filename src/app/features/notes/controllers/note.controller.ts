import { Request, Response } from 'express';
import { CacheRepository } from '../../../shared/repositories/cache.repository';
import { serverError, success } from '../../../shared/util/response.helper';

export class noteController {
    public async listNotes(req: Request, res: Response) {
        try {
            const usecase = new ListNotesUseCase(new NoteRepository(), new CacheRepository());

            const result = await usecase.execute();

            if (!result) {
                return null;
            }

            return success(res, result);
        } catch (error: any) {
            return serverError(res, error);
        }
    }

    public async createNote(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { title, description } = req.body;

            const usecase = new CreateNoteUseCase(new NoteRepository(), new CacheRepository());

            const result = await usecase.execute({
                title,
                description,
                userId
            });

            return res.status(201).send({
                ok: true,
                message: 'Tarefa criada com sucesso',
                data: result
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            });
        }
    }

    public async deleteNote(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const repository = new NoteRepository();
            const result = await repository.delete(id);

            return res.status(200).send({
                ok: true,
                data: result
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            });
        }
    }
}
