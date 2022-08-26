import TrashIcon from "./assets/trash.png";
import EditIcon from "./assets/edit.png";
import Moment from "moment"; //yarn add moment formatting date

function Todo({name, date, index, onChange, isDone, onDelete, onEdit}){
  const formateDate = Moment(date).format("DD-MMM-Y");
    return(
        <>
        <div className="bg-gray-200 flex flex-row space-x-2 p-2 justify-between rounded-md">
          <input type="checkbox" 
            className="accent-green-400"
            checked={isDone}
            onChange={(e) => onChange(e,index)}
          />
          <p className={isDone ? "line-through" : ""}>{name}</p>
          <em className={isDone ? "line-through" : ""}>{formateDate}</em>
          <div className="space-x-2">
            <button onClick={(e) => onDelete(e, index)}>
              <img src={TrashIcon} className="w-5" alt="" />
            </button>
            <button onClick={(e) => onEdit(e,index)}>
              <img src={EditIcon} className="w-5" alt="" />
            </button>
          </div> 
        </div>
        </>
    );
}

export default Todo;