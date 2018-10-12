import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import {CountryDropdown, RegionDropdown, CountryRegionData} from 'react-country-region-selector';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles-compiled.css';
const styles =

{checked:{},};

theme => ({
  Button:{
    margin: theme.spacing.unit,
  },
  textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class App extends Component {
constructor (props){
  super(props);
  this.state={
    country: '',
    region: '',
    nomyapell:'',
    correo:'',
    selectedValue:'free',
    nametxt: '',
    tarjetanro:'',
    tarjetaexp:'',
    tarjetacvv:'',
  };
}
selectCountry(val){
  this.setState({country: val});
}
selectRegion(val){
  this.setState({region:val});
}
componentDidMount(){
  ValidatorForm.addValidationRule('CompApellido',(value)=>{
    if (value.indexOf(' ')=== -1){
      return false;
    }
    return true;
  });
}


handleChange = 
(event) =>{this.setState({[event.target.name]: event.target.value})
}

handleChanger= event => {
  this.setState({selectedValue: event.target.value});
};
handleSubmit =() => {
  //envio info
}

handleChangeTarjetaNro(e){
  this.setState({ tarjetanro: e.target.value });
}
handleChangeTarjetaExp(e){
  this.setState({tarjetaexp: e.target.value });
}
handleChangeTarjetaCvv(e){
  this.setState({tarjetacvv: e.target.value });
}


tarjetaCredito(){
  if (this.state.selectedValue === "premium"){
    return(<div>
      <CreditCardInput
      containerClassName="creditcard"
      inputClassName="inputCC"
      cardNumberInputProps={{onChange: this.handleChangeTarjetaNro.bind(this)}}
      cardExpiryInputProps={{onChange: this.handleChangeTarjetaExp.bind(this)}}
      cardCVCInputProps={{onChange: this.handleChangeTarjetaCvv.bind(this)}}
      ></CreditCardInput>

      <Cards
      name={this.state.nomyapell}
      number={this.state.tarjetanro}
      expiry={this.state.tarjetaexp}
      cvc={this.state.tarjetacvv}
      ></Cards>
    </div>);
  }
}

enviarInfo(){
  if(this.infoCompleta())
  {
    let enviando =
    {
      tipo: this.state.selectedValue,
      nombre: this.state.nomyapell,
      email: this.state.correo,
      pais: this.state.country,
    };
    alert("felicidades")

  fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones',
  {
    method: 'post',
    headers:
    {
      'Content-type':'application/json'
    },
    body: JSON.stringify(enviando)
  })

  .then(response=> response.json())
  }
  else
  {
    alert("verifique");
  }
}

infoCompleta(){
  let result=false;
  if(
    (this.state.nomyapell.length > 0)&&
    (this.state.correo.length > 0)&&
    (this.state.country.length > 0)
    )
    {result=true;};

  if(this.state.selectedValue=== "premium")
  {
    if((this.state.tarjetanro.length > 0)&&
    (this.state.tarjetaexp.length > 0)&&
    (this.state.tarjetacvv.length > 0))
    {result=true;}
    else
    {
      result=false;
    }
  }
  return result;
}
  

  render() {
    const {classes} = this.props;
    const{country, region, correo, nomyapell}= this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bienvenido.. estamos cerca de finalizar</h1>
          <h2>Elija el tipo de suscripcion</h2>
          <div>
            <p>Free</p>
            <Radio
            checked={this.state.selectedValue==='free'}
            onChange={this.handleChanger}
            value="free"
            name="radiobtna"
            ></Radio>
            <p>Premium</p>
            <Radio
            checked={this.state.selectedValue==='premium'}
            onChange={this.handleChanger}
            value="premium"
            name="radiobtnb"
            ></Radio>
            <br></br>
            
          </div>
          <form //className={classes.container}noValidate autoComplete="off"
          >
            
            
            <br></br>
            <div>
              <ValidatorForm
              ref="form"
              onSubmit={this.habdleSubmit}
              onError={errors=>console.log(errors)}
              >
              <TextValidator
              label="Nombre y Apellido"
              onChange={this.handleChange}
              name="nomyapell"
              value={nomyapell}
              validators={['required','CompApellido']}
              errorMessages={['Ingrese Nombre y Apellido','Ingrese Apellido']}
              ></TextValidator>
              <br></br>

              <TextValidator
              label="Correo"
              onChange={this.handleChange}
              name="correo"
              value={correo}
              validators={['required','isEmail']}
              errorMessages={['Es requerido el ingreso', 'correo no valido']}
              ></TextValidator>
              <br></br>
              <p>                 </p>

              <CountryDropdown
              value={country}
              onChange={(val) => this.selectCountry(val)}
              ></CountryDropdown>
              <RegionDropdown
              country={country}
              value={region}
              onChange={(val)=> this.selectRegion(val)}
              ></RegionDropdown>
              <p>                 </p>
              <br></br>

              <div>{this.tarjetaCredito()}</div>
              <br></br>
              <Button
              variant= "outlined"
              color="secondary"
              type="submit"
              onClick={()=> this.enviarInfo()}
              >envio</Button>
              <br></br>
              

              </ValidatorForm>
              <br></br>
              
            </div>
          
            
          </form>
        </header>
        
      </div>
    );
  }
}

export default App;
