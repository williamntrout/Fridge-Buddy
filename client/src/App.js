import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./styles/mainStyles.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import GroceryList from "./components/List";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const APP_ID = "4fd7f07d";
const APP_KEY = "6366fb53422c0710914acf9000b5c1d6";

class App extends Component {
  state = { recipes: [] };

  // convert to arrow function so you won't have to 'bind' it
  getRecipe = async (e) => {
    e.preventDefault();
    // and since e is an object means  we can access the 'properties' of the 'object'.
    const recipeName = e.target.elements.recipeName.value;
    const API_CALL = await fetch(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    const data = await API_CALL.json();
    // Set the state 'recipes' to the api call
    this.setState({ recipes: data.hits });
  };

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    //recipes is both the name and the key so only will be written once
    this.setState({ recipes });
  };
  //component did update will place the 'recipes' into 'local storage.

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  };

  render() {
    return (
      <>
        <NavBar />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Form getRecipe={this.getRecipe} />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2}>
          {/* container Grid */}

          <Grid item xs={12}>
            {/* Row #1 up to 12 spaces */}
          </Grid>
          {/* End Of Row #1 */}

          <Grid item xs={3}>
            <GroceryList />
          </Grid>
          <Grid item xs={6}>
            <Recipes recipes={this.state.recipes} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default App;