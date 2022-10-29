# Atelier Maïs

### Contributors
<a href="https://github.com/stephaaniechen">Stephanie Chen</a>,
<a href="https://github.com/joshgarza">Josh Garza</a>,
<a href="https://github.com/hieungo89">Hieu Ngo</a>,
<a href="https://github.com/scottmatsuda">Scott Matsuda</a>
<br />

<!-- ABOUT THE PROJECT -->
## About the Project
Our team built a fully functional front-end for a product page of an eCommerce site that meets the specifications and requirements outlined by project stakeholders and utilized an API provided by the client.

### This project includes the following sections:
1. Overview
2. Related Products
3. Questions and Answers
4. Ratings and Reviews

<p align="right">(<a href="#top">back to top</a>)</p>

## App Features
### Product Overview:
<div align="center">
  <img src="screenshots/Overview.png" alt="Overview" width="500">
</div>
The overview section includes an image gallery with a sidebar that contains the product information, style selectors and add to cart capabilities. The image gallery will rerender when a different style is selected and the sidebar will rerender when a new product is selected.
<table>
  <tr>
    <td>
      <img src="screenshots/Overview-Expanded.png" alt="Zoom View Screenshot" width="500">
    </td>
    <td>
      <b>Expanded View:</b>  The expanded view modal will open when the image within the image gallery is clicked. The expanded view also includes a zoomed view with a zoom and pan feature, where users can zoom into the image and pan with the movement of their cursor.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Related Products:
<div align="center">
  <img src="screenshots/RelatedProducts.png" alt="Related Products" width="500">
</div>
Users can scroll through the related products carousel to see suggested products. Each related product card contains the name, image, price, and rating for the product.
<table>
  <tr>
    <td>
    <img width="350" alt="Screen Shot 2022-10-29 at 3 15 52 PM" src="https://user-images.githubusercontent.com/12160369/198854423-97534e61-0777-4ccd-9a97-c91cd5160189.png">
    </td>
    <td>
      <b>Compare Products:</b>  A user can click on the card of a related product to compare its features with the current product. A modal popup allows a user to compare without leaving the page.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Questions and Answers:
<div align="center">
  <img src="screenshots/QnA.png" alt="Q&A" width="500">
</div>
Questions and answers related to the product are shown in this section. Only 2 sets of questions and answers are shown by default, but users can click expand to see additional questions and answers. Users can post their own questions and answers. They can also mark specific questions and answers as helpful. Marking as helpful will move it toward the top of the list, allowing other users to locate helpful data more easily. Users can also report questions and answers to remove them from the list.
<table>
  <tr>
    <td>
      <img src="screenshots" alt="Add Questions Screenshot" width="500">
    </td>
    <td>
      <b>Add Questions:</b>  A modal popup allows a user to add a review for the selected product without leaving the page.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Ratings and Reviews:
<div align="center">
  <img src="screenshots/RatingsNReviews.png" alt="Ratings & Reviews" width="500">
</div>
Users can see how other customers have rated a given product from a scale of 1-5. A composite average of all scores is shown, as well as the breakdown by rating. Up to 2 reviews is shown by default but users can click to see more. Users can also add their own review for a given product, including their own rating. Like questions and answers, users can also mark reviews as helpful to increase visibility.
<table>
  <tr>
    <td>
      <img src="screenshots" alt="Write Reviews Screenshot" width="500">
    </td>
    <td>
      <b>Write Reviews:</b>  A modal popup allows a user to add a review for the selected product without leaving the page.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Built with:
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [React Testing Library](https://testing-library.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started:
  1. Install Dependencies: `npm install`

  2. Make a copy of `example.env` and rename to `.env`

  3. Create a .gitignore file and place in:
    -node_modules
    -client/dist
    -.env

  4. `npm run server-dev`

  5. `npm run client-dev`:
    -listens on PORT set in `.env` or 3000

  6. Launch site: http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>
