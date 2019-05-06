import React,{Component} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const ip = '13.233.201.165'

export default class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      temp: "Ambiant Temperature",
      humi: "Humidity"
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation();
    console.log(event.target.elements['email'].value)
  }

  componentDidMount(){
    if ("geolocation" in navigator) {
      /* geolocation is available */
      const ths = this
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude
        var lon = position.coords.longitude
        console.log(lat,lon)
        fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=f2d9f7e154f7df5540781724fc515a2e')
        .then(response => response.json())
        .then(json=>{
          var temp = json['main']['temp']-273.15
          var humi = json['main']['humidity']
          ths.setState({
            temp,
            humi
          })
        })
      });
    } else {
      /* geolocation IS NOT available */
      alert('Geolocation is not available')
    }
  }

  render(){
    return (
      <header className="App">
        <Container className='text-center'>
          <h1 className='heading'>Humidity Prediction model</h1>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Group>
              <Row>
                <Col lg={4} sm={12}><Form.Label className='data-label'>Soil Temperature</Form.Label></Col>
                <Col lg={8} sm={12}><Form.Control className='num-in' type="number" placeholder="Enter soil temperature" name='soilTemp'/></Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col lg={4} sm={12}><Form.Label className='data-label'>Time of the Day (1-10)</Form.Label></Col>
                <Col lg={8} sm={12}><Form.Control className='num-in' type="number" placeholder="Enter time of the day" name='TOD'/></Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col lg={4} sm={12}><Form.Label className='data-label'>Ambiant Temperature</Form.Label></Col>
                <Col lg={8} sm={12}><Form.Control className='num-in' type="number" placeholder={this.state.temp} name='ambTmp' disabled/></Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col lg={4} sm={12}><Form.Label className='data-label'>Humidity</Form.Label></Col>
                <Col lg={8} sm={12}><Form.Control className='num-in' type="number" placeholder={this.state.humi} name='hum' disabled/></Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </header>
    );
  }
}