import React, { Component } from 'react';
import classes from './QuizList.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

export class QuizList extends Component {
  renderQuizes = () => {
    const { quizes } = this.props;
    return quizes.map(item => {
      return (
        <li key={item.id}>
          <NavLink to={`/quiz/${item.id}`}>{item.name}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    const { loading, quizes } = this.props;
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {loading && quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizList);
