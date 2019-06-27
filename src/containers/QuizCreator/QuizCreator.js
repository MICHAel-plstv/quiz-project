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
import axios from 'axios';

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

export default class QuizCreator extends Component {
  state = {
    quiz: [],
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
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
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
    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswer: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = async event => {
    event.preventDefault();
    try {
      await axios.post(
        `https://quiz-test-b404f.firebaseio.com/quizes.json`,
        this.state.quiz
      );

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswer: 1,
        formControls: createFormControls()
      });
    } catch (e) {
      console.log(e);
    }
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
    const { rightAnswer, isFormValid, quiz } = this.state;

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
