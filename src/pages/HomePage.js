// components/Home.js
import { useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { ref, push, set } from "firebase/database";
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

function Home() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = () => {
        const payload = { name, age };
        const userRef = push(ref(db, 'users'));
        set(userRef, payload);
    };
    const { user } = useAuth()
    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="flex items-center gap-4 mb-4">
                <img className='rounded-full' src={user.photoURL} alt={user.displayName} />
                <h3>{user.displayName}</h3>
                <p>{user.email}</p>

            </div>

            <h2 className="text-2xl font-bold mb-4">Home - Add User</h2>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleSubmit}
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>
            <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
                Sign Out
            </button>
        </div>
    );
}

export default Home;
