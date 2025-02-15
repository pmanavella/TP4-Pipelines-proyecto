import axios from 'axios';
import fetch from 'node-fetch';

export function login(loginRequest){
    return axios
    .post('http://localhost:8080/users/login', loginRequest) // Added http://
    .then(function (loginResponse) {
        console.log("Token: ", loginResponse.data);
        return loginResponse.data;
    })
    .catch(function(error){
        console.log("Error en el logueo", error);
        throw error;
    });
}

export function registration(userRequest){
    return axios
    .post('http://localhost:8080/users/register', userRequest)
    .then(function (userResponse) {
        console.log("Token: ", userResponse.data);
        return userResponse.data;
    })
    .catch(function(error){
        console.log("Error en la registracion", error);
        throw error;
    });
}

export function inscription(inscriptionRequest){
    return axios
    .post('http://localhost:8080/inscriptions', inscriptionRequest)
    .then(function (inscriptionResponse) {
        console.log("Token: ", inscriptionResponse.data);
        return inscriptionResponse.data;
    })
    .catch(function(error){
        console.log("Error en la inscripcion", error);
        throw error;
    });
}

export function getCourses() {
    const token = sessionStorage.getItem('token');
  
    return fetch('http://localhost:8080/courses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la carga de cursos');
      }
      return response.json();
    })
    .then(data => {
      return data.results;
    })
    .catch(error => {
      console.log('Error en la carga de cursos', error);
      throw error;
    });
  }

export function getCoursesByUser(){
    return axios
    .get('http://localhost:8080/courses/:idUser')
    .then(function (response) {
        return response.data.results;
    })
    .catch(function(error){
        console.log("Error en la carga de cursos", error);
        throw error;
    });
}

export function createCourses(courseRequest){
    return axios
    .post('http://localhost:8080/courses/create', courseRequest)
    .then(function (courseResponse) {
        console.log("Token: ", courseResponse.data);
        return courseResponse.data;
    })
    .catch(function(error){
        console.log("Error en la creacion de cursos", error);
        throw error;
    });
}

export function updateCourses(courseRequest){
    return axios
    .put('http://localhost:8080/courses/update', courseRequest)
    .then(function (courseResponse) {
        console.log("Token: ", courseResponse.data);
        return courseResponse.data;
    })
    .catch(function(error){
        console.log("Error en la creacion de cursos", error);
        throw error;
    });
}

export function deleteCourses(courseRequest){
    return axios
    .post('http://localhost:8080/courses/delete', courseRequest)
    .then(function (courseResponse) {
        console.log("Token: ", courseResponse.data);
        return courseResponse.data;
    })
    .catch(function(error){
        console.log("Error en la creacion de cursos", error);
        throw error;
    });
}

