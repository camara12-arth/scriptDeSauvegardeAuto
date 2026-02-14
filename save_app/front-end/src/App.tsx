
import { useState } from 'react';
import './App.css'
import Sauvegarde from './components/sauvegarde'
import History from './components/history';

function App() {
  const [vueHistory, setVueHistory] = useState(false);

  return (
    <>

     {vueHistory?<History onVue={setVueHistory}/>:<Sauvegarde onVue={setVueHistory}/>}
    </>
  )
}

export default App
