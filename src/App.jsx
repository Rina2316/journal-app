import { useEffect, useState } from 'react';
import './App.css'
// import Button from './components/Button/Button';

import Header from './components/Header/Header';

import JournalForm from './components/Journal_Form/JournalForm';
import Journal_add_button from './components/Journal_add_button/Journal_add_button';
import Journal_list from './components/Journal_list/Journal_list';
import Body from './layouts/Body/Body';
import LeftPanel from "./layouts/Left_Panel/LeftPanel";
import { UserContextProvider } from './context/user.context';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import AddUser from './components/AddUser/AddUser';

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map(i => ({
    ...i,
    date: new Date(i.date)
  }));
}



function App() {
  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null)
  const [isPreview, setIsPreview] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('data')) {
      setItems([])
    }

    setTimeout(() => {
      setIsPreview(false)
    }, 5000);
  }, [])


  const addItem = item => {

    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if (i.id === item.id) {
          return {
            ...item
          };
        }
        return i;
      })]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)])
  }

  return isPreview ? <div className='preview'>
    Journal app
  </div> :  (
    <>
      <UserContextProvider >
        <div className='app'>


          <LeftPanel>

            <Header />

            <AddUser/>

            <Journal_add_button clearForm={() => setSelectedItem(null)} />
            <Journal_list items={mapItems(items)} setItem={setSelectedItem} />



          </LeftPanel>


          <Body>
            <JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem} />
          </Body>

          {/* <Button /> */}
        </div>
      </UserContextProvider>
    </>

  )
}

export default App
