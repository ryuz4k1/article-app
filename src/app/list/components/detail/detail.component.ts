import { Component, OnInit } from '@angular/core';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public activeArticle$ = this.service.activeArticle$;

  constructor(private service: ListService) { }

  public async ngOnInit() {
  }

}
