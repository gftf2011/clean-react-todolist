// import { FindNotesUseCase } from '@/domain/use-cases';

// import { Storage } from '@/use-cases/ports/gateways';

// type NoteCache = {
//   previous: boolean;
//   next: boolean;
//   notes: any[];
// };

// export class CacheUseCaseProxy implements FindNotesUseCase {
//   constructor(
//     private readonly interactor: FindNotesUseCase,
//     private readonly storage: Storage
//   ) {}

//   public async execute(
//     input: FindNotesUseCase.Input
//   ): Promise<FindNotesUseCase.Output> {
//     const notesCache: NoteCache[] = this.storage.get(Storage.KEYS.NOTES);

//     if (!notesCache) {
//       const response = await this.interactor.execute(input);

//       this.storage.set(Storage.KEYS.NOTES, [response.paginatedNotes]);

//       return response;
//     }

//   }
// }
