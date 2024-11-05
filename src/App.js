import { useEffect, useState } from 'react';
import firebase, { db } from './config/firebaseConfig';
import { getDatabase, ref, set, push, get, onValue, remove } from "firebase/database";

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const [users, setUsers] = useState([]);
  const handleSubmit = () => {
    const payload = {
      name: name,
      age: age
    }
    const userRef = push(ref(db, 'users'));
    set(userRef, payload)
  }

  useEffect(() => {
    const userRef = ref(db, 'users');
    const unsubscribe = onValue(userRef, (snapshot) => {
      const users = [];
      const data = snapshot.val();
      for (let id in data) {
        users.push({ id, ...data[id] })
      }
      setUsers(users)
    })

    return () => {
      unsubscribe();
    }


  }, [])

  const handleDelete = (id) => {
    const userRef = ref(db, `users/${id}`)
    remove(userRef)
  }

  const handleEdit = (id) => {
    const newName = prompt('Enter new name', name);
    const newAge = prompt('Enter new age', age);
    const userRef = ref(db, `users/${id}`)
    set(userRef, {
      name: newName,
      age: newAge
    })
  }

  return (
    <div className="App">


      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <input type="text" onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
        <button onClick={handleSubmit}>Submit</button>
      </div>


      <div>
        <h2>Users</h2>
        {
          users.map((user, index) => {
            return (
              <div style={{
                display: 'flex',
                border: '1px solid black',
                padding: '10px',
                justifyContent: "center",
                alignItems: "center",
                gap: 8
              }} key={index}>
                <h3>{user.name}</h3>
                <p>{user.age}</p>
                <button onClick={() => handleDelete(user.id)}  >Delete</button>
                <button onClick={() => handleEdit(user.id)}  >Edit</button>
              </div>
            )
          })
        }
      </div>


    </div>
  );
}

export default App;
