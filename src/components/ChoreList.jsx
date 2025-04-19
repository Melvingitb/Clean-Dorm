import React from "react";

function ChoreList({ chores, setchores }) {
  return (
    <ol className="chore_list">
      {chores && chores.length > 0 ? (
        chores?.map((item, index) => (
          <Item key={index} item={item} setchores={setchores} />
        ))
      ) : (
        <p>Waiting for something to happen?</p>
      )}
    </ol>
  );
}

function Item({ item, setchores }) {
  const completechore = () => {
    setchores((prevchores) =>
      prevchores.map((chore) =>
        chore.id === item.id
          ? { ...chore, complete: !chore.complete }
          : chore
      )
    );
  };
  const formatTime = (timeString) => {
    if (!timeString) return "";
    
    try {
      // Convert 24-hour format to 12-hour format with AM/PM
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12; // Convert 0 to 12
      return `${hour12}:${minutes} ${ampm}`;
    } catch (e) {
      return timeString; // Return as-is if parsing fails
    }
  };

  // Delete task function
  const handleDelete = () => {
    setchores((prevchores) => prevchores.filter((chore) => chore.id !== item.id));
  };
  

  return (
    <li id={item?.id} className="chore_item">
      <button className="chore_items_left" onClick={completechore}>
          <div className="chore-details">
          <p
            className="chore-title"
            style={
              item.complete ? { textDecoration: "line-through" } : {}
            }
          >
            {item?.title}
          </p>

          {(item.room || item.time) && (
            <div className="chore-metadata">
              {item.room && (
                <span className="chore-room">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 22V12H15V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item.room}
                </span>
              )}
              
              {item.time && (
                <span className="chore-time">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {formatTime(item.time)}
                </span>
              )}
            </div>
          )}
        </div>
      </button>
      <div className="chore_items_right">
        <button onClick={handleDelete}>
        <span className="visually-hidden">Delete</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                width={32}
                height={34}
              >
                <path
                  d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                  fillRule="nonzero"
                />
              </svg>
        </button>
      </div>
    </li>
  );
}

export default ChoreList;