import { Observable, of } from 'rxjs';
import { SortType, ISortDefinition, IDataSourceInput, ILoadPageResult } from 'ng-perfect-table';

export class DataSourceInputTest implements IDataSourceInput {
    constructor(public delay = 0) {
    }

    load(page: number, count: number, filters?: any, sort?: ISortDefinition[]): Observable<ILoadPageResult> {
        const result: ILoadPageResult = {
            total: 100,
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

        const from = page * count;
        const to = (page + 1) * count;

        const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const total = 100;

        const getRandomChar = () => abc[Math.floor(Math.random() * abc.length)];
        const getRandomName = () => {
            let len = 2 + Math.random() * 5;
            let name = getRandomChar();

            while (len-- > 0) {
                name += getRandomChar().toLowerCase();
            }

            return name;
        };

        for (let i = 0; i < total; i++) {
            list.push({ id: i, name: getRandomName() });
        }

        if (sort && sort.filter(m => m.type !== SortType.None).length > 0) {
            const s = sort.find(m => m.type !== SortType.None);
            list.sort((a, b) => {
                if (s.type === SortType.Asc) {
                    return a[s.column] - b[s.column];
                }
                else {
                    return b[s.column] - a[s.column];
                }
            });
        }

        const finalList = [];

        for (let i = 0; i < total; i++) {
            if (i >= from && i < to) {
                finalList.push(list[i]);
            }
        }

        return finalList;
    }
}