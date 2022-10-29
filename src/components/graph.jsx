import React from 'react'
import { Chart ,ArcElement} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
Chart.register(ArcElement);
const config={
    data:{
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(173, 166, 164 )',
              'rgb(14, 110, 201 )',
              'rgb(8, 9, 10 )'
            ],
            hoverOffset: 4,
            borderRadius:5,
            spacing:2
          }]
    },
    options:{
        cutout:150
    }
  }
export default function Graph({income,expense}) {
  return (
            <div className='col-9 right-container'>
             <div className='row m-4'>
             <div className='chart relative'>
               <Doughnut {...config} options/>
               <h3 className='mb-4 font-bold title'>budget
               <span className='block text-3xi text-emerald-400'>${income-expense}</span>
               </h3>
               </div>
             </div>
            </div>
     
  )
}
