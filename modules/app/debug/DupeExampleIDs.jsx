import React from 'react';
import {Table} from 'react-bootstrap';

export default class DupeExampleIDs extends React.Component {
  render() {
    return (
      <div>
        <h3>Production Companies</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3471</td>
              <td>SoCalGas Program Admin (Regina 14)</td>
            </tr>
            <tr>
              <td>3470</td>
              <td>SCE/SoCalGas Program Admin (Veronica/Daniel/Fernando 13)</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Snugg Home Team</td>
            </tr>
            <tr>
              <td>11</td>
              <td>Snugg Bit Bucket</td>
            </tr>
            <tr>
              <td>51</td>
              <td>Tunergy</td>
            </tr>
            <tr>
              <td>3864</td>
              <td>Job Duplicator </td>
            </tr>
          </tbody>
        </Table>

        <h3>Production Accounts</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5983</td>
              <td>Regina (SoCalGas 14)</td>
            </tr>
            <tr>
              <td>5957</td>
              <td>Veronica Solis (SCE/SoCalGas 13)</td>
            </tr>
            <tr>
              <td>5843</td>
              <td>Daniel Galvez (SCE/SoCalGas 13)</td>
            </tr>
            <tr>
              <td>5967</td>
              <td>Fernando Ruvalcaba (SCE/SoCalGas 13)</td>
            </tr>
            <tr>
              <td>31</td>
              <td>Sandy Michaels</td>
            </tr>
            <tr>
              <td>61</td>
              <td>Adam Stenftenagel</td>
            </tr>
            <tr>
              <td>5658</td>
              <td>Johnny Job Duplicator</td>
            </tr>
          </tbody>
        </Table>

        <h3>Program Ids</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>Xcel</td>
            </tr>
            <tr>
              <td>12</td>
              <td>PG&E Home Upgrade</td>
            </tr>
            <tr>
              <td>13</td>
              <td>SCE/SoCalGas® Home Upgrade</td>
            </tr>
            <tr>
              <td>14</td>
              <td>SoCalGas® Home Upgrade</td>
            </tr>
            <tr>
              <td>15</td>
              <td>SDG&E Home Upgrade</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
