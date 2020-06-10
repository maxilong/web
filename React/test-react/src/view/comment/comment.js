import React, { Component } from 'react';
import './comment.scss';
class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      heatArr:[
        {
          title: '财金小记者',
          time:'11:30',
          content: '油价是钦定的，要遵循基本法。伊朗来搅局，油价破20指日可待。',
          good: 100,
          low: 3,
          isGood: true,
          isLow: true,
          id: 10,
        },
        {
          title: '财金小编',
          time:'11:30',
          content: '油价是钦定的，要遵循基本法。伊朗来搅局，油价破20指日可待。',
          good: 100,
          low: 3,
          isGood: false,
          isLow: false,
          id: 11,
        },
      ],
      newArr: [
        {
          title: '某个用户',
          time: '11:30',
          good: 1,
          low: 0,
          isGood: true,
          isLow: false,
          content: '那可不一定这不好说',
          id : 10,
        },
        {
          title: '某个用户',
          time: '11:30',
          good: 1,
          low: 0,
          isGood: true,
          isLow: false,
          content: '那可不一定这不好说',
          id : 11,
        },
        {
          title: '某个用户',
          time: '11:30',
          good: 1,
          low: 0,
          isGood: true,
          isLow: false,
          content: '那可不一定这不好说',
          id : 10,
        }
      ]
    };
  }
  num = 123;
  img = require('../../assest/img/ic_back.png');
  onChangeIsGood = (index) => {

  };
  onChangeIsLow = (index) => {

  }
  render () {
    const heatArray = this.state.heatArr;
    const newArray = this.state.newArr;
    return (
      <div>
        <div className="header">
          <img src={this.img} alt=""></img>
          <span>评论({this.num})</span>
        </div>
        <div className="contents">
          <div className="heatComment">
            <div className="heatTitle">热门评论</div>
            {
              heatArray.map((item,index)=>{
                return (
                  <li key={item.id} className="list">
                    <div className="image">
                      <img src="../../assest/img/20190905094819.jpg" alt=""></img>
                    </div>
                    <div className="right">
                      <div className="title">
                        <p className="title_text">{item.title}</p>
                        <div className="title_click">
                          <div className="click_left" onClick={() => { this.onChangeIsGood(index) }}>
                            <img src={this.isGood ? '../../assest/img/Android_03.png' : '../../assest/img/Android_10.png' } alt=""></img>
                            <span className={this.isGood ? 'orange' : 'gray' }>{item.good}</span>
                          </div>
                          <div className="click_right" onClick={() => { this.onChangeIsLow(index) }}>
                            <img src={this.isLow ? '../../assest/img/Android_06.png' : '../../assest/img/Android_11.png' } alt=""></img>
                            <span className={this.isLow ? 'orange' : 'gray'}>{item.low}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text">{item.content}</div>
                    </div>
                  </li>
                )
              })
            }
          </div>
          <div className="newComment">
            <div className="newTitle">最新评论</div>
            {
              newArray.map((item,index)=>{
                return (
                  <li key={item.id} className="list">
                    <div className="">
                      <img src="../../assest/img/20190905094819.jpg" alt=""></img>
                    </div>
                    <div className="right">
                      <div className="title">
                        <p className="title_text">{item.title}</p>
                        <div className="title_click">
                          <div className="click_left" onClick={() => { this.onChangeIsGood(index) }}>
                            <img src={this.isGood ? '../../assest/img/Android_03.png' : '../../assest/img/Android_10.png' } alt=""></img>
                            <span className={this.isGood ? 'orange' : 'gray' }>{item.good}</span>
                          </div>
                          <div className="click_right" onClick={() => { this.onChangeIsLow(index) }}>
                            <img src={this.isLow ? '../../assest/img/Android_06.png' : '../../assest/img/Android_11.png' } alt=""></img>
                            <span className={this.isLow ? 'orange' : 'gray'}>{item.low}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text">{item.content}</div>
                    </div>
                  </li>
                )
              })
            }
          </div>
        </div>
        <div className="footer">
          <div className="inputs">
            <img src="../../assest/img/Android_22.png" alt=""></img>
            <input placeholder="我也来评论.."></input>
          </div>
          <div className="images">
            <img src="../../assest/img/pl.png" alt=""></img>
            <img src="../../assest/img/Android_17.png" alt=""></img>
            <img src="../../assest/img/qq.png" alt=""></img>
            <img src="../../assest/img/wechat.png" alt=""></img>
          </div>
        </div>
      </div>
    )
  }

}

export default Comment;