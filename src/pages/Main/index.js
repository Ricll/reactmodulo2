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
    storage: [],
  };

  componentWillMount() {
    const { repositories } = this.state;
    const { storage } = this.state;
    this.setState({ storage: localStorage.setItem('storage', repositories) });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { repositoryInput } = this.state;
    const { repositories } = this.state;

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
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
