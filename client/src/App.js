import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/navbar'
import {Route} from 'react-router-dom'
import Home from './components/home'
import Faculty from './components/AddFaculty'
import Subjects from './components/Subjects'
import Reserve from './components/Reserve'
import Edit from './components/Edit'
import Sem3 from './components/Odd/Sem3'
import Sem4 from './components/Even/Sem4'
import Sem5 from './components/Odd/Sem5'
import Sem6 from './components/Even/Sem6'
import Sem7 from './components/Odd/Sem7'
import Sem8 from './components/Even/Sem8'

function App() {
  const [tiletableList, setTimetableList] = useState([])
  useEffect(() => {
    axios.get('/data')
    .then(res => tiletableList(res.data))
    .catch(error => console.log(error))
  })
  return (
    <>
    <Navbar />
    <Route exact path="/">
      <Home/>
    </Route>
    <Route path="/edit/:id" render={(props) => <Edit {...props} tiletableList={tiletableList} /> } />
    <Route path="/faculty" component={Faculty} />
    <Route path="/subjects" component={Subjects} />
    <Route path="/reserve" component={Reserve} />
    <Route path="/3" component={Sem3} />
    <Route path="/4" component={Sem4} />
    <Route path="/5" component={Sem5} />
    <Route path="/6" component={Sem6} />
    <Route path="/7" component={Sem7} />
    <Route path="/8" component={Sem8} />
    </>
  );
}

export default App;
