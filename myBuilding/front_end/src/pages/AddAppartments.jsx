import { useState } from "react";
import { db } from "../firebase";

export const AddAppartments = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("myCollection")
      .add({
        name: inputValue,
        timestamp: Date.now(),
      })
      .then(() => {
        console.log("Document successfully written!");
        setInputValue("");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
