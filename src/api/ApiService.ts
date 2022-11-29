import axios from "axios";
import { error } from "console";

import { Feedback } from "../models/feedback";
import { UserLogInCredentials } from "../models/userLogInCredentials";
import { UserRegistrationCredentials } from "../models/userRegistrationCredentials";
import { SellerExistCredential } from "../models/sellerExistCredential";
import { Service } from "../models/service";
import { CommentCredential } from "../models/commentCredential";
import { patchDealCredential, postDealCredential, putDealCredential } from "../models/dealCredential";
import { config } from "process";

export class ApiService {

  //auth
  async userLogin(userCredentials: UserLogInCredentials) {
    return axios.post(`https://accaunt-sales.itec.by/api/login/`, userCredentials)

      .then(res => {
        const dataUser = res.data;
        return dataUser
      })
      .catch(error => {
        return error
      })
  }
  async userRefresh() {
    return axios.post(`https://accaunt-sales.itec.by/api/token/refresh/`)
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
    return axios.post(`https://accaunt-sales.itec.by/api/register/`, userRegistrationCredentials)
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

    axios.post(`https://accaunt-sales.itec.by/api/is_seller_for_exist/`, sellerExistCredential)
      .then(res => res.data)
      .catch(error => console.log(error))

  }

  //feedback
  saveFeedback(feedBack: Feedback) {
    axios.post(`https://accaunt-sales.itec.by/api/feedback/`, feedBack)
      .then((res) => alert("Отзыв принят"))
      .catch(error => console.log(error))
  }

  getFeedbacks() {
    return axios.get(`https://accaunt-sales.itec.by/api/feedback/`)
      .then((res) => { return res.data; })
      .catch(error => console.log(error))
  }

  //social-networks
  async getInstagramUrl() {
    return axios.get(`https://accaunt-sales.itec.by/api/instagram_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getTelegramUrl() {
    return axios.get(`https://accaunt-sales.itec.by/api/telegram_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getViberUrl() {
    return axios.get(`https://accaunt-sales.itec.by/api/viber_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getVkUrl() {
    return axios.get(`https://accaunt-sales.itec.by/api/vk_social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }


  //about games
  async getGames() {
    return axios.get(`https://accaunt-sales.itec.by/api/games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getCategories(id: number) {
    return axios.get(`https://accaunt-sales.itec.by/api/categories?game=${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  // async getTitlesForCategories() {
  //   return axios.get(`https://accaunt-sales.itec.by/api/titles_for_categories`)
  //     .then((res) => {
  //       const data = res.data
  //       return data;
  //     })
  //     .catch(error => console.log(error))
  // }

  async getTypeOfGames(ln: string) {
    return axios.get(`https://accaunt-sales.itec.by/api/type_of_games/?ln=${ln}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  //deals 
  async getDealByIdForSeller(id: number) {


    return axios.get(`https://accaunt-sales.itec.by/api/deals?seller=${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getDealByIdForClient(id: number, header: any) {
    return axios.get(`https://accaunt-sales.itec.by/api/deals?client=${id}`, { headers: header })
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async postDeals(deal: postDealCredential) {


    return axios.post(`https://accaunt-sales.itec.by/api/deals/`, deal)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async putDeals(deal: putDealCredential) {


    return axios.put(`https://accaunt-sales.itec.by/api/deals/`, deal)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async patchDeals(id: number, deal: patchDealCredential, header: any) {
    return axios.patch(`https://accaunt-sales.itec.by/api/deals?client=${id}`, deal, { headers: header })
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  //services 
  async getServices() {
    return axios.get(`https://accaunt-sales.itec.by/api/services`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getServicesById(id: number) {
    return axios.get(`https://accaunt-sales.itec.by/api/services/${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async postServices(service: any) {
    console.log(service);

    return axios.post(`https://accaunt-sales.itec.by/api/services/`, service)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async deleteService(id: number) {
    return axios.delete(`https://accaunt-sales.itec.by/api/services/${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  //seller
  async getSellerById(id: number) {
    return axios.get(`https://accaunt-sales.itec.by/api/all_sellers/${id}/`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getCommentsToSeller(id: number) {
    return axios.get(`https://accaunt-sales.itec.by/api/comments?seller=${id}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async postCommentsToSeller(commentCredentials: CommentCredential) {
    return axios.post(`https://accaunt-sales.itec.by/api/comments/`, commentCredentials)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  //service_of_site

  async getServiceOfSite(ln: string) {
    return axios.get(`https://accaunt-sales.itec.by/api/service_of_site/?ln=${ln}`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }



  //another
  async getCookiePolicy() {
    return axios.get(`https://accaunt-sales.itec.by/api/cookie_policy`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getPrivacyPolicy() {
    return axios.get(`https://accaunt-sales.itec.by/api/privacy_policy`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  async getMainImage() {
    return axios.get(`https://accaunt-sales.itec.by/api/main_images_for_actual_games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getSocialNetworks() {
    return axios.get(`https://accaunt-sales.itec.by/api/social_networks`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async getSponsorGames() {
    return axios.get(`https://accaunt-sales.itec.by/api/sponsor_games`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }

  async getAskedQuestion() {
    return axios.get(`https://accaunt-sales.itec.by/api/frequently_asked_questions`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }



}