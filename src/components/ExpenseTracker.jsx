import React,{useState,useEffect} from 'react'
import Expense from './Expense'
import 'bootstrap/dist/css/bootstrap.min.css';
const transactionData=[

];
const getDatafromLS=()=>{
  const data =localStorage.getItem('transactions');
  if(data){
    return JSON.parse(data);
  }else{
    return  [];
  }
}
export default function ExpenseTracker() {
 const[income,setIncome]=useState(0);
 const[expense,setExpense]=useState(0);
 const[transactions,setTransactions]=useState(transactionData,getDatafromLS());

 const calculateExpenses=()=>{
    let income=0,expense=0;
    transactions.forEach((data)=>{
        if(data.type==='income'){
            income+=data.amount;
        }else if(data.type==='expense'){
            expense+=data.amount;
        }
    });
   
  setIncome(income);
  setExpense(expense);
}
  const handleAddNewTransaction=item=>{
    let newTransactions=[...transactions,item];
    setTransactions(newTransactions);

  }
  const handleDeleteTransaction=id=>{  
   const newTransactions=transactions.filter((item)=>item.id!==id);
   setTransactions(newTransactions);
  }
  useEffect(() => {
 calculateExpenses();
}, []);

useEffect(() => {
  localStorage.setItem('transactions',JSON.stringify(transactions));  
  calculateExpenses();

}, [transactions]);

return (
  <div>
    <div >   
      <Expense income={income}
       expense={expense} 
      newTransaction={handleAddNewTransaction}
      transactions={transactions}
      onDeleteTransaction={handleDeleteTransaction}/>
    </div>
    </div>
  )
}
