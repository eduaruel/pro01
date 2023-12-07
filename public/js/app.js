document.addEventListener('DOMContentLoaded', () => {
	const skills = document.querySelector('.lista-conocimientos');

	//limpiar alertas
	let alertas = document.querySelector('.alertas');

	if(alertas){
		limpiarAlertas(alertas);
	}

	if (skills) {
		skills.addEventListener('click', agregarSkills);

		//al estar en editar se llama esta funcion
		skillsSeleccionado()
	}
});
const skills = new Set();
const agregarSkills = (e) => {
	//console.log(e.target);
	if (e.target.tagName === 'LI') {
		//skills.add(e.target.textContent);
		if (e.target.classList.contains('activo')) {
			// quitar el activo
			skills.delete(e.target.textContent);
			e.target.classList.remove('activo');
		} else {
			// colocar nuevamente el activo
			skills.add(e.target.textContent);
			e.target.classList.add('activo');
		}
	}
	// console.log(skills);
	const skillsArray = [...skills];
	document.querySelector('#skills').value = skillsArray;
};

const skillsSeleccionado = ()=>{
	const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

	seleccionadas.forEach(seleccionadas =>{
		skills.add(seleccionadas.textContent)
	})

	const skillsArray = [...skills];
	document.querySelector('#skills').value = skillsArray;

}

const limpiarAlertas = ()=>{
	const alert = document.querySelector('.alertas')

	const intervalo = setInterval(()=>{
		if(alert.children.length > 0 ){
		alert.removeChild(alert.children[0]);
	}else if(alert.children.length === 0){
		alert.parentElement.removeChild(alert);
		clearInterval(intervalo)
	}
	},3000)
}
