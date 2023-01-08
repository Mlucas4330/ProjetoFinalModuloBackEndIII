import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { NoteEntity } from './note.entity';

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        length: 60
    })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => NoteEntity, note => note.users)
    task: NoteEntity[];
}
