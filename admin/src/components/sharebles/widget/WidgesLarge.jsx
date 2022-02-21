import React from 'react';
import './widgetlarge.css';

export default function WidgesLarge() {

  const Button = ({ type }) => {
    return <button className={"button " + type}>{type}</button>
  }

  return (
    <div className="large">
      <span className="title">Transactions</span>

      <table className="table">

        <tr className="lgtr">
          <th className="lgth"> Customer </th>
          <th className="lgth"> Date </th>
          <th className="lgth"> Amount </th>
          <th className="lgth"> Ride Amount </th>
          <th className="lgth"> Status </th>
        </tr>

        <tr className="lgtr">
          <td className="lgtrUser">
            <img src="" alt='' className="image" />
            <span className="names">Andries sebola</span><br />
          </td>
          <td className="lgtdDate">12/06/2022</td>
          <td className="lgtdAmount">R 130.35</td>
          <td className="lgtdAmount">R 630.35</td>
          <td className="lgtdStatus"><Button type="Approved"/></td>
        </tr>

        <tr className="lgtr">
          <td className="lgtrUser">
            <img src="" alt='' className="image" />
            <span className="names">Andries sebola</span><br />
          </td>
          <td className="lgtdDate">12/06/2022</td>
          <td className="lgtdAmount">R ---</td>
          <td className="lgtdAmount">R 630.35</td>
          <td className="lgtdStatus"><Button type="Pending"/></td>
        </tr>

        <tr className="lgtr">
          <td className="lgtrUser">
            <img src="" alt='' className="image" />
            <span className="names">Andries sebola</span><br />
          </td>
          <td className="lgtdDate">12/06/2022</td>
          <td className="lgtdAmount">R 130.35</td>
          <td className="lgtdAmount">R 630.35</td>
          <td className="lgtdStatus"><Button type="Declined"/></td>
        </tr>
      </table>
    </div>
  )
}
