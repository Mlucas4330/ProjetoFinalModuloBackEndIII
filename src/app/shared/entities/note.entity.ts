import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
    name: 'notes'
})
export class NoteEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        name: 'id_user'
    })
    idUser: string;

    @ManyToOne(() => UserEntity, {
        eager: true
    })
    @JoinColumn({ name: 'id_user' })
    users: UserEntity;
}
