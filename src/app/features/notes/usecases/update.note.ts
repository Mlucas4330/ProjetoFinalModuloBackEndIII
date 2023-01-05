import { CacheRepository } from '../../../shared/repositories/cache.repository';
import { NoteRepository } from '../repositories/note.repository';

interface UpdateNoteDTO {
    id: string;
    title?: string;
    description?: string;
}

export class UpdateTaskUseCase {
    constructor(private repository: NoteRepository, private cacheRepository: CacheRepository) {}

    public async execute(data: UpdateNoteDTO) {
        const note = await this.repository.getById(data.id);

        if (!note) {
            return null;
        }

        note.title = data.title ?? note.title;
        note.description = data.description ?? note.description;

        const result = await this.repository.update(note);

        await this.cacheRepository.delete(`note-${note.id}`);
        await this.cacheRepository.delete('notes');

        return result;
    }
}
