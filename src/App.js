import { useEffect, useRef, useState } from 'react';
import './App.css';
import { MyMeals } from './MyMeals';
import { getAllMeals, addMeal, editMeal, deleteMeal } from './FetchMeals';
import gsap from 'gsap';

function App() {
  const [myMeal, setMeal] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [mealId, setMealId] = useState("");
  const [error, setError] = useState("");
  const mealsRef = useRef([]);

  useEffect(() => {
      getAllMeals(setMeal);
  }, []);

  useEffect(() => {
      if (mealsRef.current.length > 0) {
          gsap.fromTo(mealsRef.current, 
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power1.out', delay: 0.3 }
          );
      }
  }, [myMeal.length]);

  
  const handleAddOrUpdateMeal = async () => {
      if (!title.trim()) {
          setError("Please enter a non-empty value.");
          return;
      }
      setError("");
      try {
          if (editing) {
              await editMeal(mealId, title, setTitle, setMeal, setEditing);
          } else {
              await addMeal(title, setTitle, setMeal);
          }
          setTitle("");
          setEditing(false);
      } catch (error) {
          console.error('Operation failed:', error);
      }
  };

  return (
      <div className="App">
          <h1>Grocery List</h1>
          <input
              type="text"
              placeholder="Add an item"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddOrUpdateMeal()}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleAddOrUpdateMeal}>
              {editing ? "Update" : "Add"}
          </button>
          {myMeal.map((meal, index) => (
              <MyMeals 
                  ref={el => mealsRef.current[index] = el}
                  text={meal.title}
                  key={meal._id}
                  updatingInInput={() => {
                      setEditing(true);
                      setTitle(meal.title);
                      setMealId(meal._id);
                  }}
                  deleteMeal={() => deleteMeal(meal._id, setMeal)}
              />
          ))}

          <br></br>
      </div>
  );
}


export default App;
