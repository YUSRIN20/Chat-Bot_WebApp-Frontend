import './index.css'
import AvatarComponent from './Components/AvatarComponent';
import ChatBotComponent from './Components/ChatBotComponent';
import TestComponent from './Components/TestComponent';
import './App.css'
import WelcomePageComponent from './Components/WelcomePageComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentComponet from './Components/ParentComponet';
const App = () => {

  
  return (
    <div className='container mx-auto'>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<WelcomePageComponent />} />
        <Route path='/text-chatbot'element={<ParentComponet />}/>
        <Route path='video-chatbot' element={<TestComponent />}/>
       </Routes>
    </BrowserRouter>
  </div>
  
  );
};

export default App;