// npm install axios

import axios from 'axios';


export const getAllMeals = async (setMeal) => {
    try {
        const response = await axios.get("https://react-node-groceries-backend.onrender.com");
        setMeal(response.data);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
};


export const addMeal = async (title, setTitle, setMeal) => {
    console.log("addMeal received title: '" + title + "'");  // Immediately log received title

    if (title.trim() === "") {
        console.error("Cannot add an empty item.");
        return;
    }
    try {
        const response = await axios.post("https://react-node-groceries-backend.onrender.com/saveMeals", { title: title });
        console.log('Added meal:', response.data);
        setTitle("");
        await getAllMeals(setMeal);
    } catch (error) {
        console.error('Error adding meal:', error);
    }
};


export const editMeal = async (mealId, title, setTitle, setMeal, setEditing) => {
    if (title.trim() === "") {
        console.error("Cannot update with an empty item.");
        return;
    }
    try {
        await axios.post("https://react-node-groceries-backend.onrender.com/editMeal", { title: title.trim(), _id: mealId });
        setTitle("");
        setEditing(false);
        await getAllMeals(setMeal);
    } catch (error) {
        console.error('Error editing meal:', error);
    }
};


export const deleteMeal = async (_id, setMeal) => {
    try {
        await axios.post("https://react-node-groceries-backend.onrender.com/deleteMeal", { _id });
        await getAllMeals(setMeal);
    } catch (error) {
        console.error('Error deleting meal:', error);
    }
};
