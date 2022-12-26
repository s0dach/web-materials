import React from "react";
import classNames from "classnames";
import axios from "axios";

import removeSvg from "../../assets/img/remove.svg";

import Badge from "../Badge";

import "./List.scss";

export const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (item.id !== 1) {
      if (window.confirm("Вы действительно хотите удалить список?")) {
        axios.delete("http://95.163.234.208:3500/lists/" + item.id).then(() => {
          onRemove(item.id);
        });
      }
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <div>
          {item.id !== 1 && (
            <div>
              <li
                key={index}
                className={classNames(item.className, {
                  active: item.active
                    ? item.active
                    : activeItem && activeItem.id === item.id,
                })}
                onClick={onClickItem ? () => onClickItem(item) : null}
              >
                <i>
                  {item.icon ? item.icon : <Badge color={item.color.name} />}
                </i>
                <span>
                  {item.name}
                  {item.tasks && ` (${item.tasks.length})`}
                </span>

                {isRemovable && (
                  <img
                    className="list__remove-icon"
                    src={removeSvg}
                    alt="Remove icon"
                    onClick={() => removeList(item)}
                  />
                )}
              </li>
            </div>
          )}
        </div>
      ))}
    </ul>
  );
};

export default List;
