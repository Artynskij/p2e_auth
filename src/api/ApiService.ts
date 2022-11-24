import axios from "axios";
import { error } from "console";

import { Feedback } from "../models/feedback";
import { UserLogInCredentials } from "../models/userLogInCredentials";
import { UserRegistrationCredentials } from "../models/userRegistrationCredentials";
import { SellerExistCredential } from "../models/sellerExistCredential";
import { Service } from "../models/service";
import { CommentCredential } from "../models/commentCredential";

export class ApiService {
 
  //auth
  async userLogin(userCredentials: UserLogInCredentials) {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/login/`, userCredentials)
      .then(res => {
        const dataUser = res.data;
        return dataUser
      })
      .catch(error => {
        return error
      })
  }
  async userRefresh() {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/token/refresh/`)
      .then(res => {
     console.log(res);


        const dataUser = res.data;

        return dataUser
      })
      .catch(error => {
        return error
      })
  }

  async userRegistration(userRegistrationCredentials: UserRegistrationCredentials) {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/register/`, userRegistrationCredentials)
      .then(res => {
        return res
      })
      .catch(err => {
        if (err.response) {
          console.log("err.response");
          const error = err
          return error
        } else if (err.request) {
          console.log("err.request");
          console.log(err);
        } else {
          console.log(err);
        }
      })

  }
  async sellerExist(sellerExistCredential: SellerExistCredential) {
    
    axios.post(`https://alexeygrinch.pythonanywhere.com/api/is_seller_for_exist/}`, sellerExistCredential)
      .then(res => console.log(res))
      .catch(error => console.log(error))

  }

  //feedback
  saveFeedback(feedBack: Feedback) {
    axios.post(`https://alexeygrinch.pythonanywhere.com/api/feedback/`, feedBack)
      .then((res) => alert("Отзыв принят"))
      .catch(error => console.log(error))
  }

  getFeedbacks() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/feedback/`)
      .then((res) => { return res.data; })
      .catch(error => console.log(error))
  }

   //social-networks
   async getInstagramUrl() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/instagram_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getTelegramUrl() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/telegram_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getViberUrl() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/viber_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getVkUrl() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/vk_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  } 
 

  //about games
  async getGames() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getCategories(id:number, ln:string) {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/categories?game=${id}&ln=${ln}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  // async getTitlesForCategories() {
  //   return axios.get(`https://alexeygrinch.pythonanywhere.com/api/titles_for_categories`)
  //     .then((res) => {
  //       const data = res.data
  //       return data;
  //     })
  //     .catch(error => console.log(error))
  // }

  async getTypeOfGames(ln:string) {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/type_of_games/?ln=${ln}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  //services 
  async getServices() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/services`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getServicesById(id:number) {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/services/${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async postServices(service:Service) {
    console.log(service);
    
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/services/`, service)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async deleteService(id:number) {
    return axios.delete(`https://alexeygrinch.pythonanywhere.com/api/services/${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  //seller
  async getSellerById(id:number) {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/all_sellers/${id}/`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getCommentsToSeller(id:number) {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/comments?seller=${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async postCommentsToSeller(commentCredentials:CommentCredential) {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/comments/`,commentCredentials)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  //another
  async getCookiePolicy() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/cookie_policy`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getPrivacyPolicy() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/privacy_policy`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  async getMainImage() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/main_images_for_actual_games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getSocialNetworks() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getSponsorGames() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/sponsor_games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  
  async getAskedQuestion() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/frequently_asked_questions`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

 

}