"use client"
import React from "react";
import ChoreForm from "../components/ChoreForm.jsx";
import ChoreHero from "../components/ChoreHero.jsx";
import ChoreList from "../components/ChoreList.jsx";
import "../css/styles.css";

function Chores() {
  const [chores, setchores] = React.useState([]);
  const chores_completed = chores.filter(
    (chore) => chore.complete === true
  ).length;
  const total_chores = chores.length;
  return (
    <>
    <div className="navbar">
      <a href="/house">House</a>
    </div>

    <div className="wrapper">
      <ChoreHero chores_completed={chores_completed} total_chores={total_chores} />
      <ChoreForm setchores={setchores}/>
      <ChoreList chores={chores} setchores={setchores} />
    </div>
    </>
  );
}

export default Chores;