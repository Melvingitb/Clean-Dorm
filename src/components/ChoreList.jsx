import React from "react";

function ChoreList({ chores, setchores }) {
    return (
        <ol className="chore_list">
          {chores && chores.length > 0 ? (
            chores?.map((item, index) => <Item key={index} item={item} />)
          ) : (
            <p>Seems lonely in here, what are you up to?</p>
          )}
        </ol>
      );
}

function Item({ item, chores, setchores }) {
    return (
        <li id={item?.id} className="chore_item">
          <button className="chore_items_left">
            <svg>
              <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
            </svg>
            <p>{item?.title}</p>
          </button>
          <div className="chore_items_right">
            <button>
              <span className="visually-hidden">Edit</span>
              <svg>
                <path d="" />
              </svg>
            </button>
            <button>
              <span className="visually-hidden">Delete</span>
              <svg>
                <path d="" />
              </svg>
            </button>
          </div>
        </li>
      );
}

export default ChoreList;