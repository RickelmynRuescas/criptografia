function PasswordStrength({senha}){

let nivel="Fraca"
let cor="red"

if(senha.length>5){

nivel="Média"
cor="orange"

}

if(senha.length>8){

nivel="Forte"
cor="lime"

}

return(

<div className="strength" style={{color:cor}}>

Força da senha: {nivel}

</div>

)

}

export default PasswordStrength