function ChoreHero({ chores_completed, total_chores }) {
    return (
      <section className="chorehero_section">
        <div>
          <p className="text_large">Chores Done</p>
        </div>
        <div>
          {chores_completed}/{total_chores}
        </div>
      </section>
    );
  }
  
  export default ChoreHero;