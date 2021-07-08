import {Component, Input, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, Label, MultiDataSet} from 'ng2-charts';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';



/*
With selector we specify the home/index-page from the queries component.
 With templateUrl we define the path to access to the home/index-page.
  With styleUrls we define the path to the scss file which allows us to better
  structure and organize all the files contained in the diagrams component.
 */
@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.scss']
})
export class DiagramsComponent implements OnInit{
  @Input() caluclatedResult: number;
  @Input() selectedValuesArray: number[];
  temp: number[];
  alltableDatas = [];
  ResponseofTheTemplate: any;
  UpdateDiagram = ['Diagramm bearbeiten', 'Diagramm löschen', 'neue Zeile', 'neue Spalte' ];
  UpdateLine = ['Zeile bearbeiten', 'Zeile löschen' ];
  UpdateColumn = ['Spalte bearbeiten', 'Spalte löschen' ];
  visible = true;
  hideElement = true;
  public formDiagram!: FormGroup;
  iddiagram: number;
  idligne: number;
  // the constructor of the class
  constructor(private http: HttpClient, private fb: FormBuilder, public dialog: MatDialog) {
  }


  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Product A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product B' }
  ];

  // Labels shown on the x-axis
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // Teil 2

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2500, 5900, 6000, 8100, 8600, 8050, 1200], label: 'Company A' },
    { data: [2800, 4800, 4000, 7900, 9600, 8870, 1400], label: 'Company B' }
  ];

  // Teil3
  doughnutChartLabels: Label[] = ['PUBG', 'Call of Duty', 'Fortnite'];
  doughnutChartData: MultiDataSet = [
    [53, 30, 17]
  ];
  doughnutChartType: ChartType = 'doughnut';

  // Teil 4
  bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 80,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 250000,
          }
        }
      ]
    }
  };
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend = true;

  bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 45, y: 150000, r: 22.22 },
        { x: 42, y: 110000, r: 33.00 },
        { x: 60, y: 80637, r: 15.22 },
        { x: 75, y: 195055, r: 21.50 },
        { x: 30, y: 160446, r: 35.67 },
      ],
      label: 'Units sold, Sales and Profitability'
    },
  ];


  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
/*
  onExportJson(){
    const data = JSON.stringify({wether: { is_sunny: true, temp: '+25'}});
  }*/

  /*
    ngOnInit is called by Angular and indicate that Angular is done creating the component.
    */
  ngOnInit() {
    console.log(' Received Array: ', this.selectedValuesArray)
    this.formDiagram = this.fb.group({
      updateDiagram: [''],
      updateLine: [''],
      updateColumn: ['']
    });
    this.temp = this.selectedValuesArray;
    console.log(this.temp);
    console.log(this.selectedValuesArray);
    }

  onSubmit() {
    //  console.log('value: ', this.form.value);
    const send = this.http.get('http://localhost:9090/RadiologieDashboard/api/diagramConfigurations');
    send.subscribe((data => {
      this.ResponseofTheTemplate = data;
      this.alltableDatas = this.ResponseofTheTemplate._embedded.diagramConfigurationDtoList;
      console.log(this.ResponseofTheTemplate);
    }));
    this.toggleElement();
  }
  toggleElement(){
    this.visible = !this.visible;
    this.hideElement = !this.hideElement;
  }

}

