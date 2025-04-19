function ChoreForm() {
    const handleSubmit = (event) => {
      event.preventDefault();
      // reset the form
      event.target.reset();
    };
    return (
      <form className="choreform" onSubmit={handleSubmit}>
        <label htmlFor="chore">
          <input
            type="text"
            name="chore"
            id="chore"
            placeholder="Write your next chore"
          />
        </label>
        <button>
          <span className="visually-hidden">Submit</span>
          <svg>
            <path d="" />
          </svg>
        </button>
      </form>
    );
  }
  export default ChoreForm;