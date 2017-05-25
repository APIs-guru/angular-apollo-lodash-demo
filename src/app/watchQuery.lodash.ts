import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Rx';
import { graphqlLodash } from 'graphql-lodash';

export function watchQueryLodash<T>(apollo: Apollo, opts: any): ApolloQueryObservable<T> {
  const { query, transform } = graphqlLodash(opts.query);
  const res = apollo.watchQuery<T>({...opts, query});

  const transformed = Observable
    .from(res)
    .map(props => {
      return {...props, rawData: <any>props.data, data: <T>transform(props.data)};
    });

  return <ApolloQueryObservable<T>>transformed;
}
