"use client"
import React from "react";
import ChoreForm from "../components/ChoreForm.jsx";
import ChoreHero from "../components/ChoreHero.jsx";
import ChoreList from "../components/ChoreList.jsx";
import "../css/styles.css";

function Chores() {
  return (
    <div className="wrapper">
      <ChoreHero chores_completed={0} total_chores={0} />
      <ChoreForm />
      <ChoreList chores={[]} />
    </div>
  );
}

export default Chores;