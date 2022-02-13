import React, {useEffect, useState} from "react";
import axios from "axios";


const URL = 'https://jsonplaceholder.typicode.com/users'
const Table = () => {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
      const response = await axios.get(URL)
        setEmployees(response.data)
    }
    const renderHeader = () => {
      let headerElement = ['id', 'name', 'email', 'phone', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
      return employees && employees.map(({id, name, email, phone}) =>{
          return(
              <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td className='opration'><button onClick={()=> removeData(id)}>Delete</button> </td>
              </tr>
          )
      })
    }

    const removeData = (id) => {
      let url = `https://jsonplaceholder.typicode.com/users/${id}`
        axios.delete(url).then(res=> {
            const del = employees.filter(employee => id !==employee.id)
            setEmployees(del)
            console.log('res', res)
        })
    }

    return(
        <table className="table table-striped">
            <thead>
            <tr>
                {renderHeader()}
            </tr>
            </thead>
            <tbody>
            {renderBody()}
            </tbody>
        </table>
        // <div>
        //     <h1 id='title'>React table</h1>
        //     <table id='employee'>
        //         <thead>
        //             <tr>{renderHeader()}</tr>
        //         </thead>
        //         <tbody>
        //         {renderBody()}
        //         </tbody>
        //     </table>
        // </div>
    )
}
export default Table;