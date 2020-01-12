import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/interfaces';
import {FbService} from '../shared/fb.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  users: User[];
  pageUsers: User[];
  curPage = 1;
  numOfPages = 1;
  usersInPage = 50;
  usFbService: Subscription;

  constructor(private fbService: FbService,
             // private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.usFbService = this.fbService.getAll<User>().subscribe(users => {
        this.users = users;
        this.numOfPages = this.users.length / this.usersInPage;
        this.setCurPage(localStorage.getItem('curPage'));
      }
    );
  }

  setCurPage(n: string) {
    const num = +n;
    this.curPage = isNaN(num) ? 1 : (num < 1 ? 1 : num > this.numOfPages ? this.numOfPages : num);
    const sp = (this.curPage - 1) * this.usersInPage;
    this.pageUsers = this.users.slice(sp, sp + this.usersInPage);
    localStorage.setItem('curPage', this.curPage.toString());
  }

  ngOnDestroy(): void {
    if (this.usFbService) {
      this.usFbService.unsubscribe();
    }
  }
}
