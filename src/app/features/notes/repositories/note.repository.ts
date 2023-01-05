import { randomUUID } from 'crypto';
import { DatabaseConnection } from '../../../../main/database/typeorm.connection';
import { NoteModel } from '../../../models/note.model';
import { UserModel } from '../../../models/user.model';

interface UpdateNoteDTO {
    id: string;
    title?: string;
    description?: string;
}

export class NoteRepository {
    private _repository = DatabaseConnection.connection.getRepository(NoteEntity);

    public async list(id: string) {
        const result = await this._repository.find({
            relations: ['users']
        });

        const tasks = result.map(item => {
            return this.mapEntityToModel(item);
        });

        return tasks;
    }

    public async getById(id: string) {
        const result = await this._repository.findOneBy({
            id
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public async create(taskDTO: CreateTaskDTO): Promise<NoteModel> {
        const userRepository = new UserRepository();
        const user = await userRepository.get(taskDTO.userId);

        if (!user) {
            throw new Error('User is not found!');
        }

        const taskEntity = this._repository.create({
            id: randomUUID(),
            title: taskDTO.title,
            description: taskDTO.description,
            idUser: taskDTO.userId
        });

        await this._repository.save(taskEntity);

        return this.mapEntityToModel(taskEntity, user);
    }

    public async update(task: UpdateNoteDTO) {
        const result = await this._repository.update(
            {
                id: task.id
            },
            {
                title: task.title,
                description: task.description
            }
        );

        return result.affected ?? 0;
    }

    public async delete(id: string) {
        return await this._repository.delete({
            id
        });
    }

    private mapEntityToModel(taskEntity: NoteEntity, userModel?: UserModel) {
        const user =
            userModel ?? UserModel.create(taskEntity.users.name, taskEntity.users.email, taskEntity.users.password, taskEntity.users.id);

        return NoteModel.create(taskEntity.id, taskEntity.title, taskEntity.description, user);
    }
}
