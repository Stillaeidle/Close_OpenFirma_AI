import { ChangeDetectorRef, Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { SousSerreService } from "../sous-serre.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-fertigation',
  templateUrl: './fertigation.component.html',
  styleUrls: ['./fertigation.component.scss']
})
export class FertigationComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  currentDateTime: string;

  breadCrumbItems: Array<{}>;
  greenhouses: any;
  selectedGreenhouse: any = null;
  greenhouseDetails: any = null;
  predictions: any;
  inputData: any; // Données d'entrée pour le modèle
  modalRef?: BsModalRef;
  pastPredictions: any[] = []; // Ajouté pour stocker les prédictions passées

  // Variables pour les champs modifiables
  irrigationSystem: string;
  varietyType: string;
  growthStage: string;

  // Variables pour la nouvelle serre
  newGreenhouseName: string = '';
  newGreenhouseLength: number;
  newGreenhouseWidth: number;
  newGreenhouseHeight: number;

  // Variables pour la configuration de l'irrigation
  selectedIrrigationProcess: string;
  manualIrrigationSwitch: boolean = false;

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Quantité d\'eau (mL/M2)',
        yAxisID: 'y-axis-1',
        borderColor: 'rgba(54, 162, 235, 1)', // Couleur de la ligne
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur de fond sous la ligne
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Couleur des points
        pointBorderColor: '#fff', // Couleur des bords des points
        pointHoverBackgroundColor: '#fff', // Couleur des points au survol
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        data: [],
        label: 'Nutriment N (ppm)',
        yAxisID: 'y-axis-2',
        borderColor: 'rgb(3,64,53)',
        backgroundColor: 'rgb(3,64,53)',
        pointBackgroundColor: 'rgb(35,119,64)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(3,64,53)'
      },
      {
        data: [],
        label: 'Nutriment P (ppm)',
        yAxisID: 'y-axis-2',
        borderColor: 'rgb(251,143,77)',
        backgroundColor: 'rgb(251,143,77)',
        pointBackgroundColor: 'rgb(251,143,77)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(251,143,77)'
      },
      {
        data: [],
        label: 'Nutriment K (ppm)',
        yAxisID: 'y-axis-2',
        borderColor: 'rgb(170,189,0)',
        backgroundColor: 'rgb(170,189,0)',
        pointBackgroundColor: 'rgb(170,189,0)',
        pointBorderColor: '#a4be34',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(170,189,0)'
      }
    ]
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      'y-axis-1': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Quantité d\'eau (mL/M2)'
        },
        grid: {
          display: true
        }
      },
      'y-axis-2': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Nutriments (ppm)'
        },
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(
    private sousSerreService: SousSerreService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone

  ) {}

  ngOnInit() {
    this.getGrenhouses();
    this.updateDateTime();
  }

  updateDateTime() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
          this.cdr.detectChanges();
        });
      }, 1000);
    });
  }

  getGrenhouses(){
    this.sousSerreService.getGreenhouses().subscribe(
      (response) => {
        this.greenhouses = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des serres:', error);
        this.toastr.error('Erreur lors de la récupération des serres');
      }
    );
  }

  onGreenhouseChange(greenhouseId: string) {
    if (greenhouseId === 'Choisir une serre') {
      this.selectedGreenhouse = null;
      this.greenhouseDetails = null;
      return;
    }

    this.spinner.show(); // Show spinner


    const id = parseInt(greenhouseId, 10);


    this.sousSerreService.getGreenhousesById(id).subscribe(
      (response) => {
        this.selectedGreenhouse = response[0];
        console.log(response)
        this.selectedIrrigationProcess = this.selectedGreenhouse.type_d_irrigation
        this.manualIrrigationSwitch = this.selectedGreenhouse.on_pump

        console.log(this.selectedGreenhouse)

        this.sousSerreService.getGreenhouseDetails(id).subscribe(
          (response) => {
            this.greenhouseDetails = response[0];
            this.inputData = this.generateInputData();
            this.sousSerreService.getPredictions(this.inputData, id).subscribe(
              (response) => {
                this.predictions = response;
                this.updateChartWithPredictions(this.predictions);
                this.spinner.hide();

              },
              (error) => {
                console.error('Erreur lors de la récupération des prédictions:', error);
                this.toastr.error('Erreur lors de la récupération des prédictions');
                this.spinner.hide();

              }
            );
            // Initialise les variables modifiables
            this.irrigationSystem = this.greenhouseDetails.systeme_d_irrigation;
            this.varietyType = this.greenhouseDetails.type_de_variete;
            this.growthStage = this.greenhouseDetails.stage_de_croissance;
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de la serre:', error);
            this.spinner.hide();
            this.toastr.error('Erreur lors de la récupération des détails de la serre');
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des serres:', error);
        this.toastr.error('Erreur lors de la récupération des serres');
      }
    );

  }

  generateInputData() {
    const details = this.greenhouseDetails;
    return [
      Array.from({ length: 30 }, () => [
        details.temperature_de_l_air ,    // Température de l'air (°C)
        details.humidite_relative ,    // Humidité relative (%)
        details.radiation_solaire ,  // Radiation solaire (Lux)
        details.co2_atmospherique ,   // CO2 atmosphérique (ppm)
        details.temperature_du_sol ,    // Température du sol (°C)
        details.humidite_du_sol ,    // Humidité du sol (%)
        details.conductivite_electrique,   // Conductivité électrique (dS/m)
        details.ph_du_sol ,  // pH du sol
        details.concentration_en_n ,   // Concentration en N (g/kg)
        details.concentration_en_p ,   // Concentration en P (g/kg)
        details.saison === 'Hiver' ? 1 : 0,     // Saison Hiver
        details.saison === 'Printemps' ? 1 : 0,     // Saison Printemps
        details.saison === 'Été' ? 1 : 0,     // Saison été
        details.stage_de_croissance === 'Floraison' ? 1 : 0,     // Stage_de_croissance_floraison
        details.stage_de_croissance === 'Fructification' ? 1 : 0,     // Stage_de_croissance_fructification
        details.stage_de_croissance === 'Germination' ? 1 : 0,     // Stage_de_croissance_germination
        details.previsions_meteologiques === 'Nuageux' ? 1 : 0,     // Prévisions_météorologiques_nuageux
        details.previsions_meteologiques === 'Pluvieux' ? 1 : 0,     // Prévisions_météorologiques_pluvieux
      ])
    ];
  }

  updateChartWithPredictions(predictions: any) {
    const dates = predictions.dates;
    const data = predictions.predictions[0];

    this.lineChartData.labels = dates;
    this.lineChartData.datasets[0].data = data.map((d: any) => d[0]); // Quantité d'eau
    this.lineChartData.datasets[1].data = data.map((d: any) => d[1]); // Nutriment N
    this.lineChartData.datasets[2].data = data.map((d: any) => d[2]); // Nutriment P
    this.lineChartData.datasets[3].data = data.map((d: any) => d[3]); // Nutriment K

    if (this.chart) {
      this.chart.update();
    } else {
      console.log("Chart is not defined");
    }

    this.cdr.detectChanges();
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  saveChanges() {
    const updatedHeader = {
      id: this.selectedGreenhouse.id,
      systeme_d_irrigation: this.irrigationSystem
    };

    const updatedDetails = {
      id: this.selectedGreenhouse.id,
      type_de_variete: this.varietyType,
      stage_de_croissance: this.growthStage,
      systeme_d_irrigation:  this.irrigationSystem
    };

    this.sousSerreService.updateGreenhouseDetails(updatedDetails).subscribe(
          (response) => {
            console.log('Greenhouse details updated:', response);
            this.modalRef?.hide();
            this.onGreenhouseChange(this.selectedGreenhouse.id.toString());
            this.toastr.success('Les détails de la serre ont été mis à jour');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour des détails de la serre:', error);
            this.toastr.error('Erreur lors de la mise à jour des détails de la serre');
          });
  }

  openAddGreenhouseModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  addGreenhouse() {
    const newGreenhouse = {
      name: this.newGreenhouseName,
      length: this.newGreenhouseLength,
      width: this.newGreenhouseWidth,
      height: this.newGreenhouseHeight
    };

    this.sousSerreService.addGreenhouse(newGreenhouse).subscribe(
      (response) => {
        console.log('New greenhouse added successfully:', response);
        this.modalRef?.hide();
        this.toastr.success('Nouvelle serre ajoutée avec succès');
        this.ngOnInit();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la serre:', error);
        this.toastr.error('Erreur lors de l\'ajout de la serre');
      }
    );
  }

  manualIrrigationSwitchMethode() {
    this.manualIrrigationSwitch = !this.manualIrrigationSwitch;
    this.sousSerreService.updateIrrigationSwitch(this.selectedGreenhouse.id, this.manualIrrigationSwitch)
      .subscribe(
        (response) => {
          this.onGreenhouseChange(this.selectedGreenhouse.id)
          console.log('Irrigation switch updated successfully', response);
          this.toastr.success('Le commutateur d\'irrigation a été mis à jour avec succès');
        },
        (error) => {
          console.error('Error updating irrigation switch', error);
          this.toastr.error('Erreur lors de la mise à jour du commutateur d\'irrigation');
        }
      );
  }

  updateIrrigationProcess() {
    this.sousSerreService.updateIrrigationProcess(this.selectedGreenhouse.id, this.selectedIrrigationProcess)
      .subscribe(
        (response) => {
          this.selectedGreenhouse.manualIrrigationSwitch = false
          console.log('Irrigation process updated successfully', response);
          this.toastr.success('Le processus d\'irrigation a été mis à jour avec succès');
        },
        (error) => {
          console.error('Error updating irrigation process', error);
          this.toastr.error('Erreur lors de la mise à jour du processus d\'irrigation');
        }
      );
  }

}

