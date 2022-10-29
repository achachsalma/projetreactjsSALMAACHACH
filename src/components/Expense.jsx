import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react'
import { uniqeId } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Graph from './graph';
import { FaTrash } from "react-icons/fa";
export default function Expense({ newTransaction, income, expense, transactions, onDeleteTransaction }) {
    const [nameValue, setNameValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const [date, setDate] = useState("");
    const[category,setCategory]=useState("");
    const addTransaction = (type, evt) => {
        evt.preventDefault();
        const data = {
            id: uniqeId(), name: nameValue,
            amount: parseInt(amountValue), type: type,
            date: date, category:category
        };

        newTransaction(data);
        setNameValue('');
        setAmountValue('');
        toast.success('successful addition', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div className='row' >
            <div className='col-4 left-container'>
                <div className='month-container'>
                    <div className='header fs-white'><h2>my budget</h2></div>
                    <div id="current-month" className='sub-text fs-white'></div>
                    <div className='budget-container p-2 mt-4'>
                        <span id='month-budget' className='month-amount'>${income - expense}</span>
                    </div>
                </div>
                <div className='chart-container'>
                    <Graph income={income}
       expense={expense}/>
                </div>
            </div>
            <div className='col-8 right-container'>
                <div className='calc-container'>
                    <div className='header fs-derk-grey'>track my budget</div>
                    <h2>Income</h2>
                    <div >${income}</div>
                    <h2>Expense</h2>
                    <div className='expense-text'>${expense}</div>
                    <div className='row mt-4'>
                        <div className='col-4'>
                            <input className='form-control input-expense-description'
                                placeholder='income/expense description ...'
                                type="text" value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)} />
                        </div>
                        
                        <div className='col-2'>
                            <input className='form-control input-expense-value' placeholder='price ...' type="number" value={amountValue}
                                onChange={(e) => setAmountValue(e.target.value)} />
                        </div>
                        </div>
                        <div className='row mt-4'>
                        <div className='col-3'>
                            <input className="form-control input-expense-date" type="date" value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className='col-3'>
                            <select 
                            value={category}
                            onChange={(e)=>{
                                const selectedcategory=e.target.value;
                                setCategory(selectedcategory);
                             }} className="form-control input-expense-date">
                                <option value="clothes">clothes</option>
                                <option value="car">car</option>
                                <option value="childreen">childreen</option>
                                <option value="school">school</option>
                                <option value="salary">salary</option>
                            </select>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-4'>
                                <button type="button" className="btn btn-outline-primary" onClick={(e) => addTransaction('income', e)}>Add Income</button>
                            </div>
                            <div className='col-4'>
                                <button type="button" className="btn btn-outline-primary" onClick={(e) => addTransaction('expense', e)}>Add Expense</button>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                    <div className='row mt-4'>
                        <div className='header fs-dark-grey'>Transaction History</div>
                    </div>
                    <div className='expense-list mt-4'>
                        <ul className='list-group'>
                            {transactions.map((data) =>
                                <li className='list-group-item' key={data.id}>
                                    <div className='table-response'>
                                   <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>description</th>
                                                <th>price</th>
                                                <th>category</th>
                                                <th> date</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                <th>{data.name}</th>
                                                <th>${data.amount} </th>
                                                <th>{data.category}</th>
                                                <th>{data.date}</th>
                                                <th> <button className="btn btn-danger btn-delete-expense" onClick={() => onDeleteTransaction(data.id)}> <FaTrash /></button></th>
                                             </tr>
                                        </tbody>
                                   </table>
                                   </div>
                                      
                                </li>)}
                                
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

