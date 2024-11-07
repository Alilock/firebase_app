// components/Users.js
import { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { ref, onValue, remove, set } from "firebase/database";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userRef = ref(db, 'users');
        const unsubscribe = onValue(userRef, (snapshot) => {
            const usersData = [];
            const data = snapshot.val();
            for (let id in data) {
                usersData.push({ id, ...data[id] });
            }
            setUsers(usersData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = (id) => {
        const userRef = ref(db, `users/${id}`);
        remove(userRef);
    };

    const handleEdit = (id) => {
        const newName = prompt('Enter new name');
        const newAge = prompt('Enter new age');
        const userRef = ref(db, `users/${id}`);
        set(userRef, { name: newName, age: newAge });
    };

    return (
        <div>
            <h2>Users List</h2>
            {users.map((user) => (
                <div key={user.id} style={{ display: 'flex', gap: '8px', padding: '10px', border: '1px solid black' }}>
                    <h3>{user.name}</h3>
                    <p>{user.age}</p>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default Users;
