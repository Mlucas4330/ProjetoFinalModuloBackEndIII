import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { NoteRepository } from "../repositories/note.repository";

export class ListNoteUseCase {
  constructor(
    private repository: NoteRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("tasks");

    if (cachedList) {
      return {
        cache: true,
        data: cachedList,
      };
    }

    const result = await this.repository.list("tasks");
    const resultJson = result.map((item: { toJson: () => any; }) => item.toJson());

    await this.cacheRepository.set("tasks", resultJson);

    return resultJson;
  }
}