import {useState} from "react"  //import hook usestate pour gerer les donnees
import {useNavigate} from "react-router-dom"


function Login() {  //dans react dima on travaille par de fct
  
  //state pour stocker l'email
  const [email,setEmail]= useState("") 

  //state pour stocker pswrd
  const[password,setPassword] =useState("")

  //hook pour changer de page(navigation)
  const navigate = useNavigate()

 //Fonction appelée quand on soumet le formulaire (fct s’exécute quand on clique sur Submit)
  const handleSubmit = (e) => {

  //fct empeche le reload de la page (perte des donnees)
  e.preventDefault()

  //condition si les chaps sont vides:
  if (!email || !password){
    alert("Veuillez remplir tous les champs")
    return 
  }
  //simulation de la page login (sans backend)
  console.log("Adresse email:",email)
  console.log("Mot de passe:", password)
//redirige vers la page dashboard
navigate("/Dashboard")



  }

  return <h1>Login Page</h1>
}

export default Login