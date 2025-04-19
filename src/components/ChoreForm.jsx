function ChoreForm({setchores}) {
    const handleSubmit = (event) => {
      event.preventDefault();
      const choreTitle = event.target.chore.value;
      const room = event.target.room.value;
      const time = event.target.time.value;
      setchores((prevchores) => [
      ...prevchores,
      { title: choreTitle, 
        room: room,
        time: time,
        id: self.crypto.randomUUID(), 
        complete: false
      },
    ]);
      event.target.reset();
    };
    return (
    <form className="choreform" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="chore">
          <input
            type="text"
            name="chore"
            id="chore"
            placeholder="Write your next chore!"
          />
        </label>
      </div>
      
      <div className="form-group">
      <label htmlFor="room">
          <input
            type="text"
            name="room"
            id="room"
            placeholder="Which room? (e.g. Kitchen)"
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="time">
          <input
            type="time"
            name="time"
            id="time"
            placeholder="When?"
          />
        </label>
      </div>
      
      <button>
        <span className="visually-hidden">Submit</span>
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </form>
    );
  }
  export default ChoreForm;