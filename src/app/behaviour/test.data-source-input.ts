import { Observable, of } from 'rxjs';
import { SortType, ISortDefinition, IDataSourceInput, ILoadPageResult } from 'ng-perfect-table-beta';

export class DataSourceInputTest implements IDataSourceInput {
    constructor(public delay = 0) {
    }

    load(page: number, count: number, filters?: any, sort?: ISortDefinition[]): Observable<ILoadPageResult> {
        const result: ILoadPageResult = {
            total: 25,
            entities: this.getEntities(page, count, filters, sort)
        };

        if (this.delay === 0) {
            return of(result);
        }

        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(result);
                observer.complete();
            }, this.delay);
        });
    }

    private getEntities(page, count, filters, sort?: ISortDefinition[]): any[] {
        const list = [];

        let from = page * count;
        let to = (page + 1) * count;

        for (let i = 0; i < 25; i++) {
            list.push({ id: i, name: "ABC" });
        }

        if (sort && sort.filter(m => m.type !== SortType.None).length > 0) {
            const s = sort.find(m => m.type !== SortType.None);
            list.sort((a, b) => {
                if (s.type == SortType.Asc) {
                    return a[s.column] - b[s.column];
                }
                else {
                    return b[s.column] - a[s.column];
                }
            });
        }

        let finalList = [];

        for (let i = 0; i < 25; i++) {
            if (i >= from && i < to) {
                finalList.push(list[i]);
            }
        }

        return finalList;
    }
}