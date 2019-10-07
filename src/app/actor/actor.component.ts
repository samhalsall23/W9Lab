import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  //movie
  moviesDB: any[] = [];
  title: string = "";
  mYear: number = 0;
  movieId: string = "";

  aYear: number = 0;


  constructor(private dbService: DatabaseService) {}
  
  //-----------ACTORS--------------------
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  
  //--------------MOVIES--------------------
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  } 
  // TASK 1: Create a new Actor, POST request
   onSaveMovie() {
    let obj = { title: this.title, year: this.mYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  // TASK 2: Delete Movie
   onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  // TASK 3: Delete Movie Before aYear
  onDeleteMovieBefore() {
    // get a Year
    let delYear= this.aYear;
    this.dbService.deleteMovieBefore(delYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  // TASK 4: Add Actor to Movie
  onAddActor() {
    const obj = {title: this.title, name: this.fullName};
    this.dbService.addActor(obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }

 

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";

    this.title = "";
    this.mYear = 0;
    this.movieId = "";
  }
 

}