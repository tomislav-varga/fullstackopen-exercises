import { useState , useEffect } from 'react'
import axios from 'axios'
import './App.css'
import type { NonSensitiveDiaryEntry } from './types'

const url = 'http://localhost:3000/api/diaries';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async (): Promise<void> => {
      try {
        const response = await axios.get<NonSensitiveDiaryEntry[]>(url);
        setDiaries(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Flight Diaries</h1>
      <div>
        {diaries.map((diary: NonSensitiveDiaryEntry) => (
          <div key={diary.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>Entry #{diary.id}</h3>
            <p><strong>Date:</strong> {diary.date}</p>
            <p><strong>Weather:</strong> {diary.weather}</p>
            <p><strong>Visibility:</strong> {diary.visibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;