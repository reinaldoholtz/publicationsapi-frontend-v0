import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private stateService: StateService 
  ) { }

  ngOnInit(): void {
    this.stateService.setState({
      pageIndex: 0,
      pageSize: 0,
      query: '',
    });   
  }

}
