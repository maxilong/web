import React,{Component} from 'react';
import './todoList.scss';

class Input extends Component{
  constructor(props){
    super(props);
    this.test = React.createRef();
  }
  changeList = (e) => {
    const name = e.target.name;
    const nameValue = name + ':' + this.test.current.value;
    if(this.test.current.value){
      this.props.onChangeList(nameValue);
      this.test.current.value = '';
    }
  }
  render(){
    return (
      <div className="inp">
        <input type="text" ref={this.test}/>
        <button name={`test${this.props.name}`} onClick={this.changeList}>添加任务{this.props.name}</button>
      </div>
    )
  }
}
class Lilist extends Component{
  clearList = (index) => {
    this.props.onClearList(index);
  }
  render(){
    return (
      <>
        {
          this.props.list.map((item,index) => {
            return ( <li key={item+index}>
                <span>{item}</span>
                <button onClick={() => { this.clearList(index) }}>X</button>
              </li> );
          })
        }
      </>
    )
  }
}
class TodoList extends Component{
  constructor(){
    super();
    this.state = {
      list:[]
    };
  }
  changeList = (value) => {
    const list = this.state.list;
    list.push(value);
    this.setState({
      list
    })
  }
  clearList = (index) => {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list
    })
  }
  jumpf = ()=>{
    console.log(this.props);
  }
  render(){
    const list = this.state.list;
    return (
      <div>
        <div>
          <p onClick={() => {this.jumpf()}}>a</p>
          <Input name="A" onChangeList={this.changeList}/>
          <Input name="B" onChangeList={this.changeList}/>
        </div>
        <ul>
          <Lilist list={list} onClearList={ this.clearList }/>
        </ul>
      </div>
    )
  }
}
export default TodoList;