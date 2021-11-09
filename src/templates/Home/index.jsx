import { Component } from "react";
import "./styles.css";
import { Posts } from "../../components/Posts";
import { loadPosts } from '../../Utils/load-posts';
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0.,
    postsPerPage: 10
  };

  async componentDidMount() {
    await this.loadPosts();
  }


  loadPosts = async () => { //usamos a palavra ASYNC quando se ira retornar uma promises
    const { page, postsPerPage } = this.state;
    
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage) });
    this.setState({ allPosts: postsAndPhotos
    });
  }
  
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }


  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts}/>

        <div class="button-container">
          <Button 
            text="Load More posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>

      </section>
      
    );
  }
}