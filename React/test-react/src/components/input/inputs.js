import React,{Component} from 'react';
import './inputs.scss'; 

class Inputs extends Component{
  constructor(){
    super();
    this.state = {
        value:"green",
    };
    this.changeValues = this.changeValues.bind(this);
    this.handText = this.handText.bind(this);
  }
  // componentDidMount(){}  当组件渲染到dom后执行
  // componentWillUnmount(){}  

  changeText = (event) => {
    this.setState({
      value: event.target.value
    })
  }
  changeValue = () => {
    if(!this.state.value){
      return false;
    }
    alert('wowotou' + this.state.value);
  }
  changeValues(event){
    this.setState({
      value: event.target.value
    })
  }
  handText(){
    console.log(this.state.value);
  }
  render() {
    return(
      <div className="inputs">
        <form>
          <input type="text" onChange={this.changeText} required/>
        </form>
        <button onClick={this.changeValue}>submit</button>
        <p>{this.state.value}</p>
        <form>
          <select onChange={this.changeValues} value={this.state.value}>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
            <option value="gray">gray</option>
            <option value="green">green</option>
          </select>
        </form>
        <button onClick={this.handText}>submit</button>
      </div>
    )
  }
}


class ComponentInputs extends Component{
  constructor(props){
    super(props);
    this.testA = React.createRef();
  }
  changeValue = (e) => {
    this.props.onTemplateInput(e.target.value);
  }
  render(){
    const template = this.props.template; //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    return (
      <div>
        <input type="text" name="testA" value={template} onChange={this.changeValue} ref={this.testA}/>
      </div>
    )
  }
}

class ComponentValue extends Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
    const value = this.props.value;  //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    return (
      <div>
        {
          value >= 100 ? <p style={{fontSize: '24px'}}>The water would boil.</p> : <p style={{fontSize: '24px'}}>The water would not boil.</p>
        }
      </div>
    )
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvent(template,convent){
  const inputs = parseFloat(template);
  if(isNaN(inputs)){
    return '';
  }
  const num = convent(inputs);
  const rouned = Math.round(num * 1000) / 1000;
  return rouned.toString();
}

class Calculator extends Component{
  constructor(props){
    super(props);
    this.state = {
      template: '',
      scale: 'c'
    };
  }
  handleCelsiusChange = (template) => {
    this.setState({scale: 'c', template});
  }
  handleFahrenheitChange = (template) => {
    this.setState({scale: 'f', template});
  }
  jumps = () => {
    console.log(this.props)
  }
  render(){
    const scale = this.state.scale;  //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    const template = this.state.template; //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    const celsius = scale === 'f' ? tryConvent(template, toCelsius) : template; //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    const fahrenheit = scale === 'c' ? tryConvent(template, toFahrenheit) : template; //  不能再this获取  这样之后再构建组件的时候触发   改变不会触发
    return (
      <div>
        <p onClick={ () => { this.jumps() } }>aaa</p>        
        <Inputs />
        <ComponentInputs template={celsius} onTemplateInput={this.handleCelsiusChange}/>
        <ComponentInputs template={fahrenheit} onTemplateInput={this.handleFahrenheitChange}/>
        <ComponentValue value={parseFloat(celsius)} />
      </div>
    )
  }
}

export default Calculator;