import { useState , useEffect } from 'react'
import './App.css'
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types'
import { Weather, Visibility } from './types'
import { getEntries, addEntry } from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async (): Promise<void> => {
      try {
        const response = await getEntries();
        setDiaries(response);
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

  const handleAddEntry = async (newEntry: NewDiaryEntry): Promise<void> => {
    try {
      const addedEntry = await addEntry(newEntry);
      setDiaries(prevDiaries => [...prevDiaries, addedEntry]);
      // Reset form
      setNewEntry({
        date: '',
        weather: Weather.Sunny,
        visibility: Visibility.Great,
        comment: ''
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while adding the entry');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleAddEntry(newEntry);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Flight Diaries</h1>
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-field">
          <label className="form-label">
            Date:
          </label>
          <input 
            type="date" 
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} 
            required 
            className="form-input"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">
            Weather:
          </label>
          <select 
            value={newEntry.weather}
            onChange={(e) => setNewEntry({ ...newEntry, weather: e.target.value as Weather })} 
            required
            className="form-input"
          >
            {Object.values(Weather).map(weather => (
              <option key={weather} value={weather}>{weather}</option>
            ))}
          </select>
        </div>
        
        <div className="form-field">
          <label className="form-label">
            Visibility:
          </label>
          <select 
            value={newEntry.visibility}
            onChange={(e) => setNewEntry({ ...newEntry, visibility: e.target.value as Visibility })} 
            required
            className="form-input"
          >
            {Object.values(Visibility).map(visibility => (
              <option key={visibility} value={visibility}>{visibility}</option>
            ))}
          </select>
        </div>
        
        <div className="form-field comment-field">
          <label className="form-label">
            Comment:
          </label>
          <textarea 
            value={newEntry.comment}
            onChange={(e) => setNewEntry({ ...newEntry, comment: e.target.value })} 
            required 
            rows={3}
            className="form-textarea"
          />
        </div>
        
        <button 
          type='submit'
          className="form-button"
        >
          Add Entry
        </button>
      </form>
      <br />
      <h2>Diary Entries</h2>
      {diaries.length === 0 && <p>No diary entries found.</p>}
      <br />
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