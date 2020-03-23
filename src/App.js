import React,{ Component } from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import axios from 'axios';


class App extends Component{
  state={
    todos:[
      
    ]
  }

// componentDidMount(){
//   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=30')
//   .then(res => this.setState({todos: res.data}))
// }


//toggle complete
  markComplete = (id) =>{
        this.setState({todos : this.state.todos.map(todo =>{
          if(todo.id === id){
            todo.completed=!todo.completed
          }
          return todo;
        })})
  }
  
delTodo = (id) =>{
  this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]});
    }

  //Add todo
addTodo = (title) =>{
  const newTodo ={
    id : uuidv4(),
    title,
    completed: false
  }
  this.setState({todos : [...this.state.todos, newTodo]});
}
    render() {
      
        return (
          <Router>
            <div className="App">
              <div className="container">
                <Header />
                <Route exact path="/" render={props => (
                  <React.Fragment>
                    <Todos todos={this.state.todos} 
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                    />
                    <AddTodo addTodo={this.addTodo} />
                  </React.Fragment>
                )} />
                <Route path="/about" component={About} />
              </div>            
            </div>
          </Router>
        );
    }
  }




export default App;