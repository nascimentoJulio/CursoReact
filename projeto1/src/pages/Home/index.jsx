import { Component } from "react";
import { loadPosts } from "../../api/posts";
import { Button } from "../../components/Button";
import { PostCard } from "../../components/PostCard";
import "./style.css";

// componente de classe statefull(com estado)
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 100,
    counter: 0,
  };
  // timeoutUpdate = null;

  //lifecycle method mount: quando o componente é montado
  async componentDidMount() {
    // this.handleTimeout();
    const { page, postsPerPage } = this.state;
    const posts = await loadPosts();
    this.setState({
      posts: posts.slice(page, postsPerPage),
      allPosts: posts,
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, posts, allPosts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    this.setState({ posts: posts, page: nextPage });
  };

  handlerChangeSearch = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };

  //lifecycle method update: quando o componente é atualizado
  componentDidUpdate() {
    // this.handleTimeout();
  }

  //lifecycle method unmount: quando o componente é desmontado
  componentWillUnmount() {
    // clearInterval(this.timeoutUpdate)
  }

  // handleTimeout = () => {
  //   const { counter } = this.state;

  //   this.timeoutUpdate = setTimeout(() => {
  //     this.setState({ counter: counter + 1 });
  //   }, 1000);
  // };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;
    return (
      <section className="container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}
        <input
          type="search"
          onChange={this.handlerChangeSearch}
          value={searchValue}
        />
        {!!filteredPosts.length > 0 && (
          <div className="posts">
            {filteredPosts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        )}
        {
          filteredPosts.length === 0 && (
            <h1>Não existe post.</h1>
          )
        }
        {!searchValue && (
          <Button onClick={this.loadMorePosts} disabled={noMorePosts}>
            Load more posts
          </Button>
        )}
      </section>
    );
  }
}

// Componente de função stateless(sem estado)
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
