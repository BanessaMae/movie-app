import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Layout, Empty, Alert, Space } from 'antd';

import Header from '../components/header';
import Search from '../components/search';
import ItemList from '../components/item-list';
import PaginationComponent from '../components/pagination';
import { GenresProvider } from '../components/create-context';

const { Content } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'search',
      moviesData: [],
      searchMovies: '',
      genres: [],
      loading: false,
      error: false,
      totalResults: null,
      currentPage: 1,
    };
    this.url = 'https://api.themoviedb.org/3';
    this.searchMovie = '/search/movie';
    this.searchGenres = '/genre/movie/list';
    this.apiKey = '3ba8ed94a5e6700ab22695e77491f859';
  }

  fetchMoviesData = () => {
    fetch(`${this.url}${this.searchMovie}?api_key=${this.apiKey}&query=${this.state.searchMovies}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(...data.results);
        this.setState({
          moviesData: [...data.results],
          totalResults: [data.total_results],
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, error: true });
      });
  };

  componentDidMount() {
    fetch(`${this.url}${this.searchGenres}?api_key=${this.apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ genres: data.genres });
      });
  }

  nextPage = (pageNumber) => {
    fetch(`${this.url}${this.searchMovie}?api_key=${this.apiKey}&query=${this.state.searchMovies}&page=${pageNumber}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data);
        this.setState({ moviesData: [...data.results], currentPage: pageNumber });
      });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchMovies.trim() !== '') {
      this.setState({ loading: true, totalResults: null });

      setTimeout(this.fetchMoviesData, 500);
    }
  };

  onHandleSearch = (e) => {
    this.setState({ searchMovies: e.target.value, loading: true });
    setTimeout(this.fetchMoviesData, 500);
  };

  setActive = (e) => {
    this.setState(() => {
      return { active: e };
    });
  };

  render() {
    const { searchMovies, moviesData, loading, error, totalResults, genres, active } = this.state;
    const numberPages = Math.floor(totalResults / 20);
    const onHandleChangeDebounced = debounce(this.onHandleSearch, 500);
    const searchEmpty = searchMovies.trim() !== '' && moviesData.length === 0 && !loading;
    const noEmpty = <ItemList moviesData={moviesData} genre={genres} loading={loading} />;
    const empty = <Empty description={'Nothing found'} />;
    const pagination = (
      <PaginationComponent pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} />
    );
    const errorVpn = (
      <Space
        direction="vertical"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
        }}
      >
        <Alert type="error" description="The connection is blocked, please use VPN" showIcon />
      </Space>
    );

    return (
      <>
        <GenresProvider value={this.state.genres}>
          <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
              <Header setActive={this.setActive} active={active} />

              {active === 'search' ? (
                <Search onHandleSubmit={this.onHandleSubmit} onHandleChange={onHandleChangeDebounced} />
              ) : null}

              <div className="site-layout-content" style={{ background: '#ffffff', padding: 12 }}>
                {!error ? (
                  <>
                    {searchEmpty ? empty : noEmpty}
                    {totalResults > 20 ? pagination : ''}
                  </>
                ) : (
                  errorVpn
                )}
              </div>
            </Content>
          </Layout>
        </GenresProvider>
      </>
    );
  }
}
