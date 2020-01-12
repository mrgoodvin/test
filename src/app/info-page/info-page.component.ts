import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Statistics, User} from '../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {FbService} from '../shared/fb.service';
import {map, switchMap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fbService: FbService,
  ) {
  }
  user$: Observable<User>;

  private id: number;

  to: string = moment(new Date()).format('YYYY-MM-DD');
  prev: string = moment(this.to).subtract(7, 'days').format('YYYY-MM-DD');


  statisticsData$: Observable<any>;

  padding: any = {left: 0, top: 5, right: 0, bottom: 5};
  titlePadding: any = {left: 0, top: 0, right: 0, bottom: 10};
  xAxis: any =
    {
      dataField: 'Day',
      showGridLines: true
    };
  seriesGroups: any[] =
    [
      {
        type: 'column',
        columnsGapPercent: 50,
        seriesGapPercent: 0,
        valueAxis:
          {
            unitInterval: 100,
            minValue: 0,
            maxValue: 100,
            displayValueAxis: true,
            description: 'amount',
            axisSize: 'auto',
            tickMarksColor: '#888888'
          },
        series: [
          {dataField: 'Clicks', displayText: 'Clicks'},
          {dataField: 'Views', displayText: 'Views'}
        ]
      }
    ];

  ngOnInit() {
    this.user$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.id = +params['id:'];
            const id = +params['id:'] - 1;
            return this.fbService.getByUKey<User>(`/users/${id}.json`);
          }
        )
      );
    this.getStatics();
  }


  getStatics() {
    this.statisticsData$ = this.fbService.getAll<Statistics>('/users_statistic.json').pipe(
      map((arr, idx) => {
        return arr.filter((st, ix, sts) => {
          return st.user_id === (this.id) &&
            moment(st.date).format('YYYY-MM-DD') <= this.to &&
            moment(st.date).format('YYYY-MM-DD') >= this.prev;
        });
      })).pipe(
      map(ar => {
        return ar.map((s, idx, a) => {
          this.seriesGroups[0].valueAxis.maxValue = Math.max(s.clicks, s.page_views, this.seriesGroups[0].valueAxis.maxValue);
          return {Day: moment(s.date).format('MM/DD'), Clicks: s.clicks, Views: s.page_views};
        });
      }));
  }
}
