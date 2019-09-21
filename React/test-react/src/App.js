import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.scss';
import Inputs from './components/input/inputs';
import TodoList from './components/todoList/todoList';
import Routers from './components/routers/routers';

class App extends Component{
  constructor(props){
    super(props);
    this.name= props.name;
    this.times = 60;
    this.timer = null;
    this.can_click = true;
    this.arrList = [
      {
        id:1,
        title:'lala'
      },{
        id:2,
        title:'haha'
      },{
        id:3,
        title:'hehe'
      },{
        id:4,
        title:'gaga'
      },{
        id:5,
        title:'xixi'
      },{
        id:6,
        title:'lolo'
      },
    ];
  }
  state = {
    time: 60,
  }
  tick(){
    this.times--;
    this.setState({
      time: this.times
    })
  }
  changeName = () => {
    if(this.can_click){
      this.can_click = false;
      this.timer = setInterval(()=>{
        this.tick();
        if(this.times === 0){
          clearInterval(this.timer);
          this.can_click = true;
          this.times = 60;
          this.setState({
            time: this.times
          })
        }
      },1000);
    }
  }
  static getDerivedStateFromProps(props,state){ 
    console.log('渲染前/更新前', props, state);
    return null;
  }
  componentDidMount(){ 
    console.log('首次渲染后');
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('更新渲染后', nextProps, nextState);
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('更新之前', prevProps, prevState);
    return 'lala';
  }
  componentDidUpdate(prevProps, prevState){
    console.log('更新之后', prevProps, prevState);
  }
  componentWillUnmount(){
    console.log('dele');
  }
  render(){
    return (
      <div className="heihei">
        <span className="yikuai" onClick={this.changeName}>{this.state.time === 60 ? '获取' : this.state.time}</span>
        {/* dangerouslySetInnerHTML={{__html: this.state.content}} */}
        {/* <ul>
          {
            this.arrList.map(item => {
              return <li key={item.id}>{item.title}</li>
            })
          }
        </ul>
          <div onClick={this.changeName(this.times)}></div>  这样写的话 会直接执行一次 然后点击会再次执行
          <div onClick={() => { this.changeName(this.times)} }></div>  用匿名的箭头函数包一层就刚好绑定事件而且可以传参         */}
        <div>
          <Router>
            <div>
              <NavLink to="/" exact>首页</NavLink>
              <NavLink to="/todoList">todoList</NavLink>
              <NavLink to="/routers/5432543">aaaa</NavLink>
            </div>
            <div>
              <Switch>
                <Route path="/" component={Inputs} exact></Route>
                <Route path="/todoList" component={TodoList}></Route>
                <Route path="/routers/:type" component={Routers} age={18}></Route>
                <Redirect to="/"></Redirect>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
