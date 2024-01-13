// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-saved-matches',
//   templateUrl: './saved-matches.component.html',
//   styleUrls: ['./saved-matches.component.css']
// })
// export class SavedMatchesComponent implements OnInit {
//   matches: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadMatches();
//   }

//   loadMatches(): void {
//     this.http.get<any[]>('http://localhost:3000/api/matches').subscribe(
//       (data) => {
//         this.matches = data;
//         console.log(data)
//       },
//       (error) => {
//         console.error('Error loading matches:', error);
//       }
//     );
//   }
//   toggleStar(match: any): void {
//     match.starred = !match.starred;

//     const newMatch = {
//       id: match.id,
//       name: match.name,
//       url: match.url,
//       starred: match.starred
//     };

//     this.http.post<any>('http://localhost:3000/api/matches', newMatch).subscribe(
//       (data) => {
//         console.log('New match added:', data);
//       },
//       (error) => {
//         console.error('Error adding new match:', error);
//       }
//     );
//   }


  
// }


// saved-matches.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-saved-matches',
  templateUrl: './saved-matches.component.html',
  styleUrls: ['./saved-matches.component.css']
})
export class SavedMatchesComponent implements OnInit {
  matches: MatTableDataSource<any>; 
  displayedColumns: string[] = ['starred', 'id', 'name'];

  constructor(private http: HttpClient) {
    this.matches = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.http.get<any[]>('http://localhost:3000/api/matches').subscribe(
      (data) => {
        this.matches.data = data;
        console.log(data);
      },
      (error) => {
        console.error('Error loading matches:', error);
      }
    );
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
        console.log('New match added:', data);
      },
      (error) => {
        console.error('Error adding new match:', error);
      }
    );
  }
}
