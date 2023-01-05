import { Request, Response, Router } from 'express';
import { noteController } from '../controllers/note.controller';

const notesRoutes = Router({
    mergeParams: true
});

const notesController = new noteController();

notesRoutes.get('/:userId', notesController.listTask);

notesRoutes.post('/:userId', notesController.createTask);

notesRoutes.delete('/:userId/:taskId', (req: Request, res: Response) => notesController.deleteTask(req, res));

export { notesRoutes };
