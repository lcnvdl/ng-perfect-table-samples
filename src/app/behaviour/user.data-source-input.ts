import { UserService } from './../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortType, ISortDefinition, IDataSourceInput, ILoadPageResult } from 'ng-perfect-table';

export class UserDataSourceInput implements IDataSourceInput {
    constructor(private userSv: UserService) {
    }

    load(page: number, count: number, filters?: any, sort?: ISortDefinition[]): Observable<ILoadPageResult> {
        return this.userSv.getUsers().pipe(map(users => {
            const universe = users;

            if (sort && sort.filter(m => m.type !== SortType.None).length > 0) {
                const s = sort.find(m => m.type !== SortType.None);
                universe.sort((a, b) => {
                    if (s.type === SortType.Asc) {
                        return a[s.column] - b[s.column];
                    }
                    else {
                        return b[s.column] - a[s.column];
                    }
                });
            }

            const finalList = [];
            const from = page * count;
            const to = (page + 1) * count;

            for (let i = 0; i < universe.length; i++) {
                if (i >= from && i < to) {
                    finalList.push(universe[i]);
                }
            }

            const result: ILoadPageResult = {
                entities: finalList,
                total: universe.length
            };

            return result;
        }));
    }
}