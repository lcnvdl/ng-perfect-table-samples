import { UserService } from './services/user.service';
import { UserDataSourceInput } from './behaviour/user.data-source-input';
import { Component } from '@angular/core';
import { DataSourceInputTest } from './behaviour/test.data-source-input';
import { ColumnDefinition, ITableInput } from "ng-perfect-table-beta";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'perfect-table-sample';
  dataSourceInput: DataSourceInputTest;
  tableInput: ITableInput;

  usersDataSourceInput: UserDataSourceInput;
  usersTableInput: ITableInput;

  constructor(private userSv: UserService) {
    this.makeUsersTable();
    this.makeTestTable();
  }

  get delay() {
    return this.dataSourceInput.delay+"";
  }

  set delay(v) {
    this.dataSourceInput.delay = +v;
  }

  makeUsersTable() {
    this.usersDataSourceInput = new UserDataSourceInput(this.userSv);

    let col = new ColumnDefinition();
    col.id = "id";
    col.title = "ID";

    let col2 = new ColumnDefinition();
    col2.id = "name";
    col2.title = "Name";

    let col3 = new ColumnDefinition();
    col3.id = "email";
    col3.title = "E-Mail";

    this.usersTableInput = {
      columns: [
        col,
        col2,
        col3
      ]
    };
  }

  makeTestTable() {
    this.dataSourceInput = new DataSourceInputTest(2000);

    let col = new ColumnDefinition();
    col.id = "id";
    col.title = "ID";
    let col2 = new ColumnDefinition();
    col2.id = "name";
    col2.title = "Name";

    this.tableInput = {
      columns: [
        col,
        col2
      ]
    };
  }
}
