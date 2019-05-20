/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';


export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentWillMount() {
    localStorage.getItem('repositories') && this.setState({
      repositories: JSON.parse(localStorage.getItem('repositories')),
      loading: false,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('repositories', JSON.stringify(nextState.repositories));
    localStorage.setItem('repositoriesDate', Date.now());
  }


  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositoryInput } = this.state;
    const { repositories } = this.state;
    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  updateRespository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  }

  deleteRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
  };

  render() {
    const { repositories } = this.state;
    const { repositoryInput } = this.state;
    const { repositoryError } = this.state;
    const { loading } = this.state;
    return (
      <Container>

        <img src={logo} alt="Github Compare" />
        <Form whithError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            type="text"
            placeholder="usuário/repositório"

          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList 
        deleteRepository={this.deleteRepository} 
        repositories={repositories}
        updateRepository={this.updateRespository} />
      </Container>
    );
  }
}
