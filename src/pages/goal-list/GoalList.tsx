import './GoalList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goals/GoalService';

function GoalList() {
  const [goals, setGoals] = useState([] as GoalDTO[]);
  const [service, setService] = useState({} as GoalService);

  useEffect(() => {
    const goalService = new GoalService();
    setService(goalService)
    goalService.loadAll()
    .then(val => {
      setGoals(val);
    })
  }, [])

  const deleteGoal = (id: number) => {

  }

  const search = () => {
    console.log("search")
  }

  return (
    <div className="goal-list">
      <TopSection pageTitle={'Doelstellingen'} buttonTitle={'Toevoegen'} navigationLink={'/goals/edit/0'} onClick={search}/>
        {goals.map(goal => {
          return (
            <div key={goal.id}>
              <TableRow title={goal.name} onEditLink={"/goals/edit/" + goal.id} onDeleteClick={() => deleteGoal(goal.id)} navigationLink={"/goals/" + goal.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default GoalList;
