import './index.css'
import './App.css'
import WelcomePageComponent from './Components/WelcomePageComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentComponet from './Components/ParentComponet';
import AvatarGenerateComponent from './Components/AvatarGenerateComponent';
const App = () => {

  
  return (
    <div className='container mx-auto'>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<WelcomePageComponent />} />
        <Route path='/text-chatbot'element={<ParentComponet />}/>
        <Route path='video-chatbot' element={<AvatarGenerateComponent />}/>
       </Routes>
    </BrowserRouter>
  </div>
  
  );
};

export default App;