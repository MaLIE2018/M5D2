import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useQueryParam, NumberParam, StringParam} from 'use-query-params';

const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;
  
function App(props) {
  const [query, setQuery] = useState("")
  const [updated, seUpdated] = useState(false)
  const [title, setTitle] = useQueryParam('title', StringParam);

  const handleChange = (query) => {
    setQuery(query)
  }

  return (
    <>
        <NavBar onChangeHandle={handleChange} query={query}/>
        <Route path="/blogPosts" component={Home}/>
        <Route path="/" exact component={Home} />
        <Route path="/blog/:id" exact component={Blog} />
        <Route path="/new" exact component={NewBlogPost} />
        <Footer />
    </>
  );
}

export default App;
