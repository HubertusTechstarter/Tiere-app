import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function AnimalList() {
  const [tiere, setTiere] = useState([]);

  useEffect(() => {
    getAllTiere();
  }, []);

  async function getAllTiere() {
    try {
      const response = await axios.get("http://localhost:3000/tiere");
      setTiere(response.data);
    } catch (error) {
      console.error("Fehler beim fetchen der Tiere", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/tiere/${id}`);
      getAllTiere();
    } catch (error) {
      console.error("Fehler beim löschen", error);
    }
  }
  return (
    <div className="animal-list">
      <h2>Alle Tiere</h2>
      <input type="text" placeholder="Tiere Suchen.."></input>

      <ul>
        {tiere.map((tier) => (
          <li key={tier.id}>
            {tier.name} ({tier.tierart}) : {tier.krankheit}, {tier.geburtstag},{" "}
            {tier.gewicht}kg
            <Link to="/editAnimal">Bearbeiten</Link>
            <button onClick={() => handleDelete(tier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimalList;
