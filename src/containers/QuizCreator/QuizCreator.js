import React, { Component } from 'react';
import classes from './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {
  createControl,
  validate,
  validateForm
} from '../../form/formFramework';
import { connect } from 'react-redux';

import {
  createQuizQuestion,
  finishCreateQuiz
} from '../../store/actions/createQuiz';

function createOptionControl(number) {
  return createControl(
    {
      label: `Вопрос ${number}`,
      errorMessage: 'Вопрос не может быть пустым',
      id: number
    },
    { reqiured: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым'
      },
      { reqiured: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

export class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswer: 1,
    formControls: createFormControls()
  };

  handleSubmit = event => {
    event.preventDefault();
    return;
  };

  addQuestionHandler = event => {
    // event.preventDefault();
    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswer: this.state.rightAnswer,
      answers: [
        {
          text: option1.value,
          id: option1.id
        },
        {
          text: option2.value,
          id: option2.id
        },
        {
          text: option3.value,
          id: option3.id
        },
        {
          text: option4.value,
          id: option4.id
        }
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswer: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswer: 1,
      formControls: createFormControls()
    });
    this.props.finishCreateQuiz();
  };

  changeHandler = (value, controlName) => {
    const { formControls } = this.state;

    const formControl = { ...formControls };
    const control = { ...formControl[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControl[controlName] = control;

    this.setState({
      formControls: formControl,
      isFormValid: validateForm(formControl)
    });
  };

  rendercontrols() {
    return Object.keys(this.state.formControls).map((name, index) => {
      const control = this.state.formControls[name];
      return (
        <React.Fragment key={name + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, name)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  selectHandler = event => {
    this.setState({
      rightAnswer: +event.target.value
    });
  };

  render() {
    const { rightAnswer, isFormValid } = this.state;
    const { quiz } = this.props;

    const select = (
      <Select
        label={'Выберите правильный ответ'}
        value={rightAnswer}
        onChange={this.selectHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 }
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.handleSubmit}>
            {this.rendercontrols()}

            {select}
            <Button
              type={'primary'}
              onClick={this.addQuestionHandler}
              disabled={!isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type={'succes'}
              onClick={this.createQuizHandler}
              disabled={quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.create.quiz
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreator);
