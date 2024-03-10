import { Component, OnInit, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Venue } from 'src/app/models/venues.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  allMatches: Venue[] = [];
  allSavedMatches: Venue[] = [];
  displayedColumns: string[] = ['star', 'name', 'location', 'explanation', 'verified'];
  dataSource = new MatTableDataSource<Venue>(this.allMatches);

  @Input() allMatchesT!: boolean;

  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.initializeData();
  }

  async initializeData() {
    await this.fetchAllSavedVenues();
    this.fetchAllMatches();
  }

  // This method is used to fetch all the saved venues from local database (json server)
  async fetchAllSavedVenues() {
    try {
      const res: any = await this.httpService.getAllSavedMatches().toPromise();
      console.log(res, 'FirstSaved');
      this.allSavedMatches = res;
    } catch (error) {
      console.error('Error fetching saved venues', error);
    }
  }

  // This method is used to fetch all the venues from api
  async fetchAllMatches() {
    try {
      const res: any = await this.httpService.getAllMatches().toPromise();
      this.allMatches = res.response.venues;
      this.allMatches.map(x => (x.isSaved = this.allSavedMatches.find(y => y.id === x.id) ? 'star' : 'star_border'));
    } catch (error) {
      console.error('Error fetching matches', error);
    }
  }

  // This method is called to unSave the venue
  saveVenue(venue: Venue) {
    this.allMatches.map(x => {
      if (x.id === venue.id) x.isSaved = venue.isSaved;
    });
    this.httpService.postMatch(venue).subscribe((res: any) => {
      console.log(res, 'Added this to saved');
      this.fetchAllSavedVenues();
    },
    (error: any) => {
      console.log(error, 'An error occured while saving the match!');
    });
  }

  // This method is called to unSave the venue
  unSaveVenue(venue: Venue) {
    this.allMatches.map(x => {
      if (x.id === venue.id) x.isSaved = venue.isSaved;
    });
    this.httpService.deleteMatchById(venue.id).subscribe((res: any) => {
      console.log(res, 'deleted this match from saved matches!');
      this.fetchAllSavedVenues();
    },
    (error: any) => {
      console.log(error, 'An error occured while un-saving the match!');
    });
  }

  // This method is called when star is clicked to save or unSave the venue
  saveOrUnsaveVenue(venue: Venue) {
    const isAlreadySaved = this.allSavedMatches.find(x => x.id === venue.id) ? true : false;
    console.log(isAlreadySaved, 'isAlreadySaved');
    isAlreadySaved ? venue.isSaved = 'star_border' : venue.isSaved = 'star';
    isAlreadySaved ? this.unSaveVenue(venue) : this.saveVenue(venue);
  }

}
