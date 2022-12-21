import { Router } from "express";
import { NoteController } from "../controllers/note.controller";

export const note_route = Router();

const noteController = new NoteController();

note_route.get('/:id_user', noteController.list);

note_route.get('/:id_user/:id', noteController.find);

note_route.post('/:id_user/criar', noteController.save)

note_route.put('/:id_user/:id', noteController.update);

note_route.delete('/:id_user/:id', noteController.delete);