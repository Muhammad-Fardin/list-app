import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return [];
  }
}
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditting, setIsEditting] = useState(false);
  const [ editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false ,type: '', msg: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      
      showAlert(true, "danger", "add something")
    }
    else if (name && isEditting) {
      setList(list.map((item) => {
        
        if (item.id ==editId) {
          return{...item, title: name}
        }
        return item

      }))
      setName('');
      showAlert(true, 'success', 'Updated Successfully');
      setEditId(null);
      setIsEditting(false);
    }
    else{
      showAlert(true, 'success', 'Added Successfully')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem])
      setName('');
    }
  }

  const showAlert = (show=false,type="", msg="") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Cleared The List!');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Removed Item!' );
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditting(true);
    setEditId(id);
    setName(specificItem.title);
  }
  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Listo Makker</h3>
        <div className="form-control">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <button type="Submit" className="submit-btn">
            {isEditting ? 'edit' : 'add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
              <div className="grocery-container">
              <List items={list} removeItem={removeItem} editItem={editItem}/>
              <button className="clear-btn" onClick={clearList}>Clear</button>
            </div>
      )}

    </section>
  );
}

export default App
