import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "",
      allMemeImgs: []
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(({ data: { memes } }) => {
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onClickHandler(e) {
    e.preventDefault();
    const { allMemeImgs } = this.state;
    let randomImgUrl = Math.floor(
      Math.random() * Math.floor(allMemeImgs.length)
    );
    let imgUrl = allMemeImgs[randomImgUrl].url;
    this.setState({ randomImg: imgUrl });
  }

  render() {
    const { randomImg, topText, bottomText } = this.state;
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={topText}
            onChange={e => this.handleChange(e)}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={e => this.handleChange(e)}
          />

          <button onClick={e => this.onClickHandler(e)}>Gen</button>
        </form>
        <div className="meme">
          {randomImg !== "" && <img src={randomImg} alt="" />}
          <h2 className="top">{topText}</h2>
          <h2 className="bottom">{bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
