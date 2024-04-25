// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [ emp, setEmp ] = useState([
    {
      id : 1,
      name : "jack",
      age : 25,
      flag : true
    },
    {
      id : 2,
      name : "Alex",
      age : 29,
      flag : true
    },
    {
      id : 3,
      name : "Elton",
      age : 35,
      flag : true
    },
    {
      id : 4,
      name : "Garvy",
      age : 20,
      flag : true
    },
    {
      id : 5,
      name : "Morten",
      age : 33,
      flag : true
    },
    {
      id : 6,
      name : "Sam",
      age :39,
      flag : true
    },
    {
      id : 7,
      name : "Alwin",
      age : 18,
      flag : true
    },
  ]);

  const [team, setTeam] = useState([]);
  const [avgAge, setAvgAge] = useState(0);
  const [count, setCount] = useState(0);

  function btnAdd(emp_id){
    const tempList = emp;
    tempList.filter((item)=>{
      if(item.id === emp_id){
        return item.flag = false;
      }
    });
    setEmp([...tempList]);
    const findEmp = emp.find(item => item.id === emp_id);
    if(findEmp){
      setCount(count+1);
      setAvgAge((avgAge * count + parseInt(findEmp.age)) / (count+1));
      setTeam([...team,findEmp]);
    }
  }

  function btnRemove(team_id){
    // Loop for Employee
    const empList = emp;
    empList.filter((item)=>{
      if(item.id === team_id){
        return item.flag = true;
      }
    });
    setEmp([...empList]);

    // Loop for Team
    const teamList = team;
    if(teamList.length>0){
      // const teamData = teamList.filter((item)=>{
      //   if(item.id !== team_id){
      //     setCount(count-1);
      //     setAvgAge((((avgAge - item.age ) * count) - parseInt(item.age)) / (count-1));
      //     return true;
      //   }
      // });
      // // console.log("teamData",teamData);
      // if(teamData.length>0){
      //   setTeam([...teamData]);
      //   return;
      // }
      // else{
      //   setTeam([]);
      //   return;
      // }
      const removedEmployee = teamList.find(item => item.id === team_id);
      if (removedEmployee) {
        const newTeam = teamList.filter(item => item.id !== team_id);
        const newCount = count-1;
        if(newCount === 0){
          setAvgAge(0);
        } else {
          const newTotalAge = avgAge * count - removedEmployee.age;
          setAvgAge(newTotalAge / newCount);
        }
        setCount(newCount);
        setTeam(newTeam);
      }
    }
  }

  function sortByAge(){
    if(team.length > 0){
      // const tempList = team;
      const sortedAge = [...team].sort((a, b) => a.age - b.age);
      setTeam(sortedAge); 
    }
    // else{
    //   alert("Nothing to sort !");
    // }
  }

  return (
    <div id="container">

      <div id="emp">
        <h3>Employees</h3>
        {
          emp.map((item,id)=>{
            return(
              <div key={id}>
                <div id="rowEmp">
                  <p style={{color : item.flag === false ? "grey" : "black"}}>{item.name}</p>
                  <p style={{color : item.flag === false ? "grey" : "black"}}>{item.age}</p>
                  {/* item.flag === false ? */}
                  {
                    item.flag === false ? <div></div> : <button onClick={()=>{btnAdd(item.id)}}>Add</button>
                  }
                </div>
              </div>
            )
          })
        }
      </div>

      <div id="team">
        <h3>Team</h3>
        <span>
          {
            team.length > 0 ? <button onClick={sortByAge}>Sort By Age</button> : <p></p>
          }
        </span>
        {
          team.map((teamItem, teamId)=>{
            return(
              <div key={teamId}>
                <div id="rowTeam">
                  <p>{teamItem.name}</p>
                  <p>{teamItem.age}</p>
                  <button onClick={()=>{btnRemove(teamItem.id)}}>Remove</button>
                </div>
              </div>
            )
          })
        }
        <div id="average">
          <p>Average Age</p>
          <p>{avgAge.toFixed(2)}</p>
        </div>
      </div>

    </div>
  );
}

export default App;
