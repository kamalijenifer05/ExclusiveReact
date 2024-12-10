// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/screens/Home';
// import Gaming from './components/screens/Gaming';
// import Secondpage from './components/Secondpage';
// import { SearchProvider } from './components/Search';

// function App() {
//   return (
//     <div >
//       <Router>
//         <SearchProvider>

//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/Secondpage' element={<Secondpage />} />
//             <Route path='/Gaming/:id' element={<Gaming />} />
//           </Routes>
//         </SearchProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;
// =======================================================
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/screens/Home';
// import Gaming from './components/screens/Gaming';
// import Secondpage from './components/Secondpage';
// import { SearchProvider } from './components/Search';
// import React, { useState } from 'react';
// import Category from './components/screens/includes/Category';
// import Spotlight from './components/screens/includes/Spotlight';

// function App() {
//   const [categoryFilter, setCategoryFilter] = useState('');
//   return (
//     <div >
//       <Category setCategoryFilter={setCategoryFilter} />  {/* Pass the setter function */}
//       <Spotlight categoryFilter={categoryFilter} />  {/* Pass the selected category */}
//       <Router>
//         <SearchProvider>

//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/Secondpage' element={<Secondpage />} />
//             <Route path='/Gaming/:id' element={<Gaming />} />
//           </Routes>
//         </SearchProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;

// ---------------------------------------------
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Gaming from './components/screens/Gaming';
import Secondpage from './components/Secondpage';
import { SearchProvider } from './components/Search';

function App() {
  return (
    <div >
      <Router>
        <SearchProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Secondpage' element={<Secondpage />} />
            <Route path='/Gaming/:id' element={<Gaming />} />
          </Routes>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;