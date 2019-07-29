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
  }

  search(event){
  this.props.onSearch(this.state.term);
  event.preventDefault();
  }

  handleTermChange(event){
    this.setState({
      term: event.target.value});
  }
/*ALTERNATE METHOD OF HANDLING ENTER KEYPRESS
this.handleKeyPress = this.handleKeyPress.bind(this);
handleKeyPress(){
const input = document.getElementById("placeholder");
  input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("myBtn").click();
}});
<input id="placeholder" placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
<button id="myBtn" className="SearchButton" onClick={this.search} >SEARCH</button>
*/
render(){
  return(
    <div className="SearchBar">
    <form onSubmit={this.search}>
    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
    </form>
    <button type="submit" className="SearchButton" onClick={this.search}>SEARCH</button>
    </div>
  )
}
}

export default SearchBar;
