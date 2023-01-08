import { Request, Response, Router } from 'express';
import { noteController } from '../controllers/note.controller';

const notesRoutes = Router({
    mergeParams: true
});

const notesController = new noteController();

notesRoutes.get('/:userId', notesController.listNotes);

notesRoutes.post('/:userId', notesController.createNote);

notesRoutes.delete('/:userId/:noteId', (req: Request, res: Response) => notesController.deleteNote(req, res));

export { notesRoutes };
