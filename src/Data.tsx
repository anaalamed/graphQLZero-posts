import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;


const ExchangeRates: React.FC = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.posts.data.map(post => (
        <div key={post.id}>
            <p>{post.title}</p>
            <p>{post.user.name}</p>
            <p>-------------------------------------------</p>
        </div>
    ));

}

export default ExchangeRates;

