import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import line from './line.png';
import axios from 'axios';
import Swal from 'sweetalert2'

function App() {
  const [linetoken, setLinetoken] = useState("")
  const [massage, setMassage] = useState("")

  const sendLine = () => {

    axios({
      method: 'post',
      url: 'https://corsproxy.pkbit.co/https://notify-api.line.me/api/notify',
      headers: {
        'Authorization': `Bearer ${linetoken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        message: massage,
      }
    })
      .then(function (res) {
        console.log(res.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ส่งข้อความสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(function (err) {
        console.error(err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ส่งข้อความไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      });

    console.log(linetoken)
    console.log(massage)
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    <Container>
      <img src={line} width='50%'></img>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ไลน์โทเคน (Line Tokens)</Form.Label>
        <Form.Control type="text" placeholder="Enter Line Tokens" value={linetoken} onChange={(e) => setLinetoken(e.target.value)} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ข้อความ (Massages)</Form.Label>
        <Form.Control type="text" placeholder="Enter Massages" value={massage} onChange={(e) => setMassage(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={sendLine}>
        ส่งข้อความ
      </Button>
      {/* </Form> */}
    </Container>

    //   </header>
    // </div>
  );
}

export default App;
