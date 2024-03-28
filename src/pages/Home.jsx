import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../config/firebase';

function Home() {
  const auth = getAuth(app); // Initialize authentication
  const [user] = useAuthState(auth); // Get the current user

  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch data from Firestore if user is logged in
      const fetchData = async () => {
        try {
          const db = getFirestore(app);
          const docRef = doc(db, 'your_collection', 'your_document'); // Replace 'your_collection' and 'your_document' with actual collection and document names
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchData();
    } else {
      setData(null); // Clear data if user is not logged in
    }
  }, [user]); // Run effect when user changes

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {user ? (
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '100px' }}>
          <LineChart />
        </div>
        {/* <div>
          <BarChart /> 
        </div> */}
      </main>) : ( <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , backgroundColor:"black"}}>
      <p className="text-white font-bold bg-gray-500 px-10 py-10 rounded-lg">
  Please login to view data.
</p>

          {/* Your login component can go here */}
          </main>)}
      <Footer />
    </div>
  </>
  
  )
}

export default Home