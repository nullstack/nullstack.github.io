import Nullstack from 'nullstack';
import TaskList from './TaskList';
import {readFileSync} from 'fs';

class Application extends Nullstack {

  static async getTasks({limit}) {
    const json = readFileSync('tasks.json', 'utf-8');
    return JSON.parse(json).tasks.slice(0, limit);
  }

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  render() {
    return (
      <main>
        <TaskList route="/tasks" />
        <a href="/tasks" route="*"> List Tasks </a>
      </main>
    )
  }

}

export default Application;