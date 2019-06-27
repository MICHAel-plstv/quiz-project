import React, { Component } from 'react';
import classes from './QuizList.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };

  renderQuizes = () => {
    const { quizes } = this.state;
    return quizes.map(item => {
      return (
        <li key={item.id}>
          <NavLink to={`/quiz/${item.id}`}>{item.name}</NavLink>
        </li>
      );
    });
  };

  async componentDidMount() {
    try {
      const quizes = [];
      const response = await axios.get(
        `https://quiz-test-b404f.firebaseio.com/quizes.json`
      );
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        });
      });

      this.setState({
        quizes,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
