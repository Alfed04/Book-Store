import {Route,Routes} from 'react-router-dom';
import CreateBook from './pages/CreateBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import Home from './pages/Home.jsx';
import EditBook from './pages/EditBook.jsx';
import ShowBook from './pages/ShowBook.jsx';

function App(){
  return <div>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books/create' element={<CreateBook/>}></Route>
      <Route path='/books/details/:id' element={<ShowBook/>}></Route>
      <Route path='/books/edit/:id' element={<EditBook/>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook/>}></Route>
    </Routes>
  </div>
}

export default App
