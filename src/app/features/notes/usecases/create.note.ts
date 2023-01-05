import { CacheRepository } from '../../../shared/repositories/cache.repository';
import { NoteRepository } from '../repositories/note.repository';

export interface CreateNoteDTO {
    title: string;
    description: string;
    userId: string;
}

export class CreateNoteUseCase {
    constructor(private repository: NoteRepository, private cacheRepository: CacheRepository) {}

    public async execute(data: CreateNoteDTO) {
        const result = await this.repository.create(data);

        await this.cacheRepository.delete('tasks');

        return result.toJson();
    }
}
