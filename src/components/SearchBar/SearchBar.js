import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      term:''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search(event){
  this.props.onSearch(this.state.term);
  event.preventDefault();
  }

  handleTermChange(event){
    this.setState({
      term: event.target.value});
  }


handleKeyPress(){
const input = document.getElementById("placeholder");
  input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("myBtn").click();
}});}


render(){
  return(
    <div className="SearchBar">
    <input id="placeholder" placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
    <button id="myBtn" className="SearchButton" onClick={this.search}>SEARCH</button>
    </div>
  )
}
}

export default SearchBar;
