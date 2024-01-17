<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
<img align="center" src="03-frontend/angular-ecommerce/src/assets/images/fleur-icon.png" height="40px">
<br />
<h3 align="center">Fleur Fantasia</h3>

  <p align="center">
    Full-stack Web application using Spring Boot framework and Angular frontend
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#demo">Demo</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- Demo -->
## Demo

The AWS-deployed website is here: https://d10ywaww18btws.cloudfront.net

<div>
    <a href="https://www.loom.com/share/306696632cf64ad886aec0a073bc11ec">
      <p>Basic functionalities</p>
    </a>
    <a href="https://www.loom.com/share/306696632cf64ad886aec0a073bc11ec">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/306696632cf64ad886aec0a073bc11ec-with-play.gif">
    </a>
</div>

<div>
    <a href="https://www.loom.com/share/3e03e5b7618143c0828fe01f2712c223">
      <p>Payments received in Stripe</p>
    </a>
    <a href="https://www.loom.com/share/3e03e5b7618143c0828fe01f2712c223">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/3e03e5b7618143c0828fe01f2712c223-with-play.gif">
    </a>
</div>

<!-- Features -->
## Features

- [x] Add SQL databases 
- [x] Add Spring Boot backend (enables connection with databases)
- [x] Add basic Angular frontend (Products list)
- [x] Add complete Angular frontend
    - [x] Home
    - [x] Product Detail
- [x] Search and filter functionalities
    - [x] Search by category
    - [x] Search by keyword
- [x] Product Detail View
- [x] Pagination
- [x] Check out
    - [x] Add/Remove/Modify items in cart
    - [x] Build reactive form controls layout and process inputs on the front-end
    - [x] Connect Angular with Spring Boot to send order info to the database
    - [x] Credit card payment - Email receipt to customer
- [x] Member registration
    - [x] Add Okta sign-in widget integration
    - [x] VIP member registration
    - [x] Track order history by customer email
- [x] Add security
    - [x] Handle browser refresh
    - [x] Block API access to customer information
    - [x] Secure HTTPs communcation - Frontend
    - [x] Secure HTTPs communication - Backend

See the [open issues](https://github.com/LynnHaDo/Fleur-Fantasia/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->
## About The Project (Updates 01/12/24)

In short, Fleur Fantasia is a full-stack e-commerce web app that allows users to browse and purchase different flower/plant options. 

- Like other common e-commerce applications, it supports filtering items, adding items to cart, checking out, etc with secure HTTPS communication. The app also supports credit card payment processing using Stripe API. 

- Unlike other common e-commerce applications, it also provides AI-powered tools to classify and detect different flower types. However, after considering the fact that the scope of the project is pretty big, I want to divide this feature into a different project!

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Spring Boot](https://spring.io/projects/spring-boot)
    * [Java](https://docs.oracle.com/en/java/)
    * [Apache Maven](https://maven.apache.org/)
* [Angular](https://angular.io/)
    * [TypeScript](https://www.typescriptlang.org/)
* [Auth0](https://auth0.com/docs/quickstart)
* [Stripe API](https://stripe.com/docs/api)
* Hosted on [AWS] (https://aws.amazon.com/)
    * [RDS](https://aws.amazon.com/rds/): MySQL database hosting
    * [CloudFront](https://aws.amazon.com/cloudfront/): HTTPS Angular web hosting
    * [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk): Spring deployment
    * [S3](https://aws.amazon.com/pm/serv-s3): Static Angular web hosting

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Linh Do - do24l@mtholyoke.edu/dohalinh2303@gmail.com (personal)

LinkedIn: [https://linkedin.com/in/linh-do-0327371b2/](https://www.linkedin.com/in/linh-do-0327371b2/)

<p align="right">(<a href="#top">back to top</a>)</p>

