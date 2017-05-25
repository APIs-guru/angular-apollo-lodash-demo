import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { watchQueryLodash } from './watchQuery.lodash';

// We use the gql tag to parse our query string into a query document
const peopleToFilmsQuery = gql`
  query {
    peopleToFilms: allPeople @_(get: "people") {
      people {
        name
        films: filmConnection @_(get: "films") {
          films @_(map: "title") {
            title
          }
        }
      }
    }
  }
`;

interface Person {
  name: string;
  films: string[];
}

interface QueryResponse {
  peopleToFilms: Person[];
  loading: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean;
  people: Person[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const sub = watchQueryLodash<QueryResponse>(this.apollo, {
      query: peopleToFilmsQuery
    })
    sub.subscribe(({data}) => {
      this.loading = data.loading;
      this.people = data.peopleToFilms;
    });
  }
}
