import Nullstack from 'nullstack';

class TaskList extends Nullstack {

  hideComplete = false;

  renderTask({task}) {
    if(this.hideComplete && task.complete) return false;
    return (
      <li> 
        <input bind={task.description} />
      </li>
    )
  }
  
  render({tasks}) {
    return (
      <div> 
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
        <button onclick={{hideComplete: !this.hideComplete}}>
          Toggle complete tasks
        </button>
      </div>
    )
  }

}

export default TaskList;