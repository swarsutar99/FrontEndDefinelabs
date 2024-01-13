


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.css']
})
export class AllMatchesComponent implements OnInit {
  displayedColumns: string[] = ['starred', 'id', 'name', 'location'];
  matches: MatTableDataSource<any>;

  constructor(private http: HttpClient) {
    this.matches = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    const apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&oauth_token=NPKYZ3WZ1VYMNAZ2FLX1WLECAWSMUVOQZOIDBN53F3LVZBPQ&v=20180616';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.matches.data = data.response.venues;
      console.log(data)
      this.loadMatches();
    });
  }

  toggleStar(match: any): void {
    match.starred = !match.starred;

    const newMatch = {
      id: match.id,
      name: match.name,
      url: match.url,
      starred: match.starred
    };

    this.http.post<any>('http://localhost:3000/api/matches', newMatch).subscribe(
      (data) => {
        alert('New match added');
        
        this.loadMatches();
      },
      (error) => {
        alert('Error adding new match');
      }
    );
  }

  matchesDB: any[] = [];

  loadMatches(): void {
    this.http.get<any[]>('http://localhost:3000/api/matches').subscribe(
      (data) => {
        this.matchesDB = data;
        this.updateStars();
        console.log(data);
      },
      (error) => {
        console.error('Error loading matches:', error);
      }
    );
  }

  updateStars(): void {
    this.matches.data.forEach((match) => {
      const matchingDBMatch = this.matchesDB.find((dbMatch) => dbMatch.id === match.id);
      if (matchingDBMatch) {
        match.starred = matchingDBMatch.starred;
      }
    });
  }
}
